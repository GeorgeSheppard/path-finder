import { Actions, NEW_HEXAGON_STATE, NEW_MOUSE_STATE, NEW_SELECTED, NEW_ALGORITHM, NEW_GRID_SIZE } from './actions';
import { Coord } from '../types/dtypes';
import { Store, initialState } from "./store";
import { arrayEquals } from "../Utilities/utilities"


const limitedState = {
  wall: false,
  goal: true,
  start: true,
  space: false
}

export const stateReducer = (state: Store | undefined = initialState, action: Actions) => {
  switch (action.type) {
    case NEW_HEXAGON_STATE:
      const newIndividualHexagonStates = {...state.individualHexagonStates}
      let newFullHexagonStates = {...state.fullHexagonStates}
      
      const { coord, newState } = action.payload;
      const stringCoord = coord.toString();
      
      // Note: Only store hexagon state when it isn't space
      if (newState !== "space") {
        newIndividualHexagonStates[stringCoord] = newState
      } else if (stringCoord in newIndividualHexagonStates) {
        // Note: If the new space is state then it should be removed from the redux store
        delete newIndividualHexagonStates[stringCoord];
      }
      
      const currentState = state.individualHexagonStates[stringCoord];
      if (currentState) {
        // Note: Remove old state from redux
        newFullHexagonStates[currentState] = newFullHexagonStates[currentState].filter((listCoord: Coord) => !arrayEquals(coord, listCoord))
      }

      if (newState !== "space") {
        if (limitedState[newState]) {
          const oldLimitedCoord = newFullHexagonStates[newState][0]
          // Note: Remove coordinate where limited hexagon used to be
          if (oldLimitedCoord) {
            delete newIndividualHexagonStates[oldLimitedCoord.toString()];
          }
          newFullHexagonStates[newState] = [coord];
        } else {
          newFullHexagonStates[newState].push(coord);
        }
      }

      return { ...state, individualHexagonStates: newIndividualHexagonStates, fullHexagonStates: newFullHexagonStates }
    case NEW_MOUSE_STATE:
      return { ...state, mouseState: action.payload.mouseState }
    case NEW_SELECTED:
      return {...state, selected: action.payload.selected}
    case NEW_ALGORITHM:
      return {...state, algorithm: action.payload.algorithm}
    case NEW_GRID_SIZE:
      const individualHexagonStates = {...state.individualHexagonStates};
      let fullHexagonStates = {...state.fullHexagonStates};

      for (const hexStringCoord in individualHexagonStates) {
        const coord = hexStringCoord.split(',').map(Number);
        if (coord[0] >= action.payload.sizeX || coord[1] >= action.payload.sizeY) {
          const type = individualHexagonStates[hexStringCoord]
          delete individualHexagonStates[hexStringCoord];
          fullHexagonStates[type] = fullHexagonStates[type].filter((listCoord: Coord) => !arrayEquals(coord, listCoord));
        }
      }

      return {...state, gridSize: {...action.payload}, individualHexagonStates, fullHexagonStates}
    default:
      console.log("Uncaught action", action);
      return state;
  }
}
