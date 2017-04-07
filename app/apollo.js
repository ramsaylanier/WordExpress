import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { ApolloClient } from 'react-apollo'
import { routerReducer } from 'react-router-redux'

import ui from './reducers/ui'

export const client = new ApolloClient()

export const store = createStore(
  combineReducers({
    ui: ui,
    apollo: client.reducer(),
    routing: routerReducer
  }),
  compose(
    applyMiddleware(client.middleware()),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
