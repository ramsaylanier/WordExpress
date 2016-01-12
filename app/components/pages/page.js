import React from 'react';

import PageAnimations from './PageAnimations.js';
import { AnimateItem } from '../../animations.js'

import styles from './page.scss';
import wrapperStyles from '../../styles/wrapper.scss';


// Write your package code here!
const Page = React.createClass({

	componentDidMount(){
		let animation = this.props.animation || PageAnimations.animateIn;
		AnimateItem(this._page, PageAnimations.animateIn);
	},

	render(){
		let className = this.props.className;
		let children = this.props.children;

		return(
			<div ref={ (c) => this._page = c } className={styles.base + ' ' + className}>
				{children}
			</div>
		)
	}
});

export default Page;
