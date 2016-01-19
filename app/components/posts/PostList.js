import React from 'react';
import Relay from 'react-relay';

import PostExcerpt from './PostExcerpt.js';

class PostList extends React.Component{

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

export default PostList;
