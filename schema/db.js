import Sequelize from 'sequelize';
import _ from 'lodash';
import PHPUnserialize from 'php-unserialize';

const viewer = {
  id: 1,
  name: 'Anonymous'
}

export default class WordExpressDatabase{
  constructor(connectionDetails){
    this.connectionDetails = connectionDetails;
    this.connection = this.connect(connectionDetails);
    this.queries = this.getQueries();
    this.models = this.getModels();
  }

  connect(){
    const { name, username, password, host} = this.connectionDetails;
    const Conn = new Sequelize(
      name,
      username,
      password,
      {
        dialect: 'mysql',
        host: host,
        define: {
          timestamps: false,
          freezeTableName: true,
        }
      }
    );

    return Conn;
  }

  getModels(){
    const prefix = 'wp_';
    const Conn = this.connection;

    return {
Post: Conn.define(prefix + 'posts', {
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
}),
Postmeta: Conn.define(prefix + 'postmeta', {
  meta_id: { type: Sequelize.INTEGER, primaryKey: true, field: 'meta_id' },
  post_id: { type: Sequelize.INTEGER },
  meta_key: { type: Sequelize.STRING },
  meta_value: { type: Sequelize.INTEGER },
}),
Terms: Conn.define(prefix + 'terms', {
  term_id: { type: Sequelize.INTEGER, primaryKey: true },
  name: { type: Sequelize.STRING },
  slug: { type: Sequelize.STRING },
  term_group: { type: Sequelize.INTEGER },
}),
TermRelationships: Conn.define(prefix + 'term_relationships', {
  object_id: { type: Sequelize.INTEGER, primaryKey: true },
  term_taxonomy_id: { type: Sequelize.INTEGER },
  term_order: { type: Sequelize.INTEGER },
}),
TermTaxonomy: Conn.define(prefix + 'term_taxonomy', {
  term_taxonomy_id: { type: Sequelize.INTEGER, primaryKey: true },
  term_id: { type: Sequelize.INTEGER },
  taxonomy: { type: Sequelize.STRING },
  parent: { type: Sequelize.INTEGER },
  count: { type: Sequelize.INTEGER },
})
    }
  }

  getQueries(){
    const { amazonS3, uploadDirectory } = this.connectionDetails;
    const { Post, Postmeta, Terms, TermRelationships, TermTaxonomy  } = this.getModels();

    Terms.hasMany(TermRelationships,  {foreignKey: 'term_taxonomy_id'});
    TermRelationships.belongsTo(Terms, {foreignKey: 'term_taxonomy_id'});

    TermRelationships.hasMany(Postmeta, {foreignKey: 'post_id'});
    Postmeta.belongsTo(TermRelationships, {foreignKey: 'post_id'});

    TermRelationships.belongsTo(Post, {foreignKey: 'object_id'});

    Post.hasMany(Postmeta, {foreignKey: 'post_id'});
    Postmeta.belongsTo(Post, {foreignKey: 'post_id'});

    return {
      getViewer(){
        return viewer
      },
      getPosts(args){
        const {post_type} = args;
        return Post.findAll({
          where: {
            post_type: post_type,
            post_status: 'publish',
          }
        })
      },
      getPostById(postId){
        return Post.findOne({
          where: {
            id: postId
          }
        })
      },
      getPostByName(name){
        return Post.findOne({
          where: {
            post_status: 'publish',
            post_name: name
          }
        })
      },
      getPostThumbnail(postId){
        return Postmeta.findOne({
          where: {
            post_id: postId,
            meta_key: '_thumbnail_id'
          }
        }).then( res => {
          if (res){
            let meta_key = amazonS3 ? 'amazonS3_info' : '_wp_attached_file';

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
                const thumbnailSrc = amazonS3 ?
                  uploadDirectory + PHPUnserialize.unserialize(thumbnail).key :
                  uploadDirectory + thumbnail;

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
      getPostLayout(postId){
        return Postmeta.findOne({
          where: {
            post_id: postId,
            meta_key: 'react_layout'
          }
        })
      },
      getPostmetaById(metaId, keys){
        return Postmeta.findOne({
          where: {
            meta_id: metaId,
            meta_key: {
              $in: keys
            }
          }
        })
      },
      getPostmeta(postId, keys){
        return Postmeta.findAll({
          where: {
            post_id: postId,
            meta_key: {
              $in: keys
            }
          }
        })
      },
      getMenu(name){
        return Terms.findOne({
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
    }
  }
}
