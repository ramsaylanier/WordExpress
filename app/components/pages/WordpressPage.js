import React from 'react';
import Relay from 'react-relay';
import Page from './page.js';

import Layouts from '../layouts/layouts.js';

class WordpressPage extends React.Component{

	_setLayout(){
		let Layout;
		const { page } = this.props;
		const { post_meta } = this.props.viewer.page;

		if ( post_meta ){
			const { meta_value } = post_meta.edges[0].node;
			Layout = Layouts[meta_value] ? Layouts[meta_value] : Layouts['Default'];
		} else {
			Layout = Layouts['Default']
		}

		const { Component, limit, postType, showPosts} = Layout;

		this.props.relay.setVariables({
			Component: Component,
			page: page,
			showPosts: showPosts,
			limit: limit
		})
	}

	componentWillMount(){
		this._setLayout();
	}

	componentDidUpdate(){
		this._setLayout();
	}

	shouldComponentUpdate(nextProps){
		let nextComponent = nextProps.relay.variables.Component;
		let thisComponent = this.props.relay.variables.Component;

		return nextComponent !== thisComponent;
	}

	render(){
		const { viewer } = this.props;
		const { Component } = this.props.relay.variables;

		if (Component){
			return (
				<Page withWrapper={true}>
					<Component viewer={viewer}/>
				</Page>
			)
		} else {
			return (
				<div>Loading...</div>
			)
		}
	}
}

export default Relay.createContainer(WordpressPage, {

	initialVariables:{
		Component: null,
		page: null,
		showPosts: false,
		limit: 10
	},

  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
				page(post_name:$page){
					id,
					post_title,
					post_type,
					post_content,
					post_meta(keys: reactLayout first: 1){
						edges{
							node{
								id
								meta_value
							}
						}
					}
				},
				posts(first: $limit){
					edges{
						node{
							id
							post_title
							post_name
							post_excerpt
							thumbnail
						}
					}
				},
				settings{
					id,
					uploads
				}
			}
    `,
  },
});
