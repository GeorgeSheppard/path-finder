import React from "react";
// import Square from "../Square/square";
import Hexagon from "../Hexagon/hexagon"

/**
 * TODO: Easiest way to create the grid is using the transform property
 * and iterating over 'offset coordinates', should create a mapping from offset
 * coordinate to pixel placement
 * Information on hexagonal coordinates here
 * https://www.redblobgames.com/grids/hexagons/
 */

// TODO: Probably best way to create the nice looking hexagon is with an SVG

const Canvas = (props) => {
  return <Hexagon />
};

export default Canvas;
