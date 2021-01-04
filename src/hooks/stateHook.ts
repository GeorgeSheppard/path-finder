import { Coord } from "../types/dtypes"
import { useSelector } from "react-redux";
import { Store } from '../redux/store';

export function useHexagonState(coord: Coord) {
  const hexagonState = useSelector((state: Store) => state.individualHexagonStates[coord.toString()]);
  
  if (hexagonState) {
    return hexagonState;
  } else {
    return "space";
  }
}