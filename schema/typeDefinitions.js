const typeDefinitions = `
  type Menu {
    id: ID!
    name: String
    items: [MenuItem]
  }

  type MenuItem {
    id: ID!
    linkedId: Int
    order: Int
    navitem: Post
    children: [MenuItem]
  }

  enum MetaType {
    thumbnailID
    attachedFile
    reactLayout
    amazonInfo
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type Post {
    id: Int
    post_title: String
    post_content: String
    post_excerpt: String
    post_status: String
    post_type: String
    post_name: String
    menu_order: Int
    layout: Postmeta
    thumbnail: String
    post_meta(keys: [MetaType], after: String, first: Int, before: String, last: Int): Postmeta
  }

  type Postmeta {
    id: Int
    meta_id: Int
    post_id: Int
    meta_key: String
    meta_value: String
    connecting_post: Post
  }

  type Setting {
    uploads: String
    amazonS3: Boolean
  }

  type Query {
    settings: Setting
    posts(post_type: String = "post"): [Post]
    menus(name: String): Menu
    page(name: String): Post
    postmeta(post_id: Int, after: String, first: Int, before: String, last: Int): Postmeta
  }

  schema {
    query: Query
  }
`;

export default [typeDefinitions];
