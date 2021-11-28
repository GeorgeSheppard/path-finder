import React from "react";
import { Coords } from "../types/dtypes";
import { CreateGridReturn } from "./hexagonGridManager";
import Hexagon, { FixedHexagonStylingProps } from "../Hexagon/hexagon";
import { WindowSize } from "../Canvas/canvas";

type HexagonGridProps = {
  pixelsCoords: Coords;
  gridProps: CreateGridReturn;
  largeHex: FixedHexagonStylingProps;
  smallHex: FixedHexagonStylingProps;
  windowSize: WindowSize;
};

const HexagonGrid = (props: HexagonGridProps) => {
  const { pixelsCoords, gridProps, smallHex, largeHex, windowSize } = props;

  return (
    <div
      data-tut="reactour-canvas"
      style={{ width: windowSize.width, height: windowSize.height }}
    >
      {gridProps &&
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
              largeHex={largeHex}
              smallHex={smallHex}
              coord={coord}
            />
          );
        })}
    </div>
  );
};

export default HexagonGrid;
