import React from 'react';
import Relay from 'react-relay';

class DefaultLayout extends React.Component{
  render(){
    const { page } = this.props.viewer;
    const { post_title, post_content } = page;
    return(
      <div>
        <h3>{post_title}</h3>
        <p>{post_content}</p>
      </div>
    )
  }
}

export default DefaultLayout;
