import Sequelize from 'sequelize';
import devSettings from '../settings/dev.json';
import prodSettings from '../settings/prod.json';
import _ from 'lodash';

const env = process.env.NODE_ENV;
const settings = env === 'dev' ? devSettings : prodSettings;

export class User extends Object {}

export class Menu extends Object{
  constructor(id, name, items){
    super();
    this.id = id;
    this.name = name;
    this.items = items;
  }
}

// Mock user data
let viewer = new User();
viewer.id = '1';
viewer.name = 'Anonymous';

let primaryMenu = new Menu( 1, 'primary-navigation', []);

export function getUser(id) {
  id === viewer.id ? viewer : null;
}

export function getMenu(id) {
  return primaryMenu
}

const Conn = new Sequelize(
  settings.database.name,
  settings.database.username,
  settings.database.password,
  {
    dialect: 'mysql',
    host: settings.database.host,
    define: {
      timestamps: false,
      freezeTableName: true,
    }
  }
);

const Post = Conn.define(settings.wp_prefix + 'posts', {
  id: { type: Sequelize.INTEGER, primaryKey: true},
  post_author: { type: Sequelize.INTEGER },
  post_title: { type: Sequelize.STRING },
  post_content: { type: Sequelize.STRING },
  post_status:{ type: Sequelize.STRING },
  post_type:{ type: Sequelize.STRING },
  post_name:{ type: Sequelize.STRING},
  post_parent: { type: Sequelize.INTEGER}
});

const Postmeta = Conn.define(settings.wp_prefix + 'postmeta', {
  meta_id: { type: Sequelize.INTEGER, primaryKey: true, field: 'meta_id' },
  post_id: { type: Sequelize.INTEGER },
  meta_key: { type: Sequelize.STRING },
  meta_value: { type: Sequelize.INTEGER },
});

const Terms = Conn.define(settings.wp_prefix + 'terms', {
  term_id: { type: Sequelize.INTEGER, primaryKey: true },
  name: { type: Sequelize.STRING },
  slug: { type: Sequelize.STRING },
  term_group: { type: Sequelize.INTEGER },
});

const TermRelationships = Conn.define(settings.wp_prefix + 'term_relationships', {
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

function getMenuItems(){
  Conn.models[settings.wp_prefix + 'terms'].findOne({
    where: {
      slug: 'primary-navigation'
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

        primaryMenu.items = navItems;
      });
    }
  });
}

Conn.sync();

const ConnQueries = {
  getViewer(){
    return viewer
  },
  getPosts(type){
    return Conn.models[settings.wp_prefix + 'posts'].findAll({
      where: {
        post_type: type,
        post_status: 'publish'
      }
    })
  },
  getPostById(postId){
    return Conn.models[settings.wp_prefix + 'posts'].findOne({
      where: {
        id: postId
      }
    })
  },
  getPostmetaById(metaId, keys){
    console.log('meta keys:', keys);

    return Conn.models[settings.wp_prefix + 'postsmeta'].findOne({
      where: {
        meta_id: metaId,
        meta_key: {
          $in: keys
        }
      }
    })
  },
  getPostmeta(postId, keys){
    console.log('meta keys:', keys);
    return Conn.models[settings.wp_prefix + 'postmeta'].findAll({
      where: {
        post_id: postId,
        meta_key: {
          $in: keys
        }
      }
    })
  },
  getPageByTitle(title){
    return Conn.models[settings.wp_prefix + 'posts'].findAll({
      where: {
        post_type: 'page',
        post_status: 'publish',
        post_title: title
      }
    })
  },
  getMenu(slug){
    getMenuItems();
    console.log('primary menu:', primaryMenu);
    return primaryMenu
  }
}

export { Conn, ConnQueries };
