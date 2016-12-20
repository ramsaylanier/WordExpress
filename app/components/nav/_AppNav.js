import React from 'react';
import { Link } from 'react-router';
import styles from './navs.scss';
import { NavList, NavItem } from './navs.js';
import Logo from '../icons/logo.js';
import _ from 'lodash';

class AppNav extends  React.Component{

	render(){
		if (!this.props.menu)
			return null;
		
		let { items } = this.props.menu;
		items = _.sortBy(items, 'order');

		return(
			<NavList type="primary">
				<NavItem>
					<Link to='/'><Logo/></Link>
				</NavItem>
				{items.map( item => {
					const { children, object_type, post_title, navitem } = item;

          let linkText = post_title.length > 0 ? post_title : item.navitem.post_title
          let pathname = object_type === "page" ? `/${item.navitem.post_name}` : `/${object_type}/${item.navitem.post_name}`;

					return(
						<NavItem key={item.id}>
							<Link to={{ pathname: pathname }} className={styles.link}>{linkText}</Link>
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
