import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import Header from './components/header/header.js';
import * as ReruledActions from './actions/actions';

import styles from './App.css';


//REDUX stuff
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'


class App extends React.Component {

  render() {
    console.log(this.props.pages);

    return (
      <div className="application">
        <Header className="app-header"></Header>

      </div>
    )
  }
}

export default Relay.createContainer(App, {

  initialVariables: {
    pageTitle: 'Homepage'
  },

  fragments: {
    pages: () => Relay.QL`
      fragment on Post {
        post_title,
      }
    `,
  },
})


// function mapStateToProps(state) {
//   console.log('statez:', state);
//   return {
//     path: state.routing.path,
//     currentPageRef: state.pages.pageRef,
//   }
// }
//
// function mapDispatchToProps(dispatch) {
//   let actions = bindActionCreators(ReruledActions, dispatch);
//   return {
//     actions: actions
//   }
// }
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App)
