import { twoDToOneDCoord } from "../Utilities/utilities";
import { solver } from "./solver";
import { dijkstraMoveOrder } from "./Dijkstra/dijkstra";
import {
  dispatchAnimationStopped,
  dispatchHexagonState,
} from "../redux/dispatchers";
import store from "../redux/store";

export const router = (algorithm, hexagonStates, sizeX, sizeY) => {
  let moveOrder;
  switch (algorithm) {
    case "dijkstra":
      moveOrder = dijkstraMoveOrder;
      break;
    default:
      console.log("unknown algorithm", algorithm);
  }
  pathFinder(moveOrder, hexagonStates, sizeX, sizeY);
};

export const pathFinder = async (moveOrder, hexagonStates, sizeX, sizeY) => {
  console.log(hexagonStates);
  // grid1D is a 1d array containing the type of each of the hexagon states
  const grid1D = new Array(sizeX * sizeY).fill(0);

  // shortestPathGrid will be a 1d array that contains at coordinate x, the coordinate of the
  // previous coordinate on the shortest path to coordinate x
  // e.g. [-1, -1, [5, 3], [0, 2], -1]
  const shortestPathGrid = new Array(sizeX * sizeY).fill(-1);

  console.log(hexagonStates.wall);
  for (const wallCoord of hexagonStates.wall) {
    grid1D[twoDToOneDCoord(wallCoord, sizeY)] = -1;
  }

  const goal = hexagonStates.goal[0];
  const start = hexagonStates.start[0];

  const goal1DCoord = twoDToOneDCoord(goal, sizeY);
  grid1D[goal1DCoord] = 1;
  const start1DCoord = twoDToOneDCoord(start, sizeY);
  shortestPathGrid[start1DCoord] = start;

  try {
    const { path, finishedShortestPathGrid, coordsOrder } = solver(
      grid1D,
      shortestPathGrid,
      start,
      goal,
      sizeX,
      sizeY,
      moveOrder
    );

    const pathPeriod = 3000 / path.length;
    const checkedPeriod = 10000 / coordsOrder.length;

    async function dispatchPath(path) {
      if (!store.getState().reset) {
        if (path.length > 0) {
          const coord = path.shift();
          dispatchHexagonState(coord, "path");
          setTimeout(() => dispatchPath(path), pathPeriod);
        }
      } else {
        dispatchAnimationStopped();
      }
    }

    async function dispatchSolverAnimation(coordsOrder, path) {
      if (!store.getState().reset) {
        if (coordsOrder.length > 0) {
          const coord = coordsOrder.shift();
          dispatchHexagonState(coord, "animated");
          setTimeout(
            () => dispatchSolverAnimation(coordsOrder, path),
            checkedPeriod
          );
        } else {
          dispatchPath(path.slice(1, -1).reverse());
        }
      } else {
        dispatchAnimationStopped();
      }
    }

    dispatchSolverAnimation(coordsOrder, path);
  } catch (error) {
    console.log("Error", error);
  }
};
