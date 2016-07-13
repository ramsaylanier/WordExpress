import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './post-list-widget.scss';
import { Link } from 'react-router';

@CSSModules(styles, {allowMultiple: true})
class PostListWidgetItem extends React.Component{
  render(){
    const { post } = this.props;
    return(
      <li>
        <a href={"#" + post.post_name}>
          {post.post_title}
        </a>

        {this._renderChildren(post.children)}
      </li>
    )
  }

  _renderChildren(children){
    if (children && children.length > 0){
      return(
        <ul styleName="sublist">
          {_.map(children, child => {
            return(
              <PostListWidgetItem key={child.id} post={child}/>
            )
          })}
        </ul>
      )
    }
  }
}

export default PostListWidgetItem;
