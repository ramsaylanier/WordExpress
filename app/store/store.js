import { createStore } from 'redux';
import rootReducer from '../reducers/index.js';

const store = createStore(rootReducer);
if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers', () => {
    const nextRootReducer = require('../reducers')
    store.replaceReducer(nextRootReducer)
  })
}

export default store
