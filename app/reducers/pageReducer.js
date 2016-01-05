import { SET_CURRENT_PAGEREF} from '../actions/actions.js';

let initialState = {

}

export default function pages(state = initialState, action){
  switch(action.type){
    case SET_CURRENT_PAGEREF:
      console.log('action:', action)
      return Object.assign({}, state, {
          currentPageRef: action.pageRef
        })
    default:
      return state;
  }
}
