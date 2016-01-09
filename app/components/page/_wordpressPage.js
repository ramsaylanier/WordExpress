import React from 'react';
import { render } from 'react-dom';
import Relay from 'react-relay';
import { Link } from 'react-router';
import { Page, PageContent } from '../Page/page.js';

//styles

const WordpressPage = React.createClass({

	render(){
		const {post_title, post_type } = this.props.viewer.pages.edges[0].node;

		return (
			<Page>
				<PageContent>
						<h1>{post_title}</h1>
						<p>{post_type}</p>

						<Link to="/test">Test</Link>
				</PageContent>
			</Page>
		)
	}
});

export default Relay.createContainer(WordpressPage, {

	initialVariables: {
		page: null,
		limit: 1
	},

	prepareVariables({page}){
		return{
			page: page,
			limit: 1
		}
	},

  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        pages(post_title: $page, first: $limit){
					edges{
						node{
							post_title
							post_type
						}
					}
				}
      }
    `,
  },
});
