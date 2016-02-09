import React from 'react';

import CSSModules from 'react-css-modules';
import styles from './button.scss';

@CSSModules(styles, {allowMultiple: true})
class Button extends React.Component{
  render(){

    const { type } = this.props || 'base';

    return(
      <button styleName={type} onClick={this.props.onClick}>{this.props.children}</button>
    )
  }
}

export default Button;
