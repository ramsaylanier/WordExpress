import React from 'react';
import Relay from 'react-relay';
import { Page } from '../Page/page.js';

import Section from '../sections/section.js';

class HomePage extends React.Component{

	render(){

		const { viewer } = this.props;
		const { edges } = viewer.posts;

		return (
			<Page>
				{edges.map( ({node}) => {
					return(
						<Section key={node.id} viewer={viewer} section={node}>
						</Section>
					)
				})}
			</Page>
		)
	}
}

export default Relay.createContainer(HomePage, {
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
