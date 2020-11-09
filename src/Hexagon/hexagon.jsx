import React from "react";
import styled from "styled-components";
import { arrayEquals } from "../Utilities/utilities";

// TODO: Cannot find a way to set multiple properties to the same value,
// would be useful for setting border-left and border-right at the same time,
// have tried using , like with &:before &:after but that doesn't work
/**
 * A CSS hexagon, with configurable size, colours, and border
 */
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

// Used in the CSS hexagon above
const borderStyle = (borderWidth) => `solid ${borderWidth}px #333333`;

/**
 * Returns an object containing all parameters that physically specify a hexagon
 * @param {float} width: the distance between two opposite sides of the hexagon, not
 * including the border width
 * @param {float} borderWidth: the width of the border, from the outer of the hexagon
 * to the outer of the border
 */
export const hexagonStylingProps = ({ width, borderWidth }) => {
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

/**
 * A general hexagon class, used to build up the hexagon grid.
 * The logic behind it is as follows:
 * - The type the hexagon should be (e.g. 'wall', 'start' etc) is passed in on props and the hexagon renders
 * - When the hexagon is clicked OR dragged over with a new type selected in the toolbar, the updated state is sent
 * to the overall store for the grid
 * - This new grid state is then passed down to each hexagon, NOTE: some states are limited
 * (e.g. can only be one 'start' state), so if a new 'start' state is created the old one is removed
 * - When each hexagon receives it's new type (according to the grid store), it updates only if it's current type
 * doesn't match the new one
 */
class Hexagon extends React.Component {
  /**
   * A mapping from state types to whether that state is limited in it's numbers or not
   * there can only be one goal and one start point, but many walls
   * NOTE: 'space' is not mapped here as it should be checked seperately and space locations
   * are not stored, a grid can be
   * fully specified using it's dimensions, and the location of the remaining hexagon types
   */
  limitedState = {
    wall: false,
    goal: true,
    start: true,
  };

  /**
   * Decides whether the component needs to rerender, based on the set of props that have just
   * been passed in
   * @param {object} nextProps: the new properties passed into the hexagon
   */
  shouldComponentUpdate(nextProps) {
    return nextProps.type !== this.props.type;
  }

  /**
   * Updates the hexagonStates object that specifies all the states of the hexagonGrid, by removing
   * the old state of this hexagon from it
   * @param {string} oldType: 'space' | 'wall' | 'goal' | 'start'
   * @param {object} newHexagonStates: a copy of the hexagonStates object to modify
   * @returns newHexagonStates: with the old state of this hexagon removed
   */
  removeOldState(oldType, newHexagonStates) {
    if (oldType !== "space") {
      if (this.limitedState[oldType]) {
        newHexagonStates[oldType] = [];
      } else {
        newHexagonStates[oldType] = newHexagonStates[oldType].filter(
          (coord) => !arrayEquals(coord, this.props.coord)
        );
      }
    }
    return newHexagonStates;
  }

  /**
   * Updates the hexagonStates object that specifies all the states of the hexagonGrid, by adding the
   * new state of this hexagon to it
   * @param {string} newType: 'space' | 'wall' | 'goal' | 'start'
   * @param {object} newHexagonStates: a copy of the hexagonStates object to modify
   * @returns newHexagonStates: with the new state of this hexagon added to it
   */
  addNewState(newType, newHexagonStates) {
    if (newType !== "space") {
      if (this.limitedState[newType]) {
        newHexagonStates[newType] = [this.props.coord];
      } else {
        newHexagonStates[newType].push(this.props.coord);
      }
    }
    return newHexagonStates;
  }

  /**
   * Utilises the addNewState and removeOldState methods to update the hexagonGridState,
   * which subsequently gets passed down as a new prop
   * @param {object} event: event object from e.g. a click
   * @param {string} oldType: 'space' | 'wall' | 'goal' | 'start'
   */
  handleChange = (event, oldType) => {
    if (event.button === 0) {
      const newType = this.props.selected;

      if (newType !== oldType) {
        let newHexagonStates = { ...this.props.hexagonStates };

        newHexagonStates = this.removeOldState(oldType, newHexagonStates);
        newHexagonStates = this.addNewState(newType, newHexagonStates);

        this.props.setHexagonStates(newHexagonStates);
      }
    }
  };

  /**
   * Triggered when the mouse hovers over the top of the hexagon
   * @param {object} event: onMouseOver event
   * @param {string} oldType: 'space' | 'wall' | 'goal' | 'start'
   */
  handleHover = (event, oldType) => {
    if (this.props.mouseDown) {
      this.handleChange(event, oldType);
    }
  };

  render() {
    const type = this.props.type;
    const backgroundColor = typeToStyling(type);

    // NOTE: Type is stored in the functions instead of on this.state
    return (
      <StyledHexagon
        {...{ ...this.props.css, backgroundColor }}
        style={this.props.style}
        onClick={(event) => this.handleChange(event, type)}
        onMouseOver={(event) => this.handleHover(event, type)}
        onMouseDown={(event) => this.handleChange(event, type)}
      />
    );
  }
}

export default Hexagon;
