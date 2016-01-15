import React from 'react';
import Relay from 'react-relay';
import Page from './page.js';

class WordpressPage extends React.Component{

	render(){
		const { post_title, post_content} = this.props.viewer.page;

		return (
			<Page withWrapper="true">
					<h1>{post_title}</h1>
					<p>{post_content}</p>
			</Page>
		)
	}
}

export default Relay.createContainer(WordpressPage, {

  initialVariables: { page: null},

  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        page(post_title:$page){
					id,
					post_title
					post_content
				}
      }
    `,
  },
});
