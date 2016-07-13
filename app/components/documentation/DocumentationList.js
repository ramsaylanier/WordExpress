import React from 'react';
import { connect } from 'react-apollo';
import { createFragment } from 'apollo-client';
import gql from 'graphql-tag';

import Page from '../pages/page';
import PostContent from '../posts/PostContent';
import Sidebar from '../sidebar/sidebar';

import PostListWidget from '../widgets/PostList/PostListWidget';
import { PostListQuery } from '../posts/PostQueries';
import { FilterPostsWithChildren } from '../../filters';

import CSSModules from 'react-css-modules';
import styles from './documentation.scss';

@CSSModules(styles, {allowMultiple: true})
class DocumentationList extends React.Component{

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
    const { posts } = this.props.getPosts;
    const { uiState } = this.props;

    if (posts && !posts.loading){
      let filteredPosts = FilterPostsWithChildren(posts);

      return(
        <Page classes="with-sidebar">
          <Sidebar dispatch={this.props.dispatch} state={uiState.sidebarState}>
            <PostListWidget posts={filteredPosts}/>
          </Sidebar>

          <div ref={(c) => this._post = c} styleName="base">
            {filteredPosts.map( post =>{
              return(
                <div key={post.id} id={post.post_name} styleName="item">
                  <h2 styleName="title">{post.post_title}</h2>
                  <PostContent post_content={post.post_content}/>

                  {this._renderChildren(post.children)}
                </div>
              )
            })}
          </div>
        </Page>
      )
    } else{
      return(
        <div>Loading...</div>
      )
    }
  }

  _renderChildren(children){
    if (children && children.length > 0){
      return(
        children.map( child =>{
          return(
            <div key={child.id} id={child.post_name} styleName="item-child">
              <h3 styleName="title__child">{child.post_title}</h3>
              <PostContent post_content={child.post_content}/>

              {this._renderChildren(child.children)}
            </div>
          )
        })
      )
    }
  }

  _animatePostIn(){
    const post = this._post;
    if (post){
      TweenMax.to(post, 0.5, {
        opacity: 1
      });
    }
  }
}

function mapQueriesToProps(args){
  return PostListQuery(args);
}

function mapStateToProps(state, ownProps) {
  return {
    uiState: state.ui
  }
}

const DocumentationListWithData = connect({
  mapQueriesToProps,
  mapStateToProps
})(DocumentationList);

export default DocumentationListWithData;
