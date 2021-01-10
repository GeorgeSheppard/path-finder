import { HexagonTypes, Coord, Algorithms } from "../types/dtypes";
import {
  NEW_HEXAGON_STATE,
  NewHexagonState,
  NEW_MOUSE_STATE,
  NEW_SELECTED,
  NEW_ALGORITHM,
  NEW_GRID_SIZE,
  RESET_ANIMATIONS,
  ANIMATION_STOPPED,
  PRESET_GRID,
} from "./actions";
import store from "./store";

export const dispatchHexagonState = (coord: Coord, newState: HexagonTypes) => {
  store.dispatch({
    type: NEW_HEXAGON_STATE,
    payload: {
      coord,
      newState,
    },
  } as NewHexagonState);
};

export const dispatchNewMouseState = (mouseState: boolean) => {
  store.dispatch({
    type: NEW_MOUSE_STATE,
    payload: {
      mouseState,
    },
  });
};

export const dispatchNewSelected = (selected: HexagonTypes) => {
  store.dispatch({
    type: NEW_SELECTED,
    payload: {
      selected,
    },
  });
};

export const dispatchNewAlgorithm = (algorithm: Algorithms) => {
  store.dispatch({
    type: NEW_ALGORITHM,
    payload: {
      algorithm,
    },
  });
};

export const dispatchNewGridSize = (sizeX = -1, sizeY = -1) => {
  store.dispatch({
    type: NEW_GRID_SIZE,
    payload: {
      sizeX,
      sizeY,
    },
  });
};

export const dispatchResetAnimation = () => {
  store.dispatch({
    type: RESET_ANIMATIONS,
  });
};

export const dispatchAnimationStopped = () => {
  store.dispatch({
    type: ANIMATION_STOPPED,
  });
};

export const dispatchPresetGrid = (name: string) => {
  store.dispatch({
    type: PRESET_GRID,
    payload: {
      name,
    },
  });
};
