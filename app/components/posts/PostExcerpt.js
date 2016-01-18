import React from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import styles from './post.scss';

@CSSModules(styles, {allowMultiple: true})
class PostExcerpt extends React.Component{

  _renderExcerpt(){
    const { post_excerpt } = this.props;
    return {
      __html: post_excerpt
    }
  }

  render(){
    const { post_title, post_name, thumbnail } = this.props;
    const { uploads } = this.props.viewer.settings;
    const thumbnailSrc = uploads + thumbnail;
    const bg = {
      backgroundImage: "url('" + thumbnailSrc + "')"
    }

    console.log(post_name);

    return(
      <Link to={'post/' + encodeURIComponent(post_name)} styleName="excerpt">
        <div styleName="info">
          <h3>{post_title}</h3>
          <p dangerouslySetInnerHTML = {this._renderExcerpt()}/>
        </div>
        <div styleName="thumbnail" style={bg}></div>
      </Link>
    )

  }
}

export default PostExcerpt;
