import React, {Component, PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './post-list-widget.scss'
import {map} from 'lodash'

@CSSModules(styles, {allowMultiple: true})
class PostListWidgetItem extends Component {
  _renderChildren(children) {
    if (children && children.length > 0) {
      return (
        <ul styleName="sublist">
          {map(children, child => {
            return (
              <PostListWidgetItem key={child.id} post={child}/>
            )
          })}
        </ul>
      )
    }
  }

  render() {
    const { post } = this.props
    return (
      <li>
        <a href={`#${post.post_name}`}>
          {post.post_title}
        </a>
        {this._renderChildren(post.children)}
      </li>
    )
  }
}

PostListWidgetItem.propTypes = {
  post: PropTypes.object
}

export default PostListWidgetItem
