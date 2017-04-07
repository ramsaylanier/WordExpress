import { TOGGLE_SIDEBAR } from '../actions/actions'

const initialUIState = {
  sidebarState: 'closed'
}

export default function uiReducers(state = initialUIState, action) {
  switch (action.type) {
  case TOGGLE_SIDEBAR:
    return Object.assign({}, state, {
      sidebarState: action.sidebarState
    })
  default:
    return state
  }
}
