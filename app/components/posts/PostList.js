import React from 'react';
import Relay from 'react-relay';

class PostList extends React.Component{

  _renderPosts(){
    const { posts } = this.props.viewer;

    if (posts){
      return posts.edges.map( post => {
        const { post_title, post_content } = post.node;
        return(
          <div>
            <h3>{post_title}</h3>
            <h3>{post_content}</h3>
          </div>
        )
      })
    }

    return
  }

  render(){
    return(
      <div>
        <h3>Posts</h3>
        {this._renderPosts()}
      </div>
    )
  }

}

export default PostList;
