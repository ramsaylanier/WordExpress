import React from 'react';
import Relay from 'react-relay';

import Page from '../pages/page.js';

import CSSModules from 'react-css-modules';
import styles from './post.scss';

@CSSModules(styles, {allowMultiple: true})
class PostSingle extends React.Component{

  _renderExcerpt(){
    const { post_content } = this.props.viewer.page;
    return {
      __html: post_content
    }
  }

  render(){
    const { post_title, post_content, thumbnail } = this.props.viewer.page;
    const { uploads } = this.props.viewer.settings;
    const bg = {
      backgroundImage: "url('" + uploads + thumbnail + "')"
    }

    return(
      <div styleName="base">
        <header styleName="header" style={bg}>
        </header>
        <div styleName="content">
          <div styleName="wrapper">
            <h1 styleName="title">{post_title}</h1>
            <p dangerouslySetInnerHTML = {this._renderExcerpt()}/>
          </div>
        </div>
      </div>
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
          post_content
          thumbnail
        },
        settings{
          id
          uploads
        }
			}
    `,
  },
});
