import React, {Component, PropTypes} from 'react'
import PostContent from '../posts/PostContent'
import Page from '../pages/page.js'

class FrontPageLayout extends Component {
  render() {
    const {loading} = this.props.page

    if (!loading) {
      const {post_content: content, thumbnail} = this.props.page
      const bg = {backgroundImage: `url("${thumbnail}")`}
      const heroClass = thumbnail ? 'hero_thumbnail' : 'hero'

      return (
        <Page>
          <div styleName={heroClass} style={bg}>
            <div styleName="wrapper tight">
              <h1 styleName="title">WordExpress</h1>
              <h4 styleName="subtitle">WordPress using Node, Express, and React.</h4>
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

    return <div>Loading...</div>
  }
}

FrontPageLayout.propTypes = {
  page: PropTypes.object
}

export default FrontPageLayout
