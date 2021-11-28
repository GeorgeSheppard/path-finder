import { createStore } from "redux";
import { stateReducer } from "./reducer";
import { HexagonTypes, Coords, Algorithms } from "../types/dtypes";
import { mazes } from "./mazes";

type IndividualHexagonTypes = { [index: string]: HexagonTypes };
type Mazes = { [index: string]: IndividualHexagonTypes };

export interface Store {
  fullHexagonStates: {
    [index: string]: Coords;
  };
  individualHexagonStates: IndividualHexagonTypes;
  mouseState: boolean;
  selected: HexagonTypes;
  algorithm: Algorithms | "";
  gridSize: {
    sizeX: number;
    sizeY: number;
  };
  reset: boolean;
  mazes: Mazes;
}

export const initialState: Store = {
  algorithm: "",
  selected: HexagonTypes.wall,
  mouseState: false,
  fullHexagonStates: {
    goal: [],
    start: [],
    wall: [],
    animated: [],
    path: [],
  },
  individualHexagonStates: {},
  gridSize: {
    sizeX: 0,
    sizeY: 0,
  },
  reset: false,
  mazes: mazes,
};

export default createStore(stateReducer, initialState);
