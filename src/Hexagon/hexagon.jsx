import React from "react";
import styled from "styled-components";
import { arrayEquals } from "../Utilities/utilities";

// TODO: Cannot find a way to set multiple properties to the same value,
// would be useful for setting border-left and border-right at the same time,
// have tried using , like with &:before &:after but that doesn't work
const StyledHexagon = styled.div`
  position: absolute;
  width: ${(props) => `${props.middleWidth}px`};
  height: ${(props) => `${props.middleHeight}px`};
  background-color: ${(props) => props.backgroundColor};
  margin: ${(props) => `${props.margin}px`};
  border-left: ${(props) => borderStyle(props.middleBorderWidth)};
  border-right: ${(props) => borderStyle(props.middleBorderWidth)};
  &:before,
  &:after {
    content: "";
    position: absolute;
    z-index: 1;
    width: ${(props) => `${props.topBotDiameter}px`};
    height: ${(props) => `${props.topBotDiameter}px`};
    transform: scaleY(0.5774) rotate(-45deg);
    background-color: inherit;
    left: ${(props) => `${props.left}px`};
  }
  &:before {
    top: ${(props) => `${props.topBot}px`};
    border-top: ${(props) => borderStyle(props.topBotBorderWidth)};
    border-right: ${(props) => borderStyle(props.topBotBorderWidth)};
  }
  &:after {
    bottom: ${(props) => `${props.topBot}px`};
    border-bottom: ${(props) => borderStyle(props.topBotBorderWidth)};
    border-left: ${(props) => borderStyle(props.topBotBorderWidth)};
  }
`;

const borderStyle = (borderWidth) => `solid ${borderWidth}px #333333`;

export const hexagonStylingProps = ({
  width,
  borderWidth,
  backgroundColor,
}) => {
  return {
    middleWidth: width,
    middleHeight: (Math.sqrt(3) / 3) * width,
    topBotDiameter: width / Math.sqrt(2),
    margin: (width * Math.sqrt(3)) / 6,
    topBotBorderWidth: borderWidth * Math.sqrt(2),
    middleBorderWidth: borderWidth,
    left: -borderWidth - width / (Math.sqrt(2) * 2) + width / 2,
    topBot: -width / (Math.sqrt(2) * 2),
    backgroundColor,
  };
};

const typeToStyling = (type) => {
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

const limitedState = {
  wall: false,
  goal: true,
  start: true,
};

class Hexagon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previousState: props.type,
      mouseDown: props.mouseDown,
    };

    this.css = props.css;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.type !== this.props.type) {
      this.setState({ previousState: nextProps.type });
      return true;
    } else {
      return false;
    }
    return nextProps.type !== this.props.type;
  }

  removeOldState(oldType, newHexagonStates) {
    if (oldType !== "space") {
      if (limitedState[oldType]) {
        newHexagonStates[oldType] = [];
      } else {
        newHexagonStates[oldType] = newHexagonStates[oldType].filter(
          (coord) => !arrayEquals(coord, this.props.coord)
        );
      }
    }
    return newHexagonStates;
  }

  addNewState(newType, newHexagonStates) {
    if (newType !== "space") {
      if (limitedState[newType]) {
        newHexagonStates[newType] = [this.props.coord];
      } else {
        newHexagonStates[newType].push(this.props.coord);
      }
    }
    return newHexagonStates;
  }

  handleChange = (event, oldType) => {
    if (event.button === 0) {
      const newType = this.props.selected;

      if (newType !== this.state.previousState) {
        let newHexagonStates = { ...this.props.hexagonStates };

        newHexagonStates = this.removeOldState(oldType, newHexagonStates);
        newHexagonStates = this.addNewState(newType, newHexagonStates);

        this.props.setHexagonStates(newHexagonStates);
      }
    }
  };

  handleHover = (event, oldType) => {
    if (this.props.mouseDown) {
      this.handleChange(event, oldType);
    }
  };

  render() {
    const previous = this.props.type;
    const backgroundColor = typeToStyling(previous);

    return (
      <StyledHexagon
        {...{ ...this.css, backgroundColor }}
        style={this.props.style}
        onClick={(event) => this.handleChange(event, previous)}
        onMouseOver={(event) => this.handleHover(event, previous)}
        onMouseDown={(event) => this.handleChange(event, previous)}
      />
    );
  }
}

export default Hexagon;
