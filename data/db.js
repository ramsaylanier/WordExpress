import Sequelize from 'sequelize';
import devSettings from '../settings/dev.json';
import prodSettings from '../settings/prod.json';
import _ from 'lodash';
import PHPUnserialize from 'php-unserialize';

const env = process.env.NODE_ENV;
const settings = env === 'dev' ? devSettings : prodSettings;
const privateSettings = settings.private;
export const publicSettings = settings.public;

export class User extends Object {}

// Mock user data
let viewer = new User();
viewer.id = '1';
viewer.name = 'Anonymous';

export function getUser(id) {
  id === viewer.id ? viewer : null;
}

const Conn = new Sequelize(
  privateSettings.database.name,
  privateSettings.database.username,
  privateSettings.database.password,
  {
    dialect: 'mysql',
    host: privateSettings.database.host,
    define: {
      timestamps: false,
      freezeTableName: true,
    }
  }
);

const Options = Conn.define(privateSettings.wp_prefix + 'options', {
  option_id: { type: Sequelize.INTEGER, primaryKey: true},
  option_name: { type: Sequelize.STRING },
  option_value: { type: Sequelize.INTEGER },
})

const Post = Conn.define(privateSettings.wp_prefix + 'posts', {
  id: { type: Sequelize.INTEGER, primaryKey: true},
  post_author: { type: Sequelize.INTEGER },
  post_title: { type: Sequelize.STRING },
  post_content: { type: Sequelize.STRING },
  post_excerpt: { type: Sequelize.STRING },
  post_status:{ type: Sequelize.STRING },
  post_type:{ type: Sequelize.STRING },
  post_name:{ type: Sequelize.STRING},
  post_parent: { type: Sequelize.INTEGER},
  menu_order: { type: Sequelize.INTEGER}
});

const Postmeta = Conn.define(privateSettings.wp_prefix + 'postmeta', {
  meta_id: { type: Sequelize.INTEGER, primaryKey: true, field: 'meta_id' },
  post_id: { type: Sequelize.INTEGER },
  meta_key: { type: Sequelize.STRING },
  meta_value: { type: Sequelize.INTEGER },
});

const Terms = Conn.define(privateSettings.wp_prefix + 'terms', {
  term_id: { type: Sequelize.INTEGER, primaryKey: true },
  name: { type: Sequelize.STRING },
  slug: { type: Sequelize.STRING },
  term_group: { type: Sequelize.INTEGER },
});

const TermRelationships = Conn.define(privateSettings.wp_prefix + 'term_relationships', {
  object_id: { type: Sequelize.INTEGER, primaryKey: true },
  term_taxonomy_id: { type: Sequelize.INTEGER },
  term_order: { type: Sequelize.INTEGER },
});

Terms.hasMany(TermRelationships,  {foreignKey: 'term_taxonomy_id'});
TermRelationships.belongsTo(Terms, {foreignKey: 'term_taxonomy_id'});

TermRelationships.hasMany(Postmeta, {foreignKey: 'post_id'});
Postmeta.belongsTo(TermRelationships, {foreignKey: 'post_id'});

TermRelationships.belongsTo(Post, {foreignKey: 'object_id'});

Post.hasMany(Postmeta, {foreignKey: 'post_id'});
Postmeta.belongsTo(Post, {foreignKey: 'post_id'});

const TermTaxonomy = Conn.define('wp_term_taxonomy', {
  term_taxonomy_id: { type: Sequelize.INTEGER, primaryKey: true },
  term_id: { type: Sequelize.INTEGER },
  taxonomy: { type: Sequelize.STRING },
  parent: { type: Sequelize.INTEGER },
  count: { type: Sequelize.INTEGER },
});

function getMenuItems(name){
  return Conn.models[privateSettings.wp_prefix + 'terms'].findOne({
    where: {
      slug: name
    },
    include: [{
      model: TermRelationships,
      include: [{
        model: Post,
        include: [Postmeta]
      }]
    }]
  }).then ( res => {
    if (res){
      let menu = {
        id: null,
        name: name,
        items: null,
      };
      menu.id = res.term_id;
      const relationship = res.wp_term_relationships;
      const posts = _.map(_.pluck (relationship, 'wp_post'), 'dataValues');
      const navItems = [];

      const parentIds = _.pluck(_.filter(posts, post=>{
        return post.post_parent == 0
      }), 'id');

      _.map(_.sortBy(posts, 'post_parent'), post => {
        let navItem = {};
        let postmeta = _.pluck(post.wp_postmeta, 'dataValues');
        let isParent = _.includes( parentIds, post.id);
        let linkedId = Number(_.pluck(_.filter(postmeta, meta => {
          return meta.meta_key == '_menu_item_object_id'
        }), 'meta_value'));

        if (isParent){
          navItem.id = post.id;
          navItem.order = post.menu_order;
          navItem.linkedId = linkedId;
          navItem.children = [];
          navItems.push(navItem);
        } else {
          let parentId = Number(_.pluck(_.filter(postmeta, meta => {
            return meta.meta_key == '_menu_item_menu_item_parent'
          }), 'meta_value'));
          let existing = _.findWhere(navItems, {'id' : parentId})

          if (existing){
            existing.children.push({id: post.id, linkedId: linkedId })
          }
        }

        menu.items = navItems;
      });

      return menu;
    }
  });
}

Conn.sync();

const ConnQueries = {
  getViewer(){
    return viewer
  },
  getOptions(){
    return Conn.models[privateSettings.wp_prefix + 'options'].findAll({
      where: {
        option_name: {
          $in: ['page_on_front', 'page_for_posts']
        }
      }
    })
  },
  getOptionById(id){
    return Conn.models[privateSettings.wp_prefix + 'options'].findAll({
      where: {
        option_id: id
      }
    })
  },
  getPosts(args){
    const {post_type, first} = args;
    return Conn.models[privateSettings.wp_prefix + 'posts'].findAll({
      where: {
        post_type: post_type,
        post_status: 'publish',
      }
    })
  },
  getPostById(postId){
    return Conn.models[privateSettings.wp_prefix + 'posts'].findOne({
      where: {
        id: postId
      }
    })
  },
  getPostByName(name){
    return Conn.models[privateSettings.wp_prefix + 'posts'].findOne({
      where: {
        post_status: 'publish',
        post_name: name
      }
    })
  },
  getPostThumbnail(postId){
    return Conn.models[privateSettings.wp_prefix + 'postmeta'].findOne({
      where: {
        post_id: postId,
        meta_key: '_thumbnail_id'
      }
    }).then( res => {
      if (res){
        let meta_key = publicSettings.amazonS3 ? 'amazonS3_info' : '_wp_attached_file';

        return Post.findOne({
          where: {
            id: Number(res.dataValues.meta_value)
          },
          include: {
            model: Postmeta,
            where: {
              meta_key:meta_key
            },
            limit: 1
          }
        }).then( post => {
          if (post.wp_postmeta[0]){
            const thumbnail = post.wp_postmeta[0].dataValues.meta_value;
            const thumbnailSrc = publicSettings.amazonS3 ?
              publicSettings.uploads + PHPUnserialize.unserialize(thumbnail).key :
              publicSettings.uploads + thumbnail;

            return thumbnailSrc
          } else {
            return null;
          }
        })
      } else {
        return
      }
    })
  },
  getPostmetaById(metaId, keys){
    return Conn.models[privateSettings.wp_prefix + 'postmeta'].findOne({
      where: {
        meta_id: metaId,
        meta_key: {
          $in: keys
        }
      }
    })
  },
  getPostmeta(postId, keys){
    return Conn.models[privateSettings.wp_prefix + 'postmeta'].findAll({
      where: {
        post_id: postId,
        meta_key: {
          $in: keys
        }
      }
    })
  },
  getMenu(name){
    return getMenuItems(name);
  }
}

export { Conn, ConnQueries };
