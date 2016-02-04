import React from 'react';
import Relay from 'react-relay'
import { Link } from 'react-router';
import AppNav from '../nav/_AppNav.js';
import GithubLogo from '../icons/github.js';

import CSSModules from 'react-css-modules';
import styles from './header.scss';

@CSSModules(styles, {allowMultiple: true})
class Header extends React.Component{

	render(){
		const { viewer } = this.props;

		return (
			<header styleName="base">
				<div styleName="wrapper">
					<AppNav viewer={viewer}/>
					<a href="https://github.com/ramsaylanier/WordpressExpress" target="_blank">
						<GithubLogo/>
					</a>
				</div>
			</header>
		)
	}
}

export default Relay.createContainer(Header, {

  fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				menus(name:"primary-navigation") {
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
