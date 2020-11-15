import React from "react";
import { HexagonStates, Setter, HexagonTypes } from '../types/dtypes';

export type GridPropertiesContext = {
  hexagonStates: HexagonStates;
  setHexagonStates: Setter;
  selected: HexagonTypes;
};

export const HexagonGridPropertiesContext = React.createContext<
  GridPropertiesContext
>({
  hexagonStates: {
    goal: [],
    start: [],
    wall: [],
  } as HexagonStates,
  setHexagonStates: (value: HexagonStates): void => {},
  selected: "wall",
});