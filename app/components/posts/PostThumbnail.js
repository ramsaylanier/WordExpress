import React from 'react';
import unserialize from 'php-unserialize';

import CSSModules from 'react-css-modules';
import styles from './post.scss';

@CSSModules(styles, {allowMultiple: true})
class PostThumbnail extends React.Component{
  render(){
    const { thumbnail, settings } = this.props;
    const { uploads, amazonS3} = settings;
    const styleName = this.props.styleName || "thumbnail";
    let thumbnailSrc, bg;

    if( thumbnail ){
      if (amazonS3){
        thumbnailSrc = uploads + PHPUnserialize.unserialize(thumbnail).key;
      } else {
        thumbnailSrc = uploads + thumbnail;
      }
      bg = {
        backgroundImage: "url('" + thumbnailSrc + "')"
      }
    }

    return(
      <div styleName={styleName} style={bg}></div>
    )
  }
}

export default PostThumbnail;
