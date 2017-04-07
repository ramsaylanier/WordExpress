import 'babel-polyfill'
import '../scripts/scrollToPlugin.js'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { client, store } from './apollo'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './routes'

const history = syncHistoryWithStore(browserHistory, store)

export default class Root extends Component {
  render() {
    return (
      <ApolloProvider client={client} store={store}>
        <Router history={history} routes={routes}/>
      </ApolloProvider>
    )
  }
}
