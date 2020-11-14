import { twoDToOneDCoord } from "../Utilities/utilities"

export const dijkstra = (grid1D, shortestPathGrid, startCoord, endCoord, neighbours) => {
  // Store coordinates of all coordinates that should be explored
  let coords = [startCoord]

  // TODO: Much of this logic can be factored out into a general function, as the only
  // thing that changes for each path finding algorithm is what coordinate is appended to coords
  // at each iteration
  while (coords.length > 0) {
    coord = coords[0];
    delete coords[0];
    for (const neighbour in neighbours(coord)) {
      const coord1D = twoDToOneDCoord(neighbour);

      const type = grid1D[coord1D];
      // Have found the goal coordinate
      if (type === 1) {
        shortestPathGrid[coord1D] = coord;
        coords = []
        break;
      // Have found a wall
      } else if (type === -1) {
        if (coords.length === 0) {
          // TODO: Decide how to handle this later
          throw { name: "Path Error", toString: () => "No possible path found" }
        }
      // Have found a space
      } else {
        if (shortestPathGrid[coord1D] === -1) {
          shortestPathGrid[coord1D] = coord;
          coords.push(neighbour);
        }
      }
    }
  }

  const path = [endCoord];
  while (path[-1] !== startCoord) {
    // Append previous coordinate in shortest path, working backwards from the end
    path.push(shortestPathGrid[twoDToOneDCoord(path[-1])]);
  }

  return [shortestPath, shortestPathGrid] 

}