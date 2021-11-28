export type Coord = [number, number];
export type Coords = Array<Coord>;

export enum HexagonTypes {
  wall = "wall",
  start = "start",
  goal = "goal",
  animated = "animated",
  path = "path",
  space = "space",
}

export type HexagonStates = {
  goal: Coords;
  start: Coords;
  wall: Coords;
  animated: Coords;
};

export type Setter = (value: any) => void;

export type Algorithms = "dijkstra" | "greedy";
