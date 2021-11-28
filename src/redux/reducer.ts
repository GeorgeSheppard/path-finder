import { Coord, HexagonTypes } from "../types/dtypes";
import { Store, initialState } from "./store";
import { arrayEquals } from "../Utilities/utilities";
import { ActionTypes, IAction } from "./actions";

const limitedState: { [index in HexagonTypes]: boolean } = {
  [HexagonTypes.wall]: false,
  [HexagonTypes.goal]: true,
  [HexagonTypes.start]: true,
  [HexagonTypes.space]: false,
  [HexagonTypes.animated]: false,
  [HexagonTypes.path]: false,
};

export const stateReducer = (
  state: Store | undefined = initialState,
  action: IAction
) => {
  switch (action.type) {
    case ActionTypes.NEW_HEXAGON_STATE:
      const newIndividualHexagonStates = { ...state.individualHexagonStates };
      let newFullHexagonStates = { ...state.fullHexagonStates };

      const { coord, newState } = action.payload;
      const stringCoord = coord.toString();

      // Note: Only store hexagon state when it isn't space
      if (newState !== HexagonTypes.space) {
        newIndividualHexagonStates[stringCoord] = newState;
      } else if (stringCoord in newIndividualHexagonStates) {
        // Note: If the new space is state then it should be removed from the redux store
        delete newIndividualHexagonStates[stringCoord];
      }

      const currentState = state.individualHexagonStates[stringCoord];
      if (currentState) {
        // Note: Remove old state from redux
        newFullHexagonStates[currentState] = newFullHexagonStates[
          currentState
        ].filter((listCoord: Coord) => !arrayEquals(coord, listCoord));
      }

      if (newState !== HexagonTypes.space) {
        // TODO: Improve reducer so that the switch statement can figure out the correct type as well
        if (limitedState[newState as HexagonTypes]) {
          const oldLimitedCoord = newFullHexagonStates[newState][0];
          // Note: Remove coordinate where limited hexagon used to be
          if (oldLimitedCoord) {
            delete newIndividualHexagonStates[oldLimitedCoord.toString()];
          }
          newFullHexagonStates[newState] = [coord];
        } else {
          newFullHexagonStates[newState].push(coord);
        }
      }

      return {
        ...state,
        individualHexagonStates: newIndividualHexagonStates,
        fullHexagonStates: newFullHexagonStates,
      };
    case ActionTypes.NEW_MOUSE_STATE:
      return { ...state, mouseState: action.payload.mouseState };
    case ActionTypes.NEW_SELECTED:
      return { ...state, selected: action.payload.selected };
    case ActionTypes.NEW_ALGORITHM:
      return { ...state, algorithm: action.payload.algorithm };
    case ActionTypes.NEW_GRID_SIZE:
      const individualHexagonStates = { ...state.individualHexagonStates };
      let fullHexagonStates = { ...state.fullHexagonStates };

      const sizeX =
        action.payload.sizeX === -1
          ? state.gridSize.sizeX
          : action.payload.sizeX;
      const sizeY =
        action.payload.sizeY === -1
          ? state.gridSize.sizeY
          : action.payload.sizeY;

      for (const hexStringCoord in individualHexagonStates) {
        const coord = hexStringCoord.split(",").map(Number);
        if (coord[0] >= sizeX || coord[1] >= sizeY) {
          const type = individualHexagonStates[hexStringCoord];
          delete individualHexagonStates[hexStringCoord];
          fullHexagonStates[type] = fullHexagonStates[type].filter(
            (listCoord: Coord) => !arrayEquals(coord, listCoord)
          );
        }
      }

      return {
        ...state,
        gridSize: { sizeX, sizeY },
        individualHexagonStates,
        fullHexagonStates,
      };
    case ActionTypes.RESET_ANIMATIONS:
      const animatedWipedHexagonIndividualStates = {
        ...state.individualHexagonStates,
      };

      for (const key in animatedWipedHexagonIndividualStates) {
        if (
          animatedWipedHexagonIndividualStates[key] === "animated" ||
          animatedWipedHexagonIndividualStates[key] === "path"
        ) {
          delete animatedWipedHexagonIndividualStates[key];
        }
      }

      const animationWipedHexagonFullStates = { ...state.fullHexagonStates };
      animationWipedHexagonFullStates.animated = [];
      animationWipedHexagonFullStates.path = [];

      return {
        ...state,
        fullHexagonStates: animationWipedHexagonFullStates,
        individualHexagonStates: animatedWipedHexagonIndividualStates,
        reset: true,
      };
    case ActionTypes.ANIMATION_STOPPED:
      return {
        ...state,
        reset: false,
      };
    case ActionTypes.PRESET_GRID:
      const mazeName = action.payload.name;

      let newIndividualStates = { ...state.individualHexagonStates };
      let newHexagonStates = { ...state.fullHexagonStates };
      if (mazeName in state.mazes) {
        newIndividualStates = state.mazes[mazeName];

        newHexagonStates = {
          goal: [],
          start: [],
          animated: [],
          wall: [],
          path: [],
        };

        for (const stringCoord in newIndividualStates) {
          const coord = stringCoord.split(",").map(Number) as Coord;
          newHexagonStates[newIndividualStates[stringCoord]].push(coord);
        }
      }

      return {
        ...state,
        individualHexagonStates: newIndividualStates,
        fullHexagonStates: newHexagonStates,
      };
    default:
      console.log("Uncaught action", action);
      return state;
  }
};
