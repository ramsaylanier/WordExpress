import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './icons.scss';

@CSSModules(styles, {allowMultiple: true})
class Logo extends React.Component{
	render(){
		return(
			<svg version="1.1" styleName="logo" x="0px" y="0px"
			viewBox="0 0 541.5 600" enable-background="0 0 541.5 600;">
				<path id="XMLID_27_" d="M271.4,488.2"/>
				<path fill="#7FBD42" d="M487.2,335.4"/>
				<path fill="#7FBD42" d="M40.2,164.1L269.3,31.8c1.3-0.7,2.9-0.7,4.2,0l229.1,132.3c1.3,0.7,2.1,2.1,2.1,3.6l0,259.8c0,3.2-3.5,5.2-6.2,3.6l-225-129.9c-1.3-0.7-2.9-0.7-4.2,0l-225,129.9c-2.8,1.6-6.2-0.4-6.2-3.6l0-259.8 C38.1,166.2,38.9,164.9,40.2,164.1z"/>
				<path fill="#208CBE" d="M88.6,456.6l180.7-104.4c1.3-0.7,2.9-0.7,4.2,0l180.7,104.4c2.8,1.6,2.8,5.6,0,7.2L273.5,568.2c-1.3,0.7-2.9,0.7-4.2,0L88.6,463.8C85.8,462.2,85.8,458.2,88.6,456.6z"/>
			</svg>
		)
	}
}
export default Logo;
