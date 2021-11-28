import { HexagonTypes, Coord, Algorithms } from "../types/dtypes";
import store from "./store";
import { ActionTypes } from "./actions";

export const dispatchHexagonState = (coord: Coord, newState: HexagonTypes) => {
  store.dispatch({
    type: ActionTypes.NEW_HEXAGON_STATE,
    payload: {
      coord,
      newState,
    },
  });
};

export const dispatchNewMouseState = (mouseState: boolean) => {
  store.dispatch({
    type: ActionTypes.NEW_MOUSE_STATE,
    payload: {
      mouseState,
    },
  });
};

export const dispatchNewSelected = (selected: HexagonTypes) => {
  store.dispatch({
    type: ActionTypes.NEW_SELECTED,
    payload: {
      selected,
    },
  });
};

export const dispatchNewAlgorithm = (algorithm: Algorithms) => {
  store.dispatch({
    type: ActionTypes.NEW_ALGORITHM,
    payload: {
      algorithm,
    },
  });
};

export const dispatchNewGridSize = (sizeX = -1, sizeY = -1) => {
  store.dispatch({
    type: ActionTypes.NEW_GRID_SIZE,
    payload: {
      sizeX,
      sizeY,
    },
  });
};

export const dispatchResetAnimation = () => {
  store.dispatch({
    type: ActionTypes.RESET_ANIMATIONS,
  });
};

export const dispatchAnimationStopped = () => {
  store.dispatch({
    type: ActionTypes.ANIMATION_STOPPED,
  });
};

export const dispatchPresetGrid = (name: string) => {
  store.dispatch({
    type: ActionTypes.PRESET_GRID,
    payload: {
      name,
    },
  });
};
