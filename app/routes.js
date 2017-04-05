import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './App.js';
import { WordExpressPage } from 'wordexpress-components';
import PostSingle from './components/posts/PostSingle.js';
import Layouts from './components/layouts/layouts.js';

const routes = (
  <Route path="/" component={App} Layouts={Layouts}>
    <IndexRoute component={WordExpressPage}/>
    <Route path=":page" component={WordExpressPage}/>
    <Route path="post/:post" component={PostSingle}/>
  </Route>
);

export default routes;
