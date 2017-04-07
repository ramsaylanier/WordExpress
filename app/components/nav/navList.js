import React, {PropTypes} from 'react'
import styles from './navs.scss'

const NavList = (props) => {
  const navClassName = styles[props.type]
  return (
    <nav className={navClassName}>
      <ul className={styles.list}>
        {props.children}
      </ul>
    </nav>
  )
}

NavList.propTypes = {
  type: PropTypes.string,
  children: PropTypes.array
}

export default NavList
