import { Actions, NEW_HEXAGON_STATE } from './actions';

export const hexagonStateReducer = (state = {}, action: Actions) => {
  switch (action.type) {
    case NEW_HEXAGON_STATE:
      console.log("new hexagon state");
    default:
      return state
  }
}