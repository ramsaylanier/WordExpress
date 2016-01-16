import React from 'react';
import Relay from 'react-relay'
import { Link } from 'react-router';
import AppNav from '../nav/_AppNav.js';

import CSSModules from 'react-css-modules';
import styles from './header.scss';

@CSSModules(styles, {allowMultiple: true})
class Header extends React.Component{

	render(){
		const { viewer } = this.props;

		return (
			<header styleName="base">
				<div className={styles.wrapper}>
					<Link to='/' styleName="brand">Home</Link>
					<AppNav viewer={viewer}/>
				</div>
			</header>
		)
	}
}

export default Relay.createContainer(Header, {

	initialVariables: {
		numOfMenuItems: 10,
		numOfMetaItems: 10
	},

  fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				menus {
		      items {
						id,
						order,
		        navitem {
		          id,
		          post_title,
		          post_name
		        },
		        children {
		          id,
		          linkedId,
		          navitem {
		            post_title,
		            post_name
		          }
		        }
		      }
				}
			}
    `,
  },
});
