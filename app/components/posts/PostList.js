import React from 'react';
import Relay from 'react-relay';

import Page from '../pages/page.js';
import PostExcerpt from './PostExcerpt.js';

class PostList extends React.Component{

  componentWillMount(){
    const { limit, postType } = this.props.route.layout;

    this.props.relay.setVariables({
      limit: limit,
      postType: postType
    })

  }

  render(){
    const { posts } = this.props.viewer;

    if (posts){
      return(
        <Page>
          {posts.edges.map( (post, index) => {
            return(
              <PostExcerpt index={index} key={post.node.id} viewer={this.props.viewer} {...post.node} />
            )
          })}
        </Page>
      )
    } else {
      return(
        <Page>Loading</Page>
      )
    }
  }
}

export default Relay.createContainer(PostList, {

  initialVariables: {
    limit: 20,
    postType: 'post'
  },

  prepareVariables(prevVars){
    console.log(prevVars);
    return {
      ...prevVars
    }
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
						node{
							id
							post_title
							post_name
							post_excerpt
              thumbnail
						}
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
