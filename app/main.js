import 'babel-polyfill';

import React from 'react';
import Relay from 'react-relay';
import { render } from 'react-dom';

import { RelayRouter } from 'react-router-relay';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { browserHistory, IndexRoute, Route } from 'react-router';

import Head from './components/head/head';
import App from './App.js';
import LandingPage from './components/pages/LandingPage.js';
import WordpressPage from './components/pages/WordpressPage.js';
import PostSingle from './components/posts/PostSingle.js';
import '../scripts/scrollToPlugin.js';

const AppQueries = {
  viewer: () => Relay.QL`
    query {
      viewer
    }
  `,
};

render((
  <RelayRouter history={browserHistory}>
      <Route
        path="/" component={App}
        queries={AppQueries}
      >
        <IndexRoute
          component={LandingPage}
          queries={AppQueries}
        />

        <Route
          path=":page"
          component={WordpressPage}
          queries={AppQueries}
        />
        <Route
          path="post/:post"
          component={PostSingle}
          queries={AppQueries}
        />
      </Route>
  </RelayRouter>
), document.getElementById('root'))
