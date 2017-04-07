import React, {PropTypes} from 'react'
import { Link } from 'react-router'
import styles from './navs.scss'

const NavItem = (props) => {
  if (props.type === 'link') {
    return (
      <li>
        <Link to={{ pathname: props.href }} onClick={props.onClick}>{props.children}</Link>
      </li>
    )
  }

  return (
    <li className={styles.item}>
      {props.children}
    </li>
  )
}

NavItem.propTypes = {
  type: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node
}

export default NavItem
