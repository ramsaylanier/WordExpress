import React from 'react';
import { connect } from 'react-apollo';
import { Link } from 'react-router';
import { WordExpressMenu } from 'wordexpress-components';
import gql from 'graphql-tag';
import AppNav from '../nav/_AppNav.js';
import GithubLogo from '../icons/github.js';

import CSSModules from 'react-css-modules';
import styles from './header.scss';

@CSSModules(styles, {allowMultiple: true})
class Header extends React.Component{

	render(){
		return (
			<header styleName="base">
				<div styleName="wrapper">
          <WordExpressMenu menu="primary-navigation">
  					<AppNav/>
          </WordExpressMenu>
					<a href="https://github.com/ramsaylanier/WordpressExpress" target="_blank">
						<GithubLogo/>
					</a>
				</div>
			</header>
		)
	}
}

export default Header;
