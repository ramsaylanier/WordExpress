import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './post.scss';
import devSettings from '../../../settings/dev.json';
import prodSettings from '../../../settings/prod.json';

@CSSModules(styles, {allowMultiple: true})
class PostExcerpt extends React.Component{

  _renderContent(){
    const { post_content} = this.props;
    return {
      __html: post_content
    }
  }

  render(){
    const isDeveloping = process.env.NODE_ENV !== 'production';
    const settings = isDeveloping ? devSettings : prodSettings;
    const { post_title, post_content, thumbnail } = this.props;
    const thumbnailSrc = settings.uploads + thumbnail;
    const bg = {
      backgroundImage: "url('" + thumbnailSrc + "')"
    }

    return(
      <div styleName="excerpt">
        <div styleName="info">
          <h3>{post_title}</h3>
          <p dangerouslySetInnerHTML = {this._renderContent()}/>
        </div>
        <div styleName="thumbnail" style={bg}></div>
      </div>
    )

  }
}

export default PostExcerpt;
