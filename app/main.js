import 'babel-polyfill'
import '../scripts/scrollToPlugin.js'
import React from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { client, store } from './apollo'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './routes'

const history = syncHistoryWithStore(browserHistory, store)

render(
  <ApolloProvider client={client} store={store}>
    <Router history={history} routes={routes}/>
  </ApolloProvider>,
  document.getElementById('root')
)

if (module.hot) {
  console.log('hot')
  module.hot.accept('./app', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    ReactDOM.render(
      <AppContainer>
        <Router history={history} routes={routes}/>
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
