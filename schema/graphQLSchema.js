import React from 'react';

import {
  GraphQL,
  GraphQLSchema,
  GraphQLEnumType,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  globalIdField
} from 'graphql-relay';

function WordExpressGraphQLSchema(ConnQueries, publicSettings){

  const GraphQLMenuItem = new GraphQLObjectType({
    name: 'MenuItem',
    fields: () => ({
      id: { type: new GraphQLNonNull(GraphQLID) },
      linkedId: { type: GraphQLInt },
      order: { type: GraphQLInt },
      navitem: {
        type: GraphQLPost,
        resolve: (root) => {
          return ConnQueries.getPostById(root.linkedId)
        }
      },
      children: {
        type: new GraphQLList(GraphQLMenuItem),
        resolve: (root) => {
          return root.children
        }
      }
    })
  });

  const GraphQLMenu = new GraphQLObjectType({
    name: 'Menu',
    fields: () => ({
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString },
      items: {
        type: new GraphQLList(GraphQLMenuItem)
      }
    })
  });

  const GraphQLMetaType = new GraphQLEnumType({
    name: 'MetaType',
    values: {
      thumbnailID: {value: '_thumbnail_id'},
      attachedFile: {value: '_wp_attached_file'},
      reactLayout: {value: 'react_layout'},
      amazonInfo: {value: 'amazonS3_info'}
    }
  })

  const GraphQLPostmeta = new GraphQLObjectType({
    name: 'Postmeta',
    fields: () => ({
      id: {
        type: new GraphQLNonNull(GraphQLID),
        resolve(root){
          return root.dataValues.meta_id;
        }
      },
      meta_id: { type: GraphQLInt },
      post_id: { type: GraphQLInt },
      meta_key: { type: GraphQLString },
      meta_value: { type: GraphQLString },
      connecting_post: {
        type: GraphQLPost,
        resolve: (root) => {
          return ConnQueries.getPostById(root.meta_value)
        }
      }
    }),
    interfaces: []
  });

  const {
    connectionType: PostmetaConnection,
    edgeType: GraphQLPostmetaEdge,
  } = connectionDefinitions({
    name: 'Postmeta',
    nodeType: GraphQLPostmeta
  });

  const GraphQLPost = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
      id: { type: new GraphQLNonNull(GraphQLID) },
      post_title: { type: GraphQLString },
      post_content: { type: GraphQLString },
      post_excerpt: { type: GraphQLString },
      post_status: { type: GraphQLString },
      post_type: { type: GraphQLString },
      post_name: { type: GraphQLString},
      menu_order: { type: GraphQLInt},
      layout: {
        type: GraphQLPostmeta,
        resolve(root){
          return ConnQueries.getPostLayout(root.id)
        }
      },
      thumbnail: {
        type: GraphQLString,
        resolve(root, args){
          return ConnQueries.getPostThumbnail(root.id);
        }
      },
      post_meta: {
        type: PostmetaConnection,
        args: {
          keys: {
            type: new GraphQLList(GraphQLMetaType)
          },
          ...connectionArgs,
        },
        resolve: (root, args ) => {
          return connectionFromPromisedArray(ConnQueries.getPostmeta(root.id, args.keys), args);
        }
      }
    })
  });

  const {
    connectionType: PostsConnection,
    edgeType: GraphQLPostEdge,
  } = connectionDefinitions({
    name: 'Post',
    nodeType: GraphQLPost
  });

  const GraphQLSetting = new GraphQLObjectType({
    name: 'Setting',
    fields: {
      id: globalIdField("User"),
      uploads: { type: GraphQLString },
      amazonS3: { type: GraphQLBoolean }
    }
  });

  const GraphQLUser = new GraphQLObjectType({
    name: "User",
    fields: {
      id: {type: new GraphQLNonNull(GraphQLID)} ,
      settings: {
        type: GraphQLSetting,
        resolve: ()=>{
          return publicSettings
        }
      },
      posts: {
        type: PostsConnection,
        args: {
          post_type: {
            type: GraphQLString,
            defaultValue: 'post'
          },
          ...connectionArgs
        },
        resolve(root, args) {
          return connectionFromPromisedArray( ConnQueries.getPosts(args), args );
        }
      },
      page: {
        type: GraphQLPost,
        args:{
          post_name:{ type: GraphQLString },
        },
        resolve(root, args){
          return ConnQueries.getPostByName(args.post_name);
        }
      },
      menus: {
        type: GraphQLMenu,
        args: {
          name: { type: GraphQLString }
        },
        resolve(root, args) {
          return ConnQueries.getMenu(args.name);
        }
      },
      postmeta: {
        type: PostmetaConnection,
        args: {
          post_id: {
            type: GraphQLInt
          },
          ...connectionArgs
        },
        resolve(root, args){
          return ConnQueries.getPostmeta(args.post_id)
        }
      }
    }
  })

  const GraphQLRoot = new GraphQLObjectType({
    name: 'Root',
    fields: {
      viewer: {
        type: GraphQLUser,
        resolve: () => {
          return ConnQueries.getViewer();
        }
      },
      posts: {
        type: PostsConnection,
        args: {
          post_type: {
            type: GraphQLString,
            defaultValue: 'post'
          },
          ...connectionArgs
        },
        resolve(root, args) {
          return connectionFromPromisedArray( ConnQueries.getPosts(args), args );
        }
      }
    }
  });

  const Schema = new GraphQLSchema({
    query: GraphQLRoot
  });

  return Schema;
}

export default WordExpressGraphQLSchema;
