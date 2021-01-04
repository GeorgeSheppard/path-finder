import { HexagonTypes, Coord, Algorithms } from '../types/dtypes';

export const NEW_HEXAGON_STATE = "new_hexagon_state";

export const NEW_MOUSE_STATE = "new_mouse_state";

export const NEW_SELECTED = "new_selected";

export const NEW_ALGORITHM = "new_algorithm";

export const NEW_GRID_SIZE = "new_grid_size";

export interface NewHexagonState {
  type: typeof NEW_HEXAGON_STATE;
  payload: {
    coord: Coord;
    newState: HexagonTypes;
  }
}

export interface NewMouseState {
  type: typeof NEW_MOUSE_STATE;
  payload: {
    mouseState: boolean;
  }
}

export interface NewSelected {
  type: typeof NEW_SELECTED;
  payload: {
    selected: HexagonTypes;
  }
}

export interface NewAlgorithm {
  type: typeof NEW_ALGORITHM;
  payload: {
    algorithm: Algorithms;
  }
}

export interface NewGridSize {
  type: typeof NEW_GRID_SIZE;
  payload: {
    sizeX: number;
    sizeY: number;
  }
}

export type Actions = NewHexagonState | NewMouseState | NewSelected | NewAlgorithm | NewGridSize;