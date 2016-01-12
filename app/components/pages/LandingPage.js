import React from 'react';
import Relay from 'react-relay';
import Page from './page.js';

import Section from '../sections/section.js';
import CSSModules from 'react-css-modules';

class LandingPage extends React.Component{

	_renderSections(){
		const { viewer } = this.props;
		const { edges } = viewer.posts;

		return edges.map( ({node}) => {
			return(
				<Section key={node.id} viewer={viewer} section={node}>
				</Section>
			)
		})
	}

	render(){
		return (
			<Page>
				{this._renderSections()}
			</Page>
		)
	}
}

export default Relay.createContainer(LandingPage, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        posts(post_type: "page" first: 4){
					edges{
						node{
							id,
							${Section.getFragment("section")}
						}
					}
				}
      }
    `,
  },
});
