import React from 'react';
import Relay from 'react-relay';

import PostExcerpt from './PostExcerpt.js';

class PostList extends React.Component{

  componentWillMount(){
    this.props.relay.setVariables({
      limit: this.props.layoutVars.limit
    })
  }

  render(){
    const { posts } = this.props.viewer;

    if (posts){
      return(
        <div>
          {posts.edges.map( (post, index) => {
            return(
              <PostExcerpt index={index} key={post.node.id} viewer={this.props.viewer} {...post.node} />
            )
          })}
        </div>
      )
    } else {
      return(
        <div>Loading</div>
      )
    }
  }
}

export default Relay.createContainer(PostList, {

  prepareVariables(prevVars){
    return{
      limit: prevVars.limit
    }
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        posts(first: $limit){
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
  },
});
