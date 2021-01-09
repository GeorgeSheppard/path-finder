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
  left: number;
  topBot: number;
  scaleTransform: number;
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
  transition: 0.2s;
  position: absolute;
  width: ${(props: StyledHexagonProps) => `${props.middleWidth}px`};
  height: ${(props: StyledHexagonProps) => `${props.middleHeight}px`};
  background-color: ${(props: StyledHexagonProps) => props.backgroundColor};
  &:before,
  &:after {
    content: "";
    position: absolute;
    width: ${(props: StyledHexagonProps) => `${props.topBotDiameter}px`};
    height: ${(props: StyledHexagonProps) => `${props.topBotDiameter}px`};
    left: ${(props: StyledHexagonProps) => `${props.left}px`};
    transform: scaleY(0.5773502692) rotate(-45deg);
    background-color: inherit;
  }
  &:before {
    top: ${(props: StyledHexagonProps) => `${props.topBot}px`};
  }
  &:after {
    bottom: ${(props: StyledHexagonProps) => `${props.topBot}px`};
  }
`;

const StyledHexagonWithBorder = (props: any) => {
  const { largeHex, smallHex } = props;

  const leftShift = (largeHex.middleWidth - smallHex.middleWidth) / 2;
  const downShift = (largeHex.middleHeight - smallHex.middleHeight) / 2;
  const smallHexTransform = `translate(${leftShift}px, ${downShift}px)`;

  return (
    <StyledHexagon
      {...{ ...largeHex, ...props, backgroundColor: "#000000" }}
      style={{ zIndex: 1, ...props.style }}
    >
      <StyledHexagon
        {...{ ...smallHex, backgroundColor: props.backgroundColor }}
        style={{ zIndex: 5, transform: smallHexTransform }}
      />
    </StyledHexagon>
  );
};

/**
 * Returns an object containing all parameters that physically specify a hexagon
 * @param {float} width: the distance between two opposite sides of the hexagon, not
 * including the border width
 * @param {float} borderWidth: the width of the border, from the outer of the hexagon
 * to the outer of the border
 */
export const hexagonStylingProps = ({
  width,
}: any): FixedHexagonStylingProps => {
  return {
    middleWidth: width,
    middleHeight: (Math.sqrt(3) / 3) * width,
    topBotDiameter: width / Math.sqrt(2),
    margin: (width * Math.sqrt(3)) / 6,
    left: -width / (Math.sqrt(2) * 2) + width / 2,
    topBot: -width / (Math.sqrt(2) * 2),
    scaleTransform: Math.sqrt(3) / 3,
  };
};

/**
 * Converts the type of a hexagon into the colour it's background should be
 * @param type: the state of the hexagon, currently 'space', 'wall', 'goal', or 'start'
 */
const typeToStyling = (type: string) => {
  switch (type) {
    case "space":
      break;
    case "wall":
      return "#000000";
    case "goal":
      return "#00ff00";
    case "start":
      return "#ff0000";
    case "animated":
      return "#ffff00";
    case "path":
      return "#ffa500";
    default:
      break;
  }
  return "#64C7CC";
};

export interface HexagonProps {
  largeHex: any;
  smallHex: any;
  key: string;
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
    } else if (event.button === 2) {
      if ("space" !== oldType) {
        dispatchHexagonState(props.coord, "space");
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
  const { largeHex, smallHex, style } = props as HexagonProps;
  const backgroundColor = typeToStyling(type);
  console.log("rendering");
  return (
    <StyledHexagonWithBorder
      {...{ largeHex, smallHex, backgroundColor }}
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
      onContextMenu={(event: React.MouseEvent<HTMLElement>) =>
        event.preventDefault()
      }
    />
  );
};

export default Hexagon;
