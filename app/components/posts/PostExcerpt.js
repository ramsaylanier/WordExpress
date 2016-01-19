import React from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import styles from './post_excerpt.scss';

@CSSModules(styles, {allowMultiple: true})
class PostExcerpt extends React.Component{

  componentDidMount(){
    const excerpt = this._excerpt;
    const { index } = this.props;

    TweenMax.fromTo(excerpt, 1, {
      opacity: 0,
      y: 10
    },{
      opacity: 1,
      y: 0,
      ease: Power4.easeOut,
      delay: index * 0.1
    });
  }

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

    return(
      <div ref={(c) => this._excerpt = c}>
        <Link to={'post/' + encodeURIComponent(post_name)} styleName="base">
          <div styleName="info">
            <h2 styleName="title">{post_title}</h2>
            <p dangerouslySetInnerHTML = {this._renderExcerpt()}/>
          </div>
          <div styleName="thumbnail" style={bg}></div>
        </Link>
      </div>
    )

  }
}

export default PostExcerpt;
