import React, {Component, PropTypes} from 'react'
import Page from '../pages/page.js'
import PostContent from '../posts/PostContent'
import CSSModules from 'react-css-modules'
import styles from '../pages/page.scss'

@CSSModules(styles, {allowMultiple: true})
class DefaultLayout extends Component {
  render() {
    const { loading } = this.props.page

    if (!loading) {
      const { post_title: title, post_content: content, thumbnail } = this.props.page
      const bg = {backgroundImage: `url("${thumbnail}")`}
      const heroClass = thumbnail ? 'hero_thumbnail' : 'hero'

      return (
        <Page>
          <div styleName={heroClass} style={bg}>
            <div styleName="wrapper tight">
              <h2 styleName="title">{title}</h2>
            </div>
          </div>

          <div styleName="content">
            <div styleName="wrapper tight">
              <PostContent content={content}/>
            </div>
          </div>
        </Page>
      )
    }

    return <div></div>
  }
}

DefaultLayout.propTypes = {
  page: PropTypes.object
}

export default DefaultLayout
