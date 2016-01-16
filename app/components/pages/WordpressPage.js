import React from 'react';
import Relay from 'react-relay';
import Page from './page.js';

import Layouts from '../layouts/layouts.js';

class WordpressPage extends React.Component{

	componentDidMount(){
		const { post_meta } = this.props.viewer.page;
		const Layout = Layouts[post_meta.edges[0].node.meta_value];
		const { Component, limit, postType, showPosts} = Layout

		this.props.relay.setVariables({
			page: this.props.page,
			showPosts: showPosts,
			limit: limit
		})

	}

	render(){
		const { post_meta } = this.props.viewer.page;
		const Layout = Layouts[post_meta.edges[0].node.meta_value];
		const { Component, limit, postType, showPosts} = Layout

		return (
			<Page withWrapper="true" viewer={this.props.viewer}>
				<Component viewer={this.props.viewer} />
			</Page>
		)
	}
}

export default Relay.createContainer(WordpressPage, {

	initialVariables:{
		page: null,
		showPosts: false,
		limit: 10
	},

  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
				page(post_title:$page){
					id,
					post_title,
					post_content
					post_meta(keys: reactLayout first: 1){
						edges{
							node{
								id,
								meta_value
							}
						}
					}
				},
				posts(first: $limit){
					edges{
						node{
							id,
							post_title
						}
					}
				}
			}
    `,
  },
});
