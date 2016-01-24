import React from 'react';
import { Link } from 'react-router';

import CSSModules from 'react-css-modules';
import styles from './post_excerpt.scss';

import { browserHistory } from 'react-router';


@CSSModules(styles, {allowMultiple: true})
class PostExcerpt extends React.Component{

  componentDidMount(){
    const excerpt = this._excerpt;
    const { index } = this.props;

    TweenMax.fromTo(excerpt, 1, {
      opacity: 0,
      x: 20
    },{
      opacity: 1,
      x: 0,
      ease: Power4.easeOut,
      delay: index * 0.1
    });
  }

  _handleClick(e){
    e.preventDefault();
    const target = e.currentTarget.href;
    const posts = document.getElementsByClassName(this.props.styles.base);
    TweenMax.staggerTo(posts, 0.5, {
      opacity: 0,
      x: -20,
      ease: Power4.easeOut
    }, -0.1);

    window.setTimeout( ()=> {
      browserHistory.push(target)
    }, 500);

  }

  _renderExcerpt(){
    const { post_excerpt } = this.props;
    return {
      __html: post_excerpt
    }
  }

  render(){
    const { post_title, post_name, thumbnail } = this.props;
    const { uploads, amazonS3 } = this.props.viewer.settings;
    const bg = {
      backgroundImage: "url('" + thumbnail + "')"
    }

    return(
      <div ref={(c) => this._excerpt = c}>
        <Link to={'post/' + encodeURIComponent(post_name)} styleName="base" onClick={this._handleClick.bind(this)}>
          <div styleName="info">
            <h2 styleName="title">{post_title}</h2>
            <p styleName="text" dangerouslySetInnerHTML = {this._renderExcerpt()}/>
          </div>
          <div styleName="thumbnail" style={bg}>
          </div>
        </Link>
      </div>
    )

  }
}

export default PostExcerpt;
