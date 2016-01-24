import React from 'react';
import Relay from 'react-relay';
import Page from './page.js';

class LandingPage extends React.Component{

	render(){
		const { viewer } = this.props;
		const { page, settings } = viewer;
		const { post_title, post_content, thumbnail} = page;
		console.log(settings);
		let bg = {
			backgroundImage: "url('" + thumbnail + "')"
		}

		return (
			<Page>
				<div styleName="hero" style={bg}>
					<div styleName="wrapper">
						<h1 styleName="title">WordExpress</h1>
						<h3 styleName="subtitle">Wordpress development with Javascript instead of PHP.</h3>
					</div>
				</div>
			</Page>
		)
	}
}

export default Relay.createContainer(LandingPage, {
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
