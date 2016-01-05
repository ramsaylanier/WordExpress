import React from 'react';
import { Link } from 'react-router';
import styles from './navs.scss';
import {NavList, NavItem} from './navs.js';

const AppNav = React.createClass({
	render(){
		return(
			<NavList type="primary">
				<NavItem>
					<Link to='/' className={styles.link}>
					</Link>
					<NavList type="subnav">
						<NavItem type="link" href="/dashboard">Dashboard</NavItem>
						<NavItem type="link" href="/profile">Profile</NavItem>
					</NavList>
				</NavItem>
			</NavList>
		)
	}
})

export default AppNav;
