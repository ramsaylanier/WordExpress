import 'babel-polyfill';

import React from 'react';
import Relay from 'react-relay';
import { render } from 'react-dom';

import AppHomeRoute from './routes/AppHomeRoute';
import App from './App.js';

import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router, History, Route, IndexRoute, Link } from 'react-router';
import * as Page from './components/Page/Pages.js';

const history = createBrowserHistory();

function createRelayContainer(Component, props) {
  if (Relay.isContainer(Component)) {
    // Construct the RelayQueryConfig from the route and the router props.
    var {name, queries} = props.route;
    var {params} = props;
    return (
      <Relay.RootContainer
        Component={Component}
        renderFetched={(data) => <Component {...props} {...data} />}
        route={{name, params, queries}}
      />
    );
  } else {
    return <Component {...props}/>;
  }
}

const HomeQueries = {
  pages: () => Relay.QL`
    query {
      pages(post_title:"Homepage")
    }
  `,
};

const PageQueries = {
  pages: (Component) => Relay.QL`
    query {
      pages(post_title:"Homepage")
    }
  `,
}


render((
  <Router history={history} createElement={createRelayContainer}>
    <Route path="/" name="home" component={App} queries={HomeQueries} >
      <Route name="page" path="/:page" component={Page.WordpressPage} queries={HomeQueries} />
    </Route>
  </Router>
), document.getElementById('root'))
