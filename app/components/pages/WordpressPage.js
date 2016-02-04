import React from 'react';
import Relay from 'react-relay';
import Page from './page.js';
import Helmet from 'react-helmet';

import Layouts from '../layouts/layouts.js';
import PostList from '../posts/PostList.js';

class WordpressPage extends React.Component{

	constructor(){
		super();
		this._setLayout = this._setLayout.bind(this);
	}

	_setLayout(){
		let Layout;
		const { page } = this.props;
		const layout = this.props.viewer.page.layout.meta_value;

		if ( layout ){
			Layout = Layouts[layout] ? Layouts[layout] : Layouts['Default'];
		} else {
			Layout = Layouts['Default']
		}

		const { Component, limit, postType, showPosts} = Layout;

		this.props.relay.setVariables({
			Component: Component,
			page: page,
			showPosts: false,
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
		let nextLimit = nextProps.relay.variables.limit;
		let thisLimit =  this.props.relay.variables.limit;

		return nextComponent !== thisComponent || nextLimit !== thisLimit;
	}

	render(){
		console.log(this.props);
		const { viewer } = this.props;
		const { Component } = this.props.relay.variables;

		return (
			<Page>
				<Helmet title={viewer.page.post_title} />
				{ Component &&
					<Component viewer={viewer} layoutVars={this.props.relay.variables}/>
				}
			</Page>
		)
	}
}

export default Relay.createContainer(WordpressPage, {

	initialVariables:{
		Component: null,
		page: null,
		showPosts: false,
		limit: 5,
	},

	prepareVariables(prevVars){
		return{
			...prevVars,
			showPosts: true
		}
	},

  fragments: {
    viewer: ({limit, showPosts}) => Relay.QL`
      fragment on User {
				${PostList.getFragment("viewer", {limit: limit}).if(showPosts)},
				page(post_name:$page){
					id,
					post_title,
					post_type,
					post_content,
					thumbnail,
					layout{
						meta_value
					}
				}
			}
    `,
  },
});
