import React, { useState, useEffect } from "react";
import styled from "styled-components";

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

class Hexagon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      selected: props.selected,
      mouseDown: props.mouseDown,
    };

    this.css = props.css;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.type !== this.state.type;
  }

  handleChange = (event) => {
    if (event.button === 0) {
      this.setState({ type: this.props.selected });
    }
  };

  handleHover = (event) => {
    if (this.props.mouseDown) {
      this.handleChange(event);
    }
  };

  render() {
    console.log("rendering");
    const backgroundColor = typeToStyling(this.state.type);

    return (
      <StyledHexagon
        {...{ ...this.css, backgroundColor }}
        style={this.props.style}
        onClick={this.handleChange}
        onMouseOver={this.handleHover}
        onMouseDown={this.handleChange}
      />
    );
  }
}

export default Hexagon;
