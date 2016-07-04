import React from 'react';
import { IndexRoute, Route } from 'react-router';

import gql from 'graphql-tag';

import App from './App.js';
import Page from './components/pages/page.js';
import PostSingle from './components/posts/PostSingle.js';
import Layouts from './components/layouts/layouts.js';

import { client } from './apollo';

function setLayout(nextState, replaceState, cb){
  const { page } = nextState.params;
  const { Layouts } = nextState.routes[0];

  return client.query({
    query: gql`
      query getPage($pageName: String!){
        page(name: $pageName){
          post_name,
          layout{
            id,
            meta_value
          }
        }
      }
    `,
    variables:{
      pageName: page || 'homepage'
    }
  }).then((graphQLResult) => {
    const { errors, data } = graphQLResult;
    let Layout;

    if (data.page) {
      if (data.page.layout){
        Layout = Layouts[data.page.layout.meta_value] || Layouts['Default'];
      } else {
        Layout = Layouts['Default'];
      }
    } else {
      Layout = Layouts['NotFound'];
    }

    this.layout = Layout;
    this.component = Layout.Component;
    cb();

    if (errors) {
      console.log('got some GraphQL execution errors', errors);
    }
  }).catch((error) => {
    console.log('there was an error sending the query', error);
  });
}

let routes = (
  <Route path="/" component={App} Layouts={Layouts}>
    <IndexRoute onEnter={setLayout}/>
    <Route path=":page" onEnter={setLayout} />
    <Route path="post/:post" component={PostSingle} />
  </Route>
);

export default routes;
