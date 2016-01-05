import React from 'react';

import store from '../../store/store.js';

import PageAnimations from './PageAnimations.js';
import { AnimateItem, resetCounts } from '../../animations.js'

import styles from './page.scss';
import wrapperStyles from '../../Stylesheets/wrapper.scss';


// Write your package code here!
const Page = React.createClass({

	componentDidMount(){
		store.dispatch({type: 'SET_CURRENT_PAGEREF', pageRef: this._page });

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

const PageContent = React.createClass({
	render(){

		let className = styles.content;
		let wrapperClassName = wrapperStyles[this.props.wrapperType] || wrapperStyles.main;

		return(
			<div className={className}>
				<div className={wrapperClassName}>
					{this.props.children}
				</div>
			</div>
		)
	}
})

const PageHero = React.createClass({
	render(){

		let className = styles.hero;
		let contentClassName = styles.hero__content;
		let wrapperClassName = wrapperStyles[this.props.wrapperType] || wrapperStyles.main;
		var heroImage = this.props.heroImage || null;

		var style = {
			backgroundImage: "url('" + heroImage + "')"
		}

		return (
			<div className={className} style={style}>
				<div className={wrapperClassName}>
					<div className={contentClassName}>
						{this.props.children}
					</div>
				</div>
			</div>
		)
	}
})

const PageHeader = React.createClass({

	render: function(){

		let wrapperClassName = wrapperStyles[this.props.wrapperType] || wrapperStyles.main;

		var bg = this.props.backgroundImage && {
			backgroundImage: "url('" + this.props.backgroundImage + "')",
		};

		return (
			<div className={styles.header} style={bg}>
				<div className={wrapperClassName}>
					{this.props.children}
				</div>
			</div>
		)
	}
});

const PageTitle = React.createClass({
	render(){

		let className = styles.title;

		return (
			<h2 className={className}>{this.props.children}</h2>
		)
	}
});

const PageSection = React.createClass({
	render:function(){
		return(
			<section className={"page-section " + this.props.className}>
				<div className="wrapper">
					<h1>TEST</h1>
					{this.props.children}
				</div>

				{this.props.separator && <PageSeparator/>}
			</section>
		)
	}
});

const PageSeparator = React.createClass({
	render: function(){
		return(
			<div className="page-separator">
			</div>
		)
	}
});

const PageOverlay = () => {
	return(
		<div className={styles.overlay}></div>
	)
}

export { Page, PageHero, PageHeader, PageTitle, PageContent, PageSection, PageSeparator, PageOverlay };
