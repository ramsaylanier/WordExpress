import React from 'react';
import { connect } from 'react-apollo';
import gql from 'graphql-tag';

import PostContent from './PostContent.js';

import CSSModules from 'react-css-modules';
import styles from './post.scss';

@CSSModules(styles, {allowMultiple: true})
class PostSingle extends React.Component{

  constructor(){
    super();
    this._animatePostIn = this._animatePostIn.bind(this);
  }

  componentDidMount(){
    this._animatePostIn();
  }

  componentDidUpdate(){
    this._animatePostIn();
  }

  render(){
    const { loading } = this.props.post;

    if (loading){
      return <div></div>
    } else {

      const { post_title, post_content, thumbnail } = this.props.post.page;
      const { settings } = this.props.post;
      const { uploads, amazonS3 } = settings;

      let bg = {
        backgroundImage: 'url("' + thumbnail + '")'
      }

      return(
        <div ref={(c) => this._post = c} styleName="base">
          <div styleName="header" style={bg}>

          </div>
          <div styleName="main">
            <div styleName="wrapper">
              <h1 styleName="title">{post_title}</h1>
              <PostContent post_content={post_content}/>
            </div>
          </div>
        </div>
      )
    }
  }

  _animatePostIn(){
    const post = this._post;
    if (post){
      TweenMax.fromTo(post, 0.5, {
        opacity: 0
      }, {
        opacity: 1
      });
    }
  }
}

const PostSingleWithData = connect({
  mapQueriesToProps({ ownProps, state}) {
    return {
      post: {
        query: gql`
          query getPost($post: String){
            page(name:$post){
              id
              post_title
              post_content
              thumbnail
            },
            settings{
              uploads
              amazonS3
            }
          }
        `,
        variables: {
          post: ownProps.params.post
        }
      }
    }
  }
})(PostSingle);

export default PostSingleWithData;
