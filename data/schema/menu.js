import {
  GraphQL,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';

import { ConnQueries } from '../db.js';

import { GraphQLPost } from './post';

export const GraphQLMenuItem = new GraphQLObjectType({
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

export const GraphQLMenu = new GraphQLObjectType({
  name: 'Menu',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    items: {
      type: new GraphQLList(GraphQLMenuItem)
    }
  })
});
