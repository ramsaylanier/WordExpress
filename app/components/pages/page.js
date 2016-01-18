import React from 'react';

import PageAnimations from './PageAnimations.js';
import { AnimateItem } from '../../animations.js'

import CSSModules from 'react-css-modules';
import styles from './page.scss';

@CSSModules(styles, {allowMultiple:true})
class Page extends React.Component{
	componentDidMount(){
		let animation = this.props.animation || PageAnimations.animateIn;
		AnimateItem(this._page, PageAnimations.animateIn);
	}

	render(){
		const {className, children, withWrapper} = this.props;

		return(
			<div ref={ (c) => this._page = c } className={styles.base + ' ' + className}>

				{ withWrapper ?
					<div styleName="wrapper">{children}</div> : children
				}

			</div>
		)
	}
}

export default Page;
