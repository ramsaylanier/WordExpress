import React from 'react';
import Relay from 'react-relay'

import styles from './App.scss';

class App extends React.Component {

  render() {
    const { viewer, children } = this.props;

    return (
      <div className="application">
        {children}
      </div>
    )
  }
}

export default Relay.createContainer(App, {

  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        posts(post_type: "page" first: 4){
					edges{
						node{
							id
						}
					}
				}
      }
    `,
  },
});
