import React from 'react';
import PageAnimations from './PageAnimations.js';
import { AnimateItem } from '../../animations.js';

import CSSModules from 'react-css-modules';
import styles from './page.scss';

@CSSModules(styles, {allowMultiple:true})
class Page extends React.Component{
	componentDidMount(){
		let animation = this.props.animation || PageAnimations.animateIn;
		AnimateItem(this._page, PageAnimations.animateIn);
	}

	render(){
    const { children } = this.props;
    return (
      <div ref={ (c) => this._page = c } styleName="base">
        {children}
      </div>
    )
	}
}

export default Page;
