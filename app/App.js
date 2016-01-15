import React from 'react';
import Relay from 'react-relay'

import styles from './App.scss';
import Header from './components/header/header.js';

class App extends React.Component {

  render() {
    const { viewer, children, params } = this.props;

    const page = React.cloneElement(children, params)

    return (
      <div className="application">
        <Header viewer={viewer} />
        {page}
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
  },
});
