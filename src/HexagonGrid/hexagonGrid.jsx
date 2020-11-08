import React, { useState } from "react";
import Hexagon, { hexagonStylingProps } from "../Hexagon/hexagon";

const HexagonGrid = (props) => {
  const {
    width = 50,
    borderWidth = 5,
    spacing = 2,
    backgroundColor = "#64C7CC",
    hexagonStates,
    setHexagonStates,
    selected,
  } = props;

  const [mouseDown, setMouseDown] = useState(false);

  const handleClick = (state) => {
    return (event) => {
      if (event.button === 0) {
        setMouseDown(state);
      }
    };
  };

  const createGrid = (windowSize, width, spacing, borderWidth) => {
    if (windowSize.height !== 0 && windowSize.width !== 0) {
      const horizontalSpacing = width + spacing + 2 * borderWidth;
      const sizeX = Math.floor((windowSize.width - width) / horizontalSpacing);
      const spaceX = windowSize.width - (sizeX * horizontalSpacing + width);

      const verticalSpacing = (Math.sqrt(3) / 2) * (spacing + width);
      const sizeY = Math.floor(
        (windowSize.height - (Math.sqrt(3) / 3) * width) / verticalSpacing
      );
      const spaceY =
        windowSize.height -
        (sizeY * verticalSpacing + (Math.sqrt(3) / 3) * width);

      const coords = [];

      for (let i = 0; i < sizeX; i++) {
        for (let j = 0; j < sizeY; j++) {
          coords.push([i, j]);
        }
      }

      return { coords, spaceX, spaceY, sizeX, sizeY };
    }
  };

  // TODO: To centralise grid of hexagons properly need to make sure this returns exactly
  // the right spacing, can then update other maths to account for it
  const coordToPixels = (x, y, spacing, width) => {
    let pixelsX = (width + spacing) * x;
    let pixelsY =
      ((width * Math.sqrt(3)) / 2 + (spacing * Math.sqrt(3)) / 2) * y;
    if (y % 2 === 1) {
      pixelsX += width / 2 + spacing / 2;
    }

    return { pixelsX, pixelsY };
  };

  const hexagonStartingStates = (gridProps, hexagonStates) => {
    if (gridProps) {
      const hexagonStartingStates = new Array(gridProps.coords.length).fill(
        "space"
      );
      const { sizeY } = gridProps;

      Object.entries(hexagonStates).forEach((row) => {
        const key = row[0];
        row[1].forEach((coord) => {
          hexagonStartingStates[coord[0] * sizeY + coord[1]] = key;
        });
      });

      return hexagonStartingStates;
    }
  };

  const gridProps = createGrid(props.windowSize, width, spacing, borderWidth);
  const hexagonProps = hexagonStylingProps({
    width,
    borderWidth,
    backgroundColor,
  });
  const parsedHexagonStates = hexagonStartingStates(gridProps, hexagonStates);

  return (
    <div onMouseDown={handleClick(true)} onMouseUp={handleClick(false)}>
      {gridProps &&
        gridProps.coords.map((coord, i) => {
          const [x, y] = coord;

          const transform = coordToPixels(x, y, spacing, width);

          // TODO: Use these to centre grid properly
          // const { spaceX, spaceY } = gridProps;

          const style = {
            transform: `translate(${transform.pixelsX}px, ${transform.pixelsY}px)`,
          };

          const type = {
            type: parsedHexagonStates[i],
          };

          return (
            <Hexagon
              key={`${x}:${y}`}
              style={style}
              css={hexagonProps}
              {...{
                ...type,
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
