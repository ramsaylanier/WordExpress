import React from 'react';
import Relay from 'react-relay';
import { IndexRoute, Route } from 'react-router';

import App from './App.js';
import LandingPage from './components/pages/LandingPage.js';
import WordpressPage from './components/pages/WordpressPage.js';
import PostSingle from './components/posts/PostSingle.js';

const AppQueries = {
  viewer: () => Relay.QL`
    query {
      viewer
    }
  `,
};

let routes = (
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
);

export default routes;
