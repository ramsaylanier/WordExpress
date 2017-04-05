import React, {Component, PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './button.scss';

@CSSModules(styles, {allowMultiple: true})
class Button extends Component {
  static propTypes = {
    type: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node
  }

  render() {
    const { type } = this.props || 'base';

    return (
      <button styleName={type} onClick={this.props.onClick}>{this.props.children}</button>
    );
  }
}

export default Button;
