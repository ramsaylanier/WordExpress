import React from 'react';
import Relay from 'react-relay';
import Page from './page.js';

import Layouts from '../layouts/layouts.js';

class WordpressPage extends React.Component{

	render(){
		const { post_title, post_content, post_meta } = this.props.page;
		const Layout = post_meta.edges[0].node.meta_value;
		const LayoutComponent = Layouts[Layout].component;

		return (
			<Page withWrapper="true">
				<h1>{post_title}</h1>
				<p>{post_content}</p>
			</Page>
		)
	}
}

export default Relay.createContainer(WordpressPage, {

  fragments: {
    page: () => Relay.QL`
      fragment on Post {
				id
				post_title
				post_content
				post_meta(keys: reactLayout first: 1){
					edges{
						node{
							id
							meta_value
						}
					}
				}
			}
    `,
  },
});
