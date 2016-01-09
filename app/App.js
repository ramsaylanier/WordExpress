import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import Header from './components/header/header.js';

import styles from './App.scss';

class App extends React.Component {

  render() {
    console.log('app props:', this.props);
    const { viewer, children } = this.props;

    return (
      <div className="application">
        <Header className="app-header" viewer={viewer}></Header>

        {children}

      </div>
    )
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        ${Header.getFragment("viewer")}
      }
    `,
  }
});
