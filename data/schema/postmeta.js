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
import { GraphQLPost } from './post.js';

export const GraphQLMetaType = new GraphQLEnumType({
  name: 'MetaType',
  values: {
    thumbnailID: {value: '_thumbnail_id'},
    attachedFile: {value: '_wp_attached_file'},
    reactLayout: {value: 'react_layout'},
    amazonInfo: {value: 'amazonS3_info'}
  }
})

export const GraphQLPostmeta = new GraphQLObjectType({
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

export const {
  connectionType: PostmetaConnection,
  edgeType: GraphQLPostmetaEdge,
} = connectionDefinitions({
  name: 'Postmeta',
  nodeType: GraphQLPostmeta
});
