import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './App.js';
import * as Page from './components/Page/Pages.js';

const AppQueries = {
  viewer: () => Relay.QL`
      query {
        viewer
      }
    `,
};

export default (
  <Route
    path="/" component={App}
    queries={AppQueries}
  >
    <IndexRoute
      component={Page.HomePage}
      queries={AppQueries}
    />
    <Route
      path=":page"
      component={Page.WordpressPage}
      queries={AppQueries}
    />
  </Route>
);
