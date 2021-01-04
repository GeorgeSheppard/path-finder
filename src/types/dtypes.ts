export type StoredHexagonTypes = "wall" | "start" | "goal";
export type HexagonTypes = StoredHexagonTypes | "space";

export type Coord = [number, number];
export type Coords = Array<Coord>;

export type HexagonStates = {
  goal: Coords;
  start: Coords;
  wall: Coords;
};

export type Setter = (value: any) => void;

export type Algorithms = "dijkstra" | "greedy";