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

import {
  Conn,
  ConnQueries,
  getUser,
  getMenu,
 } from './db.js';

let {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);
    if (type === 'User') {
      return getUser(id);
    } else if (type === 'Option') {
      return ConnQueries.getOptionById(id)
    } else if (type === 'Post') {
      return ConnQueries.getPostById(id)
    } else if (type === 'Postmeta'){
      return ConnQueries.getPostmetaById(id)
    } else if (type === 'Menu'){
      return getMenu(id);
    } else {
      return null
    }
  },
  (obj) => {
    if (obj instanceof User) {
      return GraphQLUser;
    } else if (obj instanceof Option){
      return GraphQLOption;
    } else if (obj instanceof Post){
      return GraphQLPost;
    } else if (obj instanceof Postmeta){
      return GraphQLPostmeta;
    } else if (obj instanceof Menu){
      return GraphQLMenu;
    } else {
      return null
    }
  }
)

const GraphQLOption = new GraphQLObjectType({
  name: 'Option',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve(root){
        console.log(root);
        return root.dataValues.option_id;
      }
    },
    option_name: { type: GraphQLString },
    option_value: { type: GraphQLString },
  })
});

const {
  connectionType: OptionConnection,
  edgeType: GraphQLOptionEdge,
} = connectionDefinitions({
  name: 'Option',
  nodeType: GraphQLOption
});

const GraphQLPost = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    post_title: { type: GraphQLString },
    post_content: { type: GraphQLString },
    post_status: { type: GraphQLString },
    post_type: { type: GraphQLString },
    post_name: { type: GraphQLString},
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
  interfaces: [nodeInterface]
});

const {
  connectionType: PostsConnection,
  edgeType: GraphQLPostEdge,
} = connectionDefinitions({
  name: 'Post',
  nodeType: GraphQLPost
});

const GraphQLMenuItem = new GraphQLObjectType({
  name: 'MenuItem',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    linkedId: { type: GraphQLInt },
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
      type: new GraphQLList(GraphQLMenuItem),
      resolve: (root, args) => {
        return ConnQueries.getMenu().items;
      }
    }
  }),
  interfaces: [nodeInterface]
});

const GraphQLMetaType = new GraphQLEnumType({
  name: 'MetaType',
  values: {
    thumbnailID: {value: '_thumbnail_id'},
    attachedFile: {value: '_wp_attached_file'}
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
  interfaces: [nodeInterface]
});

const {
  connectionType: PostmetaConnection,
  edgeType: GraphQLPostmetaEdge,
} = connectionDefinitions({
  name: 'Postmeta',
  nodeType: GraphQLPostmeta
});

const GraphQLUser = new GraphQLObjectType({
  name: "User",
  fields: {
    id: globalIdField("User"),
    options: {
      type: OptionConnection,
      resolve: (root, args) => {
        return connectionFromPromisedArray( ConnQueries.getOptions(), args);
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
        return connectionFromPromisedArray( ConnQueries.getPosts(args.post_type), args );
      }
    },
    page: {
      type: GraphQLPost,
      args:{
        post_title:{ type: GraphQLString },
      },
      resolve(root, args){
        return ConnQueries.getPageByTitle(args.post_title);
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
  },
  interfaces: [nodeInterface]
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
    node: nodeField,
  },
});

const Schema = new GraphQLSchema({
  query: GraphQLRoot
});
export default Schema;
