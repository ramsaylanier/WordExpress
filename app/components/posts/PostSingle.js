import React from 'react';
import Relay from 'react-relay';

import Page from '../pages/page.js';

class PostSingle extends React.Component{
  render(){

    const { post_title } = this.props.viewer.page;
    const { uploads } = this.props.viewer.settings;

    return(
      <Page withWrapper={true}>
        <h1>{post_title}</h1>
      </Page>
    )
  }
}

export default Relay.createContainer(PostSingle, {
  initialVariables: {
    post: null
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        page(post_name:$post){
          id
          post_title
        },
        settings{
          id
          uploads
        }
			}
    `,
  },
});
