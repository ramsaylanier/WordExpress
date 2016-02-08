import React from 'react';
import Relay from 'react-relay';
import Page from '../pages/page.js';
import PostContent from '../posts/PostContent';

class FrontPageLayout extends React.Component{

	render(){
		const { post_title, post_content, thumbnail} = this.props.viewer.page;
		let bg = {
			backgroundImage: "url('" + thumbnail + "')"
		}

		let heroClass = thumbnail ? "hero_thumbnail" : "hero"

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
						<PostContent post_content={post_content}/>
					</div>
				</div>
			</Page>
		)
	}
}

export default Relay.createContainer(FrontPageLayout, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        page(post_name:"homepage"){
					id,
					post_title
					post_content
					thumbnail
				},
				settings{
					id
					uploads
					amazonS3
				}
      }
    `,
  },
});
