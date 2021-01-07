import { twoDToOneDCoord } from "../Utilities/utilities";
import { Coord, Coords } from '../types/dtypes';

type Grid1D = Array<1 | 0 | -1>
type ShortestPathGrid = Array<Coord | -1>
type MoveOrder = (neighbours: Coords, curCoord: Coord, startCoord: Coord, endCoord: Coord) => Coords

export const neighbours = (coord: Coord, sizeX: number, sizeY: number): Coords => {
  const [x, y] = coord;

  let neighboursRelative;
  if (y % 2 === 0) {
    neighboursRelative = [[-1, -1], [0, -1], [1, 0], [0, 1], [-1, 1], [-1, 0]]
  } else {
    neighboursRelative = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 0]]
  }


  return neighboursRelative.map((coord) => [coord[0] + x, coord[1] + y]).filter((coord) => {
    const [x, y] = coord;
    return (x >= 0 && x < sizeX) && (y >= 0 && y < sizeY)
  }) as Coords
}


export const solver = (grid1D: Grid1D, shortestPathGrid: ShortestPathGrid, startCoord: Coord, endCoord: Coord, sizeX: number, sizeY: number, moveOrder: MoveOrder) => {
  console.log(startCoord, endCoord, sizeX, sizeY)
  let coords = [startCoord];
  let iterations = 0;

  while (coords.length > 0 && iterations < 300) {
    iterations += 1;
    const curCoord = coords.shift() as Coord;

    const moves = moveOrder(neighbours(curCoord, sizeX, sizeY), curCoord, startCoord, endCoord);

    for (const move of moves) {
      const coord1D = twoDToOneDCoord(move, sizeY);
      // Type of square to move to, 1 is end, -1 is wall
      const type = grid1D[coord1D];
      console.log("move", "type", move, type)

      if (type === 1) {
        shortestPathGrid[coord1D] = curCoord;
        coords = [];
        break;
      } else if (type === -1) {
        if (coords.length === 0) {
          throw new Error("PathError")
        }
      } else {
        if (shortestPathGrid[coord1D] === -1) {
          shortestPathGrid[coord1D] = curCoord;
          coords.push(move)
        }
      }
    }
  }

  const path = [endCoord];
  while (path[path.length - 1] !== startCoord) {
    const coord = shortestPathGrid[twoDToOneDCoord(path[path.length - 1], sizeY)];
    if (coord !== -1) {
      path.push(coord);
    } else {
      console.log("Path contains unsolved route", path, shortestPathGrid)
    }
  }

  return {path, finishedShortestPathGrid: shortestPathGrid}
}

