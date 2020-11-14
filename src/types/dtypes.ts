
export type HexagonTypes = "wall" | "start" | "goal" | "space";

export type Coord = [number, number];
export type Coords = Array<Coord>;

export type HexagonStates = {
  goal: Coords;
  start: Coords;
  wall: Coords;
};

export type Setter = (value: any) => void;