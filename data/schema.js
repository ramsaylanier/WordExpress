import {
  GraphQL,
  GraphQLSchema,
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
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import { Conn, ConnQueries } from './db.js';

let {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    let {type} = fromGlobalId(globalId);
    if (type == "Page"){
      return ConnQueries.getPageByTitle(idInfo.post_title)
    }
  },
  (obj) => {
    if (obj instanceof Post) {
      return postType;
    } else {
      return null;
    }
  }
)

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    post_title: { type: GraphQLString },
    post_content: { type: GraphQLString },
    post_status: { type: GraphQLString },
    post_type: { type: GraphQLString }
  }),
  interfaces: [nodeInterface],
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    pages: {
      type: postType,
      args: {
        post_title: {type: GraphQLString},
      },
      resolve(root, args) {
        return ConnQueries.getPageByTitle(args.post_title);
      }
    }
  })
});

const Schema = new GraphQLSchema({
  query: Query
});
export default Schema;
