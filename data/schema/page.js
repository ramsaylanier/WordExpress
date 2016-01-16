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
import { PostsConnection, GraphQLPost } from './post.js';

const GraphQLPage = new GraphQLObjectType({
  name: "Page",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    post_title: { type: GraphQLString},
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
        return connectionFromPromisedArray( ConnQueries.getPosts(args.post_type), args );
      }
    }
  }
})

export default GraphQLPage;
