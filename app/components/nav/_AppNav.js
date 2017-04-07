import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import styles from './navs.scss'
import NavItem from './navItem'
import NavList from './navList'
import Logo from '../icons/logo.js'
import {sortBy} from 'lodash'

class AppNav extends Component {
  render() {
    if (!this.props.menu) {
      return null
    }

    let { items } = this.props.menu
    items = sortBy(items, 'order')

    return (
      <NavList type="primary">
        <NavItem>
          <Link to="/"><Logo/></Link>
        </NavItem>
        {items.map( item => {
          const {children, object_type: type, post_title: title} = item
          const linkText = title.length > 0 ? title : item.navitem.post_title
          const pathname = type === 'page' ? `/${item.navitem.post_name}` : `/${type}/${item.navitem.post_name}`

          return (
            <NavItem key={item.id}>
              <Link to={{ pathname: pathname }} className={styles.link}>{linkText}</Link>
              {children.length > 0 &&
                <NavList type="subnav">
                  {children.map( child => {
                    return (
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

AppNav.propTypes = {
  menu: PropTypes.object
}


export default AppNav
