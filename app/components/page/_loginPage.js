import React from 'react';
import { render } from 'react-dom';

//components
import { Link } from 'react-router';
import { Page, PageContent } from '../Page/page.js';

//styles
import wrapperStlyes from '../../Stylesheets/wrapper.scss';

const LoginPage = React.createClass({
	render(){

		let wrapperClassName = wrapperStlyes.form__white;

		return (
			<Page>
				<PageContent>
					<div className={wrapperClassName}>
						<h1>Test</h1>
					</div>
				</PageContent>
			</Page>
		)
	}
});

export default LoginPage;
