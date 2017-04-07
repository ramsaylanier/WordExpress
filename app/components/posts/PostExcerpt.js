import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './post_excerpt.scss'
import { browserHistory } from 'react-router'
import {TweenMax, Power4} from 'gsap'


@CSSModules(styles, {allowMultiple: true})
class PostExcerpt extends Component {
  componentDidMount() {
    const excerpt = this._excerpt
    const { index } = this.props

    TweenMax.fromTo(excerpt, 1, {
      opacity: 0,
      x: 20
    }, {
      opacity: 1,
      x: 0,
      ease: Power4.easeOut,
      delay: index * 0.1
    })
  }

  _handleClick(e) {
    e.preventDefault()
    const target = e.currentTarget.href
    const posts = document.getElementsByClassName(styles.base)
    TweenMax.staggerTo(posts, 0.5, {
      opacity: 0,
      x: -20,
      ease: Power4.easeOut
    }, -0.1)

    window.setTimeout( ()=> {
      browserHistory.push(target)
    }, 500)
  }

  _renderExcerpt() {
    const { post_excerpt } = this.props.post
    return {
      __html: post_excerpt
    }
  }

  render() {
    const { post_title: title, post_name: name, thumbnail } = this.props.post
    const bg = {
      backgroundImage: `url('${thumbnail}')`
    }

    return (
      <div ref={(c) => this._excerpt = c}>
        <Link to={'post/' + encodeURIComponent(name)} styleName="base" onClick={this._handleClick.bind(this)}>
          <div styleName="info">
            <h2 styleName="title">{title}</h2>
            <p styleName="text" dangerouslySetInnerHTML = {this._renderExcerpt()}/>
          </div>
          <div styleName="thumbnail" style={bg}>
          </div>
        </Link>
      </div>
    )
  }
}

PostExcerpt.propTypes = {
  index: PropTypes.number,
  styles: PropTypes.object,
  post: PropTypes.object,
  settings: PropTypes.object
}

export default PostExcerpt
