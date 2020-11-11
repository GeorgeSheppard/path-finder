import { twoDToOneDCoord } from "../Utilities/utilities"

export const neighbours = (coord, sizeX, sizeY) => {
  const [x, y] = coord;

  let neighboursRelative;
  if (y % 2 === 0) {
    neighboursRelative = [[-1, -1], [-1, 0], [0, 1], [1, 0], [1, -1], [0, -1]];
  } else {
    neighboursRelative = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [0, -1]]
  }

  return neighboursRelative.map((coord) => [coord[0] + x, coord[1] + y]).filter((coord) => {
    const [x, y] = coord;
    return (x >= 0 && x < sizeX) && (y >= 0 && y < sizeY)
  })
}

export const pathFinder = (algorithm, hexagonStates, sizeX, sizeY) => {
  // grid1D is a 1d array containing the type of each of the hexagon states
  const grid1D = new Array(sizeX * sizeY).fill(0)

  // shortestPathGrid will be a 1d array that contains at coordinate x, the coordinate of the 
  // previous coordinate on the shortest path to coordinate x
  // e.g. [-1, -1, [5, 3], [0, 2], -1]
  const shortestPathGrid = new Array(sizeX * sizeY).fill(-1)

  for (const wallCoord in hexagonStates.wall) {
    grid1D[twoDToOneDCoord(wallCoord)] = -1
  }

  const goal = hexagonStates.goal[0];
  const start = hexagonStates.start[0];

  const goal1DCoord = twoDToOneDCoord(goal);
  grid1D[goal1DCoord] = 1;
  const start1DCoord = twoDToOneDCoord(start);
  shortestPathGrid[start1DCoord] = start;

  const [shortestPath, pathGrid] = algorithm(grid1D, shortestPathGrid, start, goal, (coord) => neighbours(coord, sizeX, sizeY));
  console.log(shortestPath);
  console.log(pathGrid);
}