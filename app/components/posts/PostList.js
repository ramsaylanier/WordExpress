import React from 'react';
import Relay from 'react-relay';

import PostExcerpt from './PostExcerpt.js';

class PostList extends React.Component{

  componentDidMount(){
    this.props.relay.setVariables({
      limit: this.props.layoutVars.limit
    })
  }

  render(){
    const { posts } = this.props.viewer;
    return(
      <div>
        {posts.edges.map( (post, index) => {
          return(
            <PostExcerpt index={index} key={post.node.id} viewer={this.props.viewer} {...post.node} />
          )
        })}
      </div>
    )
  }
}

export default Relay.createContainer(PostList, {

  initialVariables:{
    limit: 1
  },

  prepareVariables(prevVars){
    return{
      limit: prevVars.limit
    }
  },

  fragments: {
    viewer: (variables) => Relay.QL`
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
