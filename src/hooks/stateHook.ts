import { Coord, HexagonTypes } from "../types/dtypes";
import { useSelector } from "react-redux";
import { Store } from "../redux/store";

export function useHexagonState(coord: Coord): HexagonTypes {
  const hexagonState = useSelector(
    (state: Store) => state.individualHexagonStates[coord.toString()]
  );

  return hexagonState ?? HexagonTypes.space;
}
