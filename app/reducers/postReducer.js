import { SET_CURRENT_GAME} from '../actions/actions.js';

let initialState = {

}

export default function posts(state = initialState, action){
  switch(action.type){
    case SET_CURRENT_GAME:
      console.log('action:', action)
      return Object.assign({}, state, {
          currentGame: action.game
        })
    default:
      return state;
  }
}
