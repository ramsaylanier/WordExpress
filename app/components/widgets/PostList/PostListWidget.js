import React, {Component, PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './post-list-widget.scss'
import PostListWidgetItem from './PostListWidgetItem'

@CSSModules(styles, {allowMultiple: true})
class PostListWidget extends Component {
  render() {
    const {posts} = this.props

    return (
      <div styleName="base">
        <ul styleName="post-list">
          {posts.map( post => {
            return (
              <PostListWidgetItem key={post.id} post={post}/>
            )
          })}
        </ul>
      </div>
    )
  }
}

PostListWidget.propTypes = {
  posts: PropTypes.object
}

export default PostListWidget
