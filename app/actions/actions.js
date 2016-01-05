export const SET_CURRENT_GAME = "SET_CURRENT_GAME";

export const SET_CURRENT_PAGEREF = "SET_CURRENT_PAGEREF";

export function setCurrentGame(game){
  return{
    type: types.SET_CURRENT_GAME,
    game
  }
}

export function setCurrentPageRef(pageRef){
  return{
    type: types.SET_CURRENT_PAGEREF,
    pageRef
  }
}
