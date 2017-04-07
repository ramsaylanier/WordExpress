import React, {Component, PropTypes} from 'react'
import PageAnimations from './PageAnimations.js'
import { AnimateItem } from '../../animations.js'

import CSSModules from 'react-css-modules'
import styles from './page.scss'

@CSSModules(styles, {allowMultiple: true})
class Page extends Component {
  componentDidMount() {
    AnimateItem(this._page, PageAnimations.animateIn)
  }

  componentDidUpdate() {
    AnimateItem(this._page, PageAnimations.animateIn)
  }

  render() {
    const {children, classes} = this.props
    const style = classes ? `base ${classes}` : 'base'

    return (
      <div ref={ (c) => this._page = c } styleName={style}>
        {children}
      </div>
    )
  }
}

Page.propTypes = {
  animation: PropTypes.object,
  children: PropTypes.node,
  classes: PropTypes.string
}

export default Page
