import React, { useState } from "react";
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
    this.type = props.type ?? "space";
  }

  shouldComponentUpdate(nextProps) {
    return this.type !== nextProps.type;
  }

  handleChange = (event) => {
    if (event.button === 0) {
      const newType = this.props.selected;
      let newHexagonState = { ...this.props.hexagonStates };
      if (newType === "goal" || newType === "start") {
        newHexagonState[newType] = [this.props.coord];
      } else {
        newHexagonState[newType].push(this.props.coord);
      }
      this.props.setHexagonStates(newHexagonState);
      this.setState({ type: newType });
    }
  };

  handleHover = (event) => {
    if (this.props.mouseDown) {
      this.handleChange(event);
    }
  };

  render() {
    const backgroundColor = typeToStyling(this.props.type);

    return (
      <StyledHexagon
        {...{ ...this.props, backgroundColor }}
        style={this.props.style}
        onClick={this.handleChange}
        onMouseOver={this.handleHover}
        onMouseDown={this.handleChange}
      />
    );
  }
}

// const Hexagon = (props) => {
//     const [type, setType] = useState(props.type ?? 'space');

//     // Only one hexagon can be a start/end point, so when a new hexagon
//     // converts to that then new props are passed into this
//     if (props.type !== type) {
//         setType(props.type);
//     }

//     const handleChange = (event) => {
//         if (event.button === 0) {
//             const newType = props.selected;
//             let newHexagonState = {...props.hexagonStates};
//             if (newType === 'goal' || newType === 'start') {
//                 newHexagonState[newType] = [props.coord];
//             } else {
//                 newHexagonState[newType].push(props.coord);
//             }
//             props.setHexagonStates(newHexagonState);
//             setType(newType);
//         }
//     }

//     const handleHover = (event) => {
//         if (props.mouseDown) {
//             handleChange(event);
//         }
//     }

//     const backgroundColor = typeToStyling(type);

//     return <StyledHexagon {...{...props, backgroundColor}} style={props.style}
//     onClick={handleChange} onMouseOver={handleHover} onMouseDown={handleChange} />;
// }

export default Hexagon;
