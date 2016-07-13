import 'babel-polyfill';
import '../scripts/scrollToPlugin.js';
import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { client, store } from './apollo';

import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

import routes from './routes';

const history = syncHistoryWithStore(browserHistory, store)

render(
  <ApolloProvider client={client} store={store}>
    <Router history={history} routes={routes}></Router>
  </ApolloProvider>,
  document.getElementById('root')
)
