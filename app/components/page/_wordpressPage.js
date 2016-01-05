import React from 'react';
import {graphql} from 'graphql';

import PageAnimations from './PageAnimations.js';
import { AnimateItem, resetCounts } from '../../animations.js'

import styles from './page.scss';
import wrapperStyles from '../../Stylesheets/wrapper.scss';


// Write your package code here!
const WordpressPage = React.createClass({

	setInitialState(){
		return{
			page: ''
		}
	},

	componentDidMount(){
		let animation = this.props.animation || PageAnimations.animateIn;
		AnimateItem(this._page, PageAnimations.animateIn);
	},

	render(){
		let className = this.props.className;
		let children = this.props.children;

		return(
			<div ref={ (c) => this._page = c } className={styles.base + ' ' + className}>
				<h1>Test</h1>
			</div>
		)
	}
});

export default WordpressPage;
