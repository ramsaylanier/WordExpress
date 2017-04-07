import React, {Component, PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './sidebar.scss'
import {TweenMax, Power4} from 'gsap'

@CSSModules(styles, {allowMultiple: true})
class Sidebar extends Component {
  constructor() {
    super()
    this._toggleSidebar = this._toggleSidebar.bind(this)
  }

  _toggleSidebar() {
    let direction
    let animProps
    const sideBarWidth = this._sidebar.getBoundingClientRect().width

    if (this.props.state === 'closed') {
      direction = 'open'
      animProps = {x: -sideBarWidth + 50}
    } else {
      direction = 'closed'
      animProps = {x: 0}
    }

    animProps.ease = Power4.easeInOut

    this.props.dispatch({type: 'TOGGLE_SIDEBAR', sidebarState: direction})
    TweenMax.to(this._sidebar, 1, animProps)
  }

  render() {
    return (
      <div ref={(c) => this._sidebar = c} styleName="base">
        <button styleName="toggle" onClick={this._toggleSidebar}>X</button>
        {this.props.children}
      </div>
    )
  }
}

Sidebar.propTypes = {
  state: PropTypes.string,
  dispatch: PropTypes.func,
  children: PropTypes.node
}

export default Sidebar
