import React from 'react';
import { connect } from 'react-apollo';
import gql from 'graphql-tag';

import Page from '../pages/page.js';
import PostExcerpt from './PostExcerpt.js';
import Button from '../button/button.js';


class PostList extends React.Component{
  render(){
    const { posts, settings } = this.props.page;
    const { Excerpt } = this.props.layout;

    if (posts){
      return(
        <Page>
          {posts.map( (post, index) => {
            return(
              <Excerpt index={index} key={post.id} post={post} settings={settings} />
            )
          })}
        </Page>
      )
    } else{
      return(
        <div>Loading...</div>
      )
    }
  }
}

const PostListWithData = connect({
  mapQueriesToProps({ ownProps, state}) {
    return {
      page: {
        query: gql`
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
        `,
        variables: {
          postType: ownProps.layout.postType || 'post',
          limit: ownProps.layout.limit || 10,
          skip: ownProps.layout.skip || 0
        }
      }
    }
  }
})(PostList);

export default PostListWithData;
