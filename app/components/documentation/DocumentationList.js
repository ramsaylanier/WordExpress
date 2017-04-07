import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { gql, graphql } from 'react-apollo'
import Page from '../pages/page'
import Sidebar from '../sidebar/sidebar'
import PostContent from '../posts/PostContent'
import PostListWidget from '../widgets/PostList/PostListWidget'
import { FilterPostsWithChildren } from '../../filters'
import CSSModules from 'react-css-modules'
import styles from './documentation.scss'
import {TweenMax} from 'gsap'

@CSSModules(styles, {allowMultiple: true})
class DocumentationList extends Component {
  constructor() {
    super()
    this._animatePostIn = this._animatePostIn.bind(this)
  }

  componentDidMount() {
    this._animatePostIn()
  }

  componentDidUpdate() {
    this._animatePostIn()
  }

  _renderChildren(children) {
    if (children && children.length > 0) {
      return (
        children.map( child =>{
          return (
            <div key={child.id} id={child.post_name} styleName="item-child">
              <h3 styleName="title__child">{child.post_title}</h3>
              <PostContent content={child.post_content}/>

              {this._renderChildren(child.children)}
            </div>
          )
        })
      )
    }
  }

  _animatePostIn() {
    const post = this._post
    if (post) {
      TweenMax.to(post, 0.5, {
        opacity: 1
      })
    }
  }

  render() {
    const { posts } = this.props.data
    const { uiState } = this.props

    if (posts && !posts.loading) {
      console.log(posts)
      const filteredPosts = FilterPostsWithChildren(posts)
      console.log(filteredPosts)

      return (
        <Page classes="with-sidebar">
          <Sidebar dispatch={this.props.dispatch} state={uiState.sidebarState}>
            <PostListWidget posts={filteredPosts}/>
          </Sidebar>

          <div ref={(c) => this._post = c} styleName="base">
            {filteredPosts.map( post =>{
              const {post_name: name, post_title: title, post_content: content} = post
              return (
                <div key={post.id} id={name} styleName="item">
                  <h2 styleName="title">{title}</h2>
                  <PostContent content={content}/>

                  {this._renderChildren(post.children)}
                </div>
              )
            })}
          </div>
        </Page>
      )
    }

    return (
      <div>Loading...</div>
    )
  }
}

DocumentationList.propTypes = {
  posts: PropTypes.array,
  uiState: PropTypes.object,
  dispatch: PropTypes.func
}

const DocumentListQuery = gql`
  query getPosts($post_type: String, $order: OrderInput){
    posts(post_type: $post_type, order: $order){
      id
      post_title
      post_name
      post_content
      post_parent
      thumbnail
      post_meta(keys: [order]) {
        meta_value
      }
    }
  }
`

const DocumentationListWithData = graphql(DocumentListQuery, {
  options: () => ({
    variables: {
      post_type: 'documentation',
      order: {
        orderBy: 'order',
        direction: 'ASC'
      }
    }
  })
})(DocumentationList)

const DocumentationListWithDataAndState = connect(
  (state) => ({uiState: state.ui})
)(DocumentationListWithData)

export default DocumentationListWithDataAndState
