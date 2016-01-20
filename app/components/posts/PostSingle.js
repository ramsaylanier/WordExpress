import React from 'react';
import Relay from 'react-relay';

import Page from '../pages/page.js';

import CSSModules from 'react-css-modules';
import styles from './post.scss';

console.log(styles);

@CSSModules(styles, {allowMultiple: true})
class PostSingle extends React.Component{

  componentDidMount(){
    const post = this._post;
    TweenMax.fromTo(post, 0.5, {
      opacity: 0
    }, {
      opacity: 1
    });
  }

  _renderExcerpt(){
    const { post_content } = this.props.viewer.page;
    const trimmed = post_content.trim();

    //Recreates the Wordpress autop function to wrap new lines in paragraph tags.
    //This is necessary because Wordpress doesn't save the paragraph tags in the post-content column.
    const content = trimmed.replace(/[\r\n]+/g,'</p><p>');

    return {
      __html: content
    }
  }

  render(){
    console.log(this.props);
    const { post_title, post_content, thumbnail } = this.props.viewer.page;
    const { uploads } = this.props.viewer.settings;
    const bg = {
      backgroundImage: "url('" + uploads + thumbnail + "')"
    }

    return(
      <div ref={(c) => this._post = c} styleName="base">
        <header styleName="header" style={bg}>
        </header>
        <div styleName="main">
          <div styleName="wrapper">
            <h1 styleName="title">{post_title}</h1>
            <div styleName="content">
              <div dangerouslySetInnerHTML = {this._renderExcerpt()}/>
            </div>
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
