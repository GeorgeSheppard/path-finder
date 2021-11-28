import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  headerHeight: number;
  windowSize: WindowSize;
};

export type CreateGridReturn = {
  coords: Coords;
  offsetX: number;
  offsetY: number;
  sizeX: number;
  sizeY: number;
  horizontalSpacing: number;
  verticalSpacing: number;
  borderWidth: number;
  width: number;
};

/**
 * Wrapper component to manage overarching state for the hexagon grid, such
 * that each change of the HexagonStates don't cause a recalculation of
 * static properties
 */
const HexagonGridManager = (props: HexagonGridManagerProps) => {
  const {
    width = 50,
    borderWidth = 10,
    spacing = 5,
    siderWidth,
    headerHeight,
    windowSize,
  } = props;

  const [gridProps, setGridProps] = useState<CreateGridReturn>(
    {} as CreateGridReturn
  );

  /**
   * Given the size of the window to display the grid, calculates the list of possible
   * coordinates, the available border width for the grid, and the dimensions of the grid
   * @param {number} windowSize
   */
  const createGrid = useCallback(
    (
      windowSize: WindowSize,
      siderWidth: number,
      headerHeight: number,
      width: number,
      spacing: number,
      borderWidth: number
    ): CreateGridReturn => {
      const horizontalSpacing = width + spacing;
      const verticalSpacing = (Math.sqrt(3) / 2) * width + spacing / 2;

      let sizeX = Math.floor(
        (windowSize.width - siderWidth - horizontalSpacing / 2) /
          horizontalSpacing
      );

      let sizeY = Math.floor(
        (windowSize.height - headerHeight - (Math.sqrt(3) / 3) * width) /
          verticalSpacing
      );

      if (sizeX * sizeY > 400) {
        return createGrid(
          windowSize,
          siderWidth,
          headerHeight,
          width + 10,
          spacing + 1,
          borderWidth + 2
        );
      }

      const offsetX =
        (windowSize.width - siderWidth - (sizeX + 0.5) * horizontalSpacing) / 2;
      const offsetY =
        (windowSize.height - headerHeight - (sizeY + 0.5) * verticalSpacing) /
        2;

      const coords: Coords = [];

      for (let i = 0; i < sizeX; i++) {
        for (let j = 0; j < sizeY; j++) {
          const coord: Coord = [i, j];
          coords.push(coord);
        }
      }

      return {
        coords,
        offsetX,
        offsetY,
        sizeX,
        sizeY,
        width,
        horizontalSpacing,
        verticalSpacing,
        borderWidth,
      };
    },
    []
  );

  /**
   * Converts a coordinate into a pixel coordinate
   * @param {number} x
   * @param {number} y
   */
  const coordToPixels = useCallback(
    (
      x: number,
      y: number,
      verticalSpacing: number,
      horizontalSpacing: number
    ): Coord => {
      let pixelsX = horizontalSpacing * x;
      const pixelsY = verticalSpacing * y + (Math.sqrt(3) / 6) * width;
      if (y % 2 === 1) {
        pixelsX += horizontalSpacing / 2;
      }

      return [pixelsX, pixelsY];
    },
    [width]
  );

  useEffect(() => {
    if (windowSize.height !== 0 && windowSize.width !== 0) {
      setGridProps(
        createGrid(
          windowSize,
          siderWidth,
          headerHeight,
          width,
          spacing,
          borderWidth
        )
      );
    }
  }, [
    windowSize,
    siderWidth,
    headerHeight,
    width,
    spacing,
    borderWidth,
    createGrid,
  ]);

  const {
    verticalSpacing,
    horizontalSpacing,
    sizeX,
    sizeY,
    width: gridWidth,
    borderWidth: gridBorderWidth,
    coords,
  } = gridProps;

  useEffect(() => {
    if (sizeX && sizeY) {
      dispatchNewGridSize(sizeX, sizeY);
    }
  }, [sizeX, sizeY]);

  // Calculate the styling props once and then use it for all hexagons
  const hexagonCssProps = useMemo(() => {
    if (gridWidth) {
      return hexagonStylingProps({
        width: gridWidth,
      });
    }
  }, [gridWidth]);

  const reducedHexagonCssProps = useMemo(() => {
    if (gridWidth && gridBorderWidth) {
      return hexagonStylingProps({ width: gridWidth - gridBorderWidth });
    }
  }, [gridWidth, gridBorderWidth]);

  const pixelsCoords = useMemo(() => {
    if (verticalSpacing && horizontalSpacing) {
      return coords.map((coord: Coord) =>
        coordToPixels(coord[0], coord[1], verticalSpacing, horizontalSpacing)
      );
    }
  }, [verticalSpacing, horizontalSpacing, coordToPixels, coords]);

  if (pixelsCoords && hexagonCssProps && reducedHexagonCssProps) {
    return (
      <HexagonGrid
        windowSize={props.windowSize}
        largeHex={hexagonCssProps}
        smallHex={reducedHexagonCssProps}
        pixelsCoords={pixelsCoords}
        gridProps={gridProps}
      />
    );
  } else {
    return null;
  }
};

export default HexagonGridManager;
