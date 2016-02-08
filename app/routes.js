import React from 'react';
import Relay from 'react-relay';
import { IndexRoute, Route } from 'react-router';

import App from './App.js';
import PostSingle from './components/posts/PostSingle.js';
import Layouts from './components/layouts/layouts.js';

const AppQueries = {
  viewer: () => Relay.QL`
    query {
      viewer
    }
  `,
};

function setLayout(nextState, replaceState){

  const { pathname } = nextState.location;
  const { page } = nextState.params;
  let Layout;

  if ( pathname == '/' ){
    Layout = Layouts['FrontPage'];
  } else {
    Layout = Layouts[page] ? Layouts[page] : Layouts['Default'];
  }

  this.layout = Layout;
  this.component = Layout.Component;
}

let routes = (
  <Route
    path="/" component={App}
    queries={AppQueries}
  >
    <IndexRoute
      onEnter={setLayout}
      queries={AppQueries}
    />

    <Route
      path=":page"
      onEnter={setLayout}
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
