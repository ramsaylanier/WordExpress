import React from 'react';
import { connect } from 'react-apollo';
import gql from 'graphql-tag';

import Page from '../pages/page.js';
import PostExcerpt from './PostExcerpt.js';
import Button from '../button/button.js';


class PostList extends React.Component{

  constructor(){
    super();
    this._loadMorePosts = this._loadMorePosts.bind(this);
  }

  render(){
    const { posts, settings } = this.props.page;

    if (posts){
      let hasNextPage, hasPreviousPage;

      if (posts.pageInfo){
        let { hasNextPage, hasPreviousPage } = posts.pageInfo
      }

      return(
        <Page>
          {posts.map( (post, index) => {
            return(
              <PostExcerpt index={index} key={post.id} post={post} settings={settings} />
            )
          })}

          { hasNextPage &&
            <Button type="primary center" onClick={this._loadMorePosts}>Load More</Button>
          }
        </Page>
      )
    } else{
      return(
        <div>Loading...</div>
      )
    }
  }

  _loadMorePosts(){
    const limit = this.props.page.posts.edges.length;
    this.props.page.refetch({limit: limit + 1});
  }
}

const PostListWithData = connect({
  mapQueriesToProps({ ownProps, state}) {
    return {
      page: {
        query: gql`
          query getPosts($postType: String){
            posts(post_type: $postType){
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
          postType: ownProps.route.layout.postType || 'post'
        }
      }
    }
  }
})(PostList);

export default PostListWithData;
