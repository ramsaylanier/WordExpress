import React from 'react';
import Relay from 'react-relay';

import Page from '../pages/page.js';
import PostExcerpt from './PostExcerpt.js';
import Button from '../button/button.js';

class PostList extends React.Component{

  constructor(){
    super();
    this._loadMorePosts = this._loadMorePosts.bind(this);
  }

  componentWillMount(){
    const { limit, postType } = this.props.route.layout;

    this.props.relay.setVariables({
      limit: limit,
      postType: postType
    })

  }

  render(){
    const { posts } = this.props.viewer;
    const { hasNextPage, hasPreviousPage } = posts.pageInfo;

    if (posts){
      return(
        <Page>
          {posts.edges.map( (post, index) => {
            return(
              <PostExcerpt index={index} key={post.node.id} viewer={this.props.viewer} {...post.node} />
            )
          })}

          { hasNextPage &&
            <Button type="primary center" onClick={this._loadMorePosts}>Load More</Button>
          }

        </Page>
      )
    } else {
      return(
        <Page>Loading</Page>
      )
    }
  }

  _loadMorePosts(){
    const { limit, postType } = this.props.relay.variables;

    this.props.relay.setVariables({
      limit: limit * 2,
      postType: postType
    })
  }
}

export default Relay.createContainer(PostList, {

  initialVariables: {
    limit: 20,
    postType: 'post'
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        page(post_name:"homepage"){
					id,
					thumbnail
				},
        posts(post_type: $postType first: $limit){
					edges{
            cursor
						node{
							id
							post_title
							post_name
							post_excerpt
              thumbnail
						}
					},
          pageInfo{
            hasNextPage,
            hasPreviousPage
          }
				},
        settings{
          id
          uploads
          amazonS3
        }
			}
    `
  }
});
