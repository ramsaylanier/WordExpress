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
  connectionFromArray,
  connectionFromPromisedArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import ConnQueries from '../connection.js';

import GraphQLPage from './page.js';
import { GraphQLPost, PostsConnection } from './post.js';
import { GraphQLPostmeta, PostmetaConnection } from './postmeta.js';
import { GraphQLMenu, GraphQLMenuItem } from './menu.js';

import { publicSettings } from '../../settings/settings'

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
    }
  }
});

const Schema = new GraphQLSchema({
  query: GraphQLRoot
});
export default Schema;
