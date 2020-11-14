import React, { useState } from "react";
import Hexagon, { hexagonStylingProps } from "../Hexagon/hexagon";
import { twoDToOneDCoord } from "../Utilities/utilities";

// TODO: For a large number of hexagons the performance is poor, should add an useEffect
// hook so that createGrid is only called when the hexagon props change
// should make it so that pixel coordinates are calculated once and stored
// effectively the only function that should be run on a new render provided the grid stays
// the same is the hexagonStartingStates function
/**
 * Creates a grid of tesselating hexagons the size of the canvas object that
 * contains it, can define the width of an individual hexagon, the border size,
 * spacing between each hexagon
 * @param {object} props
 */
const HexagonGrid = (props) => {
  const {
    width = 50,
    borderWidth = 5,
    spacing = 5,
    hexagonStates,
    setHexagonStates,
    selected,
    siderWidth,
  } = props;

  // Width of the hexagon INCLUDES the borderwidth
  const horizontalSpacing = width + spacing;
  const verticalSpacing = (Math.sqrt(3) / 2) * width + spacing / 2;

  // Sent to the hexagons to allow state change for drag click
  const [mouseDown, setMouseDown] = useState(false);

  const handleClick = (state) => {
    return (event) => {
      if (event.button === 0) {
        setMouseDown(state);
      }
    };
  };

  /**
   * Given the size of the window to display the grid, calculates the list of possible
   * coordinates, the available border width for the grid, and the dimensions of the grid
   * @param {int} windowSize
   */
  const createGrid = (windowSize) => {
    if (windowSize.height !== 0 && windowSize.width !== 0) {
      const sizeX = Math.floor(
        (windowSize.width - siderWidth - horizontalSpacing / 2) /
          horizontalSpacing
      );

      const sizeY = Math.floor(windowSize.height / verticalSpacing);

      const offsetX =
        (windowSize.width - siderWidth - (sizeX + 0.5) * horizontalSpacing) / 2;
      const offsetY = (windowSize.height - (sizeY + 0.5) * verticalSpacing) / 2;

      const coords = [];

      for (let i = 0; i < sizeX; i++) {
        for (let j = 0; j < sizeY; j++) {
          coords.push([i, j]);
        }
      }

      return { coords, offsetX, offsetY, sizeX, sizeY };
    }
  };

  /**
   * Converts a coordinate into a pixel coordinate
   * @param {int} x
   * @param {int} y
   */
  const coordToPixels = (x, y) => {
    let pixelsX = horizontalSpacing * x;
    const pixelsY = verticalSpacing * y + (Math.sqrt(3) / 6) * width;
    if (y % 2 === 1) {
      pixelsX += horizontalSpacing / 2;
    }

    return { pixelsX, pixelsY };
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
  const hexagonStartingStates = (gridProps, hexagonStates) => {
    if (gridProps) {
      const { sizeX, sizeY } = gridProps;
      const hexagonStartingStates = new Array(sizeX * sizeY).fill("space");

      Object.entries(hexagonStates).forEach((row) => {
        const key = row[0];
        row[1].forEach((coord) => {
          hexagonStartingStates[twoDToOneDCoord(coord, sizeY)] = key;
        });
      });

      return hexagonStartingStates;
    }
  };

  const gridProps = createGrid(props.windowSize);
  // Calculate the styling props once and then use it for all hexagons
  const hexagonProps = hexagonStylingProps({
    width,
    borderWidth,
  });
  const parsedHexagonStates = hexagonStartingStates(gridProps, hexagonStates);

  return (
    <div onMouseDown={handleClick(true)} onMouseUp={handleClick(false)}>
      {gridProps &&
        gridProps.coords.map((coord, i) => {
          const [x, y] = coord;

          const transform = coordToPixels(x, y, spacing, width, borderWidth);

          const { offsetX, offsetY } = gridProps;

          // maps hexagons to correct coordinate and centre the entire grid
          const style = {
            transform: `translate(${transform.pixelsX + offsetX}px, ${
              transform.pixelsY + offsetY
            }px)`,
          };

          return (
            <Hexagon
              key={`${x}:${y}`}
              style={style}
              css={hexagonProps}
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
