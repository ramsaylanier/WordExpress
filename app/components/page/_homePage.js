import React from 'react';
import { render } from 'react-dom';
import Relay from 'react-relay';
import { Link } from 'react-router';
import { Page, PageContent, PageHero } from '../Page/page.js';

class HomePage extends React.Component{

	render(){

		const {post_title, post_type } = this.props.viewer.pages.edges[0].node;

		return (
			<Page>
				<PageContent>
					<PageHero>
						<h1>{post_title}</h1>
						<p>{post_type}</p>
					</PageHero>

					<Link to="/test">Test</Link>
				</PageContent>
			</Page>
		)
	}
}

export default Relay.createContainer(HomePage, {

	initialVariables: {
		postTitle: "Homepage",
		limit: 1
	},

  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        pages(post_title: $postTitle, first: $limit){
					edges{
						node{
							id
							post_title
							post_type
						}
					}
				}
      }
    `,
  },
});
