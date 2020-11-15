import React, { useState } from "react";
import {
  HexagonStates,
  HexagonTypes,
  Setter,
  Coord,
  Coords,
} from "../types/dtypes";
import { CreateGridReturn } from "./hexagonGridManager";
import { twoDToOneDCoord } from "../Utilities/utilities";
import Hexagon, { FixedHexagonStylingProps } from "../Hexagon/hexagon";

type HexagonGridProps = {
  hexagonStates: HexagonStates;
  setHexagonStates: Setter;
  selected: HexagonTypes;
  pixelsCoords: Coords;
  gridProps: CreateGridReturn;
  hexagonCssProps: FixedHexagonStylingProps;
};

// TODO: This is currently the component restricting performance, as each time hexagonStates changes (often with just one change)
// the whole component rerenders, this performance is only a problem with smaller hexagons so leaving this for now, but could
// later convert to a class component and use state to store things to reduce calculations (looking at hexagonStartingStates),
// could also just look for the difference between old hexagonStates and new ones so that hexagonStartingStates just needs to be
// run once for that specific hexagon
const HexagonGrid = (props: HexagonGridProps) => {
  const {
    hexagonStates,
    setHexagonStates,
    selected,
    pixelsCoords,
    gridProps,
    hexagonCssProps,
  } = props;

  const [mouseDown, setMouseDown] = useState(false);

  const handleMouseDown = (state: boolean): Setter => {
    return (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.button === 0) {
        setMouseDown(state);
      }
    };
  };

  /**
   * Maps a grid specification of the form
   * {
   * 'wall': [[2, 0], [3, 5]],
   * 'goal': [[1, 2]],
   * 'start': [[3,  6]]
   * }
   * into an array that has the type of each individual hexagon on the grid
   * @param {object} gridProps output of the createGrid function
   * @param {*} hexagonStates grid specification
   */
  const hexagonStartingStates = (
    gridProps: CreateGridReturn | undefined,
    hexagonStates: HexagonStates
  ) => {
    if (gridProps) {
      const { sizeX, sizeY } = gridProps;
      const hexagonStartingStates = new Array(sizeX * sizeY).fill("space");

      Object.entries(hexagonStates).forEach((row) => {
        const key = row[0];
        row[1].forEach((coord: Coord) => {
          hexagonStartingStates[twoDToOneDCoord(coord, sizeY)] = key;
        });
      });

      return hexagonStartingStates;
    }
  };

  const parsedHexagonStates = hexagonStartingStates(gridProps, hexagonStates);

  return (
    <div onMouseDown={handleMouseDown(true)} onMouseUp={handleMouseDown(false)}>
      {gridProps &&
        parsedHexagonStates &&
        gridProps.coords.map((coord, i) => {
          const [x, y] = coord;

          const transform = pixelsCoords[i];

          const { offsetX, offsetY } = gridProps;

          // maps hexagons to correct coordinate and centre the entire grid
          const style = {
            transform: `translate(${transform[0] + offsetX}px, ${
              transform[1] + offsetY
            }px)`,
          };

          return (
            <Hexagon
              key={`${x}:${y}`}
              style={style}
              css={hexagonCssProps}
              {...{
                type: parsedHexagonStates[i],
                coord,
                selected,
                mouseDown,
                hexagonStates,
                setHexagonStates,
              }}
            />
          );
        })}
    </div>
  );
};

export default HexagonGrid;
