import React from 'react';
import Relay from 'react-relay'
import { Link } from 'react-router';
import AppNav from '../nav/_AppNav.js';

import CSSModules from 'react-css-modules';
import styles from './header.scss';

@CSSModules(styles, {allowMultiple: true})
class Header extends React.Component{

	componentDidMount(){

	}

	render(){
		let logoLink = '/';

		const { viewer } = this.props;

		return (
			<header styleName="base">
				<div className={styles.wrapper}>
					<Link to={logoLink} styleName="brand">Home</Link>
					<span ref="title" className={styles.title}>{this.props.title}</span>

					<AppNav viewer={viewer}/>

					{this.props.children}
				</div>
			</header>
		)
	}

	_animateTitleIn(){
		let title = this.refs.title;

		TweenMax.fromTo(title, .6, {
			y: 20,
			opacity: 0
		},{
			y: 0,
			opacity: 1,
			ease: Power4.easeInOut
		})
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
		        navitem {
		          id
		          post_title
		          post_name
		        }
		        children {
		          id
		          linkedId
		          navitem {
		            post_title
		            post_name
		          }
		        }
		      }
				}
			}
    `,
  },
});
