import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import posts from './postReducer';
import pages from './pageReducer';

const rootReducer = combineReducers({
  routing: routeReducer,
  posts,
  pages
})

export default rootReducer
