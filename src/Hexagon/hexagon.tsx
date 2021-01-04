import React from "react";
import styled from "styled-components";
import { Coord, HexagonTypes } from "../types/dtypes";
import { dispatchHexagonState } from "../redux/dispatchers";
import { useHexagonState } from "../hooks/stateHook";
import store from "../redux/store";

export interface FixedHexagonStylingProps {
  middleWidth: number;
  middleHeight: number;
  topBotDiameter: number;
  margin: number;
  topBotBorderWidth: number;
  middleBorderWidth: number;
  left: number;
  topBot: number;
}

export interface StyledHexagonProps extends FixedHexagonStylingProps {
  backgroundColor: string;
}
// TODO: Cannot find a way to set multiple properties to the same value,
// would be useful for setting border-left and border-right at the same time,
// have tried using , like with &:before &:after but that doesn't work
/**
 * A CSS hexagon, with configurable size, colours, and border
 */
const StyledHexagon = styled.div`
  position: absolute;
  width: ${(props: StyledHexagonProps) => `${props.middleWidth}px`};
  height: ${(props: StyledHexagonProps) => `${props.middleHeight}px`};
  background-color: ${(props: StyledHexagonProps) => props.backgroundColor};
  border-left: ${(props: StyledHexagonProps) =>
    borderStyle(props.middleBorderWidth)};
  border-right: ${(props: StyledHexagonProps) =>
    borderStyle(props.middleBorderWidth)};
  &:before,
  &:after {
    content: "";
    position: absolute;
    z-index: 1;
    width: ${(props: StyledHexagonProps) => `${props.topBotDiameter}px`};
    height: ${(props: StyledHexagonProps) => `${props.topBotDiameter}px`};
    transform: scaleY(0.5774) rotate(-45deg);
    background-color: inherit;
    left: ${(props: StyledHexagonProps) => `${props.left}px`};
  }
  &:before {
    top: ${(props: StyledHexagonProps) => `${props.topBot}px`};
    border-top: ${(props: StyledHexagonProps) =>
      borderStyle(props.topBotBorderWidth)};
    border-right: ${(props: StyledHexagonProps) =>
      borderStyle(props.topBotBorderWidth)};
  }
  &:after {
    bottom: ${(props: StyledHexagonProps) => `${props.topBot}px`};
    border-bottom: ${(props: StyledHexagonProps) =>
      borderStyle(props.topBotBorderWidth)};
    border-left: ${(props: StyledHexagonProps) =>
      borderStyle(props.topBotBorderWidth)};
  }
`;

// Used in the CSS hexagon above
const borderStyle = (borderWidth: number) => `solid ${borderWidth}px #333333`;

/**
 * Returns an object containing all parameters that physically specify a hexagon
 * @param {float} width: the distance between two opposite sides of the hexagon, not
 * including the border width
 * @param {float} borderWidth: the width of the border, from the outer of the hexagon
 * to the outer of the border
 */
export const hexagonStylingProps = ({
  width,
  borderWidth,
}: any): FixedHexagonStylingProps => {
  return {
    middleWidth: width,
    middleHeight: (Math.sqrt(3) / 3) * width,
    topBotDiameter: width / Math.sqrt(2),
    margin: (width * Math.sqrt(3)) / 6,
    topBotBorderWidth: borderWidth * Math.sqrt(2),
    middleBorderWidth: borderWidth,
    left: -borderWidth - width / (Math.sqrt(2) * 2) + width / 2,
    topBot: -width / (Math.sqrt(2) * 2),
  };
};

/**
 * Converts the type of a hexagon into the colour it's background should be
 * @param type: the state of the hexagon, currently 'space', 'wall', 'goal', or 'start'
 */
const typeToStyling = (type: string) => {
  let backgroundColor = "#64C7CC";
  switch (type) {
    case "space":
      break;
    case "wall":
      backgroundColor = "#000000";
      break;
    case "goal":
      backgroundColor = "#00ff00";
      break;
    case "start":
      backgroundColor = "#ff0000";
      break;
    default:
      break;
  }
  return backgroundColor;
};

export interface HexagonProps {
  css: any;
  style: any;
  coord: Coord;
}

const Hexagon = (props: HexagonProps) => {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    oldType: HexagonTypes
  ) => {
    if (event.button === 0) {
      const newType = store.getState().selected;
      if (newType !== oldType) {
        dispatchHexagonState(props.coord, newType);
      }
    }
  };

  const handleHover = (
    event: React.MouseEvent<HTMLElement>,
    oldType: HexagonTypes
  ) => {
    const mouseDown = store.getState().mouseState;

    if (mouseDown) {
      handleChange(event, oldType);
    }
  };

  const type = useHexagonState(props.coord);
  const { css, style } = props as HexagonProps;
  const backgroundColor = typeToStyling(type);
  console.log("rendering");
  return (
    <StyledHexagon
      {...{ ...css, backgroundColor }}
      style={style}
      onClick={(event: React.MouseEvent<HTMLElement>) =>
        handleChange(event, type)
      }
      onMouseOver={(event: React.MouseEvent<HTMLElement>) =>
        handleHover(event, type)
      }
      onMouseDown={(event: React.MouseEvent<HTMLElement>) =>
        handleChange(event, type)
      }
      onDragStart={(event: React.MouseEvent<HTMLElement>) =>
        event.preventDefault()
      }
    />
  );
};

export default Hexagon;
