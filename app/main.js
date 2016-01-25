import 'babel-polyfill';
import '../scripts/scrollToPlugin.js';
import { browserHistory } from 'react-router';
import React from 'react';
import { render } from 'react-dom';
import { RelayRouter } from 'react-router-relay';
import routes from './routes';

render(
  <RelayRouter history={browserHistory} routes={routes} />,
  document.getElementById('root')
)
