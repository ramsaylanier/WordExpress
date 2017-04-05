import gql from 'graphql-tag';

export function PostListQuery({ownProps}) {
  return {
    getPosts: {
      query: gql`
        query getPosts($post_type: String){
          posts(post_type: $post_type){
            id
            post_title
            post_name
            post_content
            post_parent
          }
        }
      `,
      variables: {
        post_type: ownProps.layout.postType
      }
    }
  };
}

export function PostQuery({ownProps}) {
  return {
    getPost: {
      query: gql`
        query post($id: Int){
          post(id: $id){
            id
            post_title
            post_name
            post_content
            post_parent
          }
        }
      `,
      variables: {
        id: ownProps.id
      }
    }
  };
}
