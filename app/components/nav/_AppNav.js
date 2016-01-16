import React from 'react';
import { Link } from 'react-router';
import styles from './navs.scss';
import {NavList, NavItem} from './navs.js';
import lodash from 'lodash';

class AppNav extends  React.Component{

	render(){

		// const { items } = _.sortBy(this.props.viewer.menus, ['order']);
		let { items } = this.props.viewer.menus;
		items = _.sortBy(items, 'order');

		console.log(items);
		return(
			<NavList type="primary">
				{items.map( item => {
					const { children } = item;
					return(
						<NavItem>
							<Link to={item.navitem.post_name} className={styles.link}>{item.navitem.post_title}</Link>
							{children.length > 0 &&
								<NavList type="subnav">
									{children.map( child => {
										return(
											<NavItem type="link" href="{child.navitem.post_name}">{child.navitem.post_title}</NavItem>
										)
									})}
								</NavList>
							}
						</NavItem>
					)
				})}
			</NavList>
		)
	}
}

export default AppNav;
