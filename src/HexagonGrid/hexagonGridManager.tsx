import React from "react";
import { WindowSize } from "../Canvas/canvas";
import HexagonGrid from "./hexagonGrid";
import { Coord, Coords } from "../types/dtypes";
import { hexagonStylingProps } from "../Hexagon/hexagon";
import { dispatchNewGridSize } from "../redux/dispatchers";

type HexagonGridManagerProps = {
  width?: number;
  borderWidth?: number;
  spacing?: number;
  siderWidth: number;
  windowSize: WindowSize;
};

export type CreateGridReturn = {
  coords: Coords;
  offsetX: number;
  offsetY: number;
  sizeX: number;
  sizeY: number;
};

/**
 * Wrapper component to manage overarching state for the hexagon grid, such
 * that each change of the HexagonStates don't cause a recalculation of
 * static properties
 */
const HexagonGridManager = (props: HexagonGridManagerProps) => {
  const {
    width = 50,
    borderWidth = 5,
    spacing = 5,
    siderWidth,
    windowSize,
  } = props;

  const horizontalSpacing = width + spacing;
  const verticalSpacing = (Math.sqrt(3) / 2) * width + spacing / 2;

  /**
   * Given the size of the window to display the grid, calculates the list of possible
   * coordinates, the available border width for the grid, and the dimensions of the grid
   * @param {number} windowSize
   */
  const createGrid = (
    windowSize: WindowSize,
    siderWidth: number
  ): CreateGridReturn | undefined => {
    if (windowSize.height !== 0 && windowSize.width !== 0) {
      const sizeX = Math.floor(
        (windowSize.width - siderWidth - horizontalSpacing / 2) /
          horizontalSpacing
      );

      const sizeY = Math.floor(
        (windowSize.height - (Math.sqrt(3) / 3) * width) / verticalSpacing
      );

      const offsetX =
        (windowSize.width - siderWidth - (sizeX + 0.5) * horizontalSpacing) / 2;
      const offsetY = (windowSize.height - (sizeY + 0.5) * verticalSpacing) / 2;

      const coords: Coords = [];

      for (let i = 0; i < sizeX; i++) {
        for (let j = 0; j < sizeY; j++) {
          const coord: Coord = [i, j];
          coords.push(coord);
        }
      }

      return { coords, offsetX, offsetY, sizeX, sizeY };
    }
  };

  /**
   * Converts a coordinate into a pixel coordinate
   * @param {number} x
   * @param {number} y
   */
  const coordToPixels = (x: number, y: number): Coord => {
    let pixelsX = horizontalSpacing * x;
    const pixelsY = verticalSpacing * y + (Math.sqrt(3) / 6) * width;
    if (y % 2 === 1) {
      pixelsX += horizontalSpacing / 2;
    }

    return [pixelsX, pixelsY];
  };

  const gridProps = createGrid(windowSize, siderWidth);

  if (gridProps) {
    dispatchNewGridSize(gridProps?.sizeX, gridProps?.sizeY);
    // Calculate the styling props once and then use it for all hexagons
    const hexagonCssProps = hexagonStylingProps({
      width,
      borderWidth,
    });

    const pixelsCoords: Coords = gridProps?.coords.map((coord: Coord) =>
      coordToPixels(...coord)
    );
    return (
      <HexagonGrid
        {...{
          hexagonCssProps,
          pixelsCoords,
          gridProps,
        }}
      />
    );
  } else {
    return null;
  }
};

export default HexagonGridManager;
