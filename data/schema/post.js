import {
  GraphQL,
  GraphQLSchema,
  GraphQLEnumType,
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

import { ConnQueries } from '../db.js';

import {PostmetaConnection, GraphQPPostmeta, GraphQLMetaType } from './postmeta.js';

export const GraphQLPost = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    post_title: { type: GraphQLString },
    post_content: { type: GraphQLString },
    post_status: { type: GraphQLString },
    post_type: { type: GraphQLString },
    post_name: { type: GraphQLString},
    menu_order: { type: GraphQLInt},
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
  }),
  interfaces: []
});

export const {
  connectionType: PostsConnection,
  edgeType: GraphQLPostEdge,
} = connectionDefinitions({
  name: 'Post',
  nodeType: GraphQLPost
});
