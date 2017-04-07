import React, {Component, PropTypes} from 'react'
import { gql, graphql } from 'react-apollo'
import Page from '../pages/page.js'

class PostList extends Component {
  render() {
    const { posts, settings } = this.props.data
    const { Excerpt } = this.props.layout

    if (posts) {
      return (
        <Page>
          {posts.map( (post, index) => {
            return (
              <Excerpt index={index} key={post.id} post={post} settings={settings} />
            )
          })}
        </Page>
      )
    }

    return (
      <div>Loading...</div>
    )
  }
}

PostList.propTypes = {
  data: PropTypes.object,
  layout: PropTypes.object
}

const PostListQuery = gql`
  query getPosts($postType: String, $limit: Int, $skip: Int){
    posts(post_type: $postType, limit: $limit, skip: $skip ){
      id
      post_title
      post_name
      post_excerpt
      thumbnail
    },
    settings{
      uploads
      amazonS3
    }
  }
`

const PostListWithData = graphql(PostListQuery, {
  options: ({layout}) => ({
    variables: {
      postType: layout.postType || 'post',
      limit: layout.limit || 10,
      skip: layout.skip || 0
    }
  })
})(PostList)

export default PostListWithData
