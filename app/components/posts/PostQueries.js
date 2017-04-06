import { gql, graphql } from 'react-apollo'

const PostListQuery = gql`
  query getPosts($post_type: String){
    posts(post_type: $post_type){
      id
      post_title
      post_name
      post_content
      post_parent
      thumbnail
    }
  }
`

export function GetPostListQuery() {
  return graphql(PostListQuery, {
    options: (props) => ({
      variables: {
        post_type: props.layout.type
      }
    })
  })
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
