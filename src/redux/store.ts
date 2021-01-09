import { createStore } from "redux";
import { stateReducer } from "./reducer";
import {
  HexagonTypes,
  Coords,
  Algorithms,
  StoredHexagonTypes,
} from "../types/dtypes";

export interface Store {
  fullHexagonStates: {
    [K in StoredHexagonTypes]: Coords;
  };
  individualHexagonStates: {
    [index: string]: StoredHexagonTypes;
  };
  mouseState: boolean;
  selected: HexagonTypes;
  algorithm: Algorithms | "";
  gridSize: {
    sizeX: number;
    sizeY: number;
  };
  reset: boolean;
}

export const initialState: Store = {
  algorithm: "",
  selected: "wall",
  mouseState: false,
  fullHexagonStates: {
    goal: [[7, 3]],
    start: [[4, 5]],
    wall: [
      [8, 2],
      [5, 4],
      [6, 7],
      [5, 5],
      [6, 4],
      [7, 4],
      [6, 5],
      [7, 6],
      [4, 3],
      [4, 2],
      [3, 2],
      [7, 7],
      [8, 6],
      [8, 5],
    ],
    animated: [],
    path: [],
  },
  individualHexagonStates: {
    "7,3": "goal",
    "4,5": "start",
    "8,2": "wall",
    "5,4": "wall",
    "6,7": "wall",
    "5,5": "wall",
    "6,4": "wall",
    "7,4": "wall",
    "6,5": "wall",
    "7,6": "wall",
    "4,3": "wall",
    "4,2": "wall",
    "3,2": "wall",
    "7,7": "wall",
    "8,6": "wall",
    "8,5": "wall",
  },
  gridSize: {
    sizeX: 0,
    sizeY: 0,
  },
  reset: false,
};

export default createStore(stateReducer, initialState);
