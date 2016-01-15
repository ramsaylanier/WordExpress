import React from 'react';
import Relay from 'react-relay';
import Page from './page.js';

class LandingPage extends React.Component{

	render(){
		console.log('landing page');
		const { viewer } = this.props;
		const { page } = viewer;
		const { post_title, post_content} = page;

		return (
			<Page withWrapper="true">
					<h1>{post_title}</h1>
					<p>{post_content}</p>
			</Page>
		)
	}
}

export default Relay.createContainer(LandingPage, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        page(post_title:"Homepage"){
					id,
					post_title
					post_content
				}
      }
    `,
  },
});
