import { HexagonTypes, Coord, Algorithms } from "../types/dtypes";

export enum ActionTypes {
  NEW_HEXAGON_STATE = "new_hexagon_state",
  NEW_MOUSE_STATE = "new_mouse_state",
  NEW_SELECTED = "new_selected",
  NEW_ALGORITHM = "new_algorithm",
  NEW_GRID_SIZE = "new_grid_size",
  RESET_ANIMATIONS = "reset_animations",
  ANIMATION_STOPPED = "animation_stopped",
  PRESET_GRID = "preset_grid",
}

export interface IAction {
  type: ActionTypes;
  payload?: any;
}

export interface INewHexagonState extends IAction {
  type: ActionTypes.NEW_HEXAGON_STATE;
  payload: {
    coord: Coord;
    newState: HexagonTypes;
  };
}

export interface INewMouseState extends IAction {
  type: ActionTypes.NEW_MOUSE_STATE;
  payload: {
    mouseState: boolean;
  };
}

export interface INewSelected extends IAction {
  type: ActionTypes.NEW_SELECTED;
  payload: {
    selected: HexagonTypes;
  };
}

export interface INewAlgorithm extends IAction {
  type: ActionTypes.NEW_ALGORITHM;
  payload: {
    algorithm: Algorithms;
  };
}

export interface INewGridSize extends IAction {
  type: ActionTypes.NEW_GRID_SIZE;
  payload: {
    sizeX: number;
    sizeY: number;
  };
}

export interface IResetAnimations extends IAction {
  type: ActionTypes.RESET_ANIMATIONS;
}

export interface IAnimationStopped extends IAction {
  type: ActionTypes.ANIMATION_STOPPED;
}

export interface IPresetGrid extends IAction {
  type: ActionTypes.PRESET_GRID;
  payload: {
    name: string;
  };
}
