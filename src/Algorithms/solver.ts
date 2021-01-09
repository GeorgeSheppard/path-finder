import { arrayEquals, twoDToOneDCoord } from "../Utilities/utilities";
import { Coord, Coords } from "../types/dtypes";

type Grid1D = Array<1 | 0 | -1>;
type ShortestPathGrid = Array<Coord | -1>;
type MoveOrder = (
  neighbours: Coords,
  curCoord: Coord,
  startCoord: Coord,
  endCoord: Coord
) => Coords;

export const neighbours = (
  coord: Coord,
  sizeX: number,
  sizeY: number
): Coords => {
  const [x, y] = coord;

  let neighboursRelative;
  if (y % 2 === 0) {
    neighboursRelative = [
      [-1, -1],
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 1],
      [-1, 0],
    ];
  } else {
    neighboursRelative = [
      [0, -1],
      [1, -1],
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 0],
    ];
  }

  return neighboursRelative
    .map((coord) => [coord[0] + x, coord[1] + y])
    .filter((coord) => {
      const [x, y] = coord;
      return x >= 0 && x < sizeX && y >= 0 && y < sizeY;
    }) as Coords;
};

export class PathError extends Error {
  constructor(m: string) {
    super(m);

    Object.setPrototypeOf(this, PathError.prototype);
  }
}

export const solver = (
  grid1D: Grid1D,
  shortestPathGrid: ShortestPathGrid,
  startCoord: Coord,
  endCoord: Coord,
  sizeX: number,
  sizeY: number,
  moveOrder: MoveOrder
) => {
  let coords = [startCoord];
  let iterations = 0;
  let checkedCoordsOrder = [];

  while (coords.length > 0) {
    // If a maze is solveable then at most you should have to check every square once
    if (iterations > sizeX * sizeY) {
      throw new Error("MaxIterationsError");
    }
    iterations += 1;
    const curCoord = coords.shift() as Coord;

    // Order which neighbour tiles should be checked first
    const moves = moveOrder(
      neighbours(curCoord, sizeX, sizeY),
      curCoord,
      startCoord,
      endCoord
    );

    for (const move of moves) {
      const coord1D = twoDToOneDCoord(move, sizeY);
      // Type of square to move to, 1 is end, -1 is wall
      const type = grid1D[coord1D];

      if (type === 1) {
        // End tile found
        shortestPathGrid[coord1D] = curCoord;
        coords = [];
        break;
      } else if (type === -1) {
        // Wall tile found
        if (coords.length === 0) {
          console.log(
            "Ran out of coordinates",
            grid1D,
            shortestPathGrid,
            coords,
            checkedCoordsOrder
          );
        }
      } else {
        // Empty tile
        // If the tile hasn't been found before, point to the previous
        // tile to get there
        if (
          shortestPathGrid[coord1D] === -1 &&
          !arrayEquals(move, startCoord)
        ) {
          checkedCoordsOrder.push(move);
          shortestPathGrid[coord1D] = curCoord;
          coords.push(move);
        }
      }
    }
  }

  const path = [endCoord];
  while (path[path.length - 1] !== startCoord) {
    const coord =
      shortestPathGrid[twoDToOneDCoord(path[path.length - 1], sizeY)];
    if (coord !== -1) {
      path.push(coord);
    } else {
      throw new PathError("Path not possible");
    }
  }

  return {
    path,
    finishedShortestPathGrid: shortestPathGrid,
    coordsOrder: checkedCoordsOrder,
  };
};
