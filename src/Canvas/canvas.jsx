import React, { useRef, useEffect, useState } from "react";
// import Square from "../Square/square";
import Hexagon from "../Hexagon/hexagon"

/**
 * TODO: Easiest way to create the grid is using the transform property
 * and iterating over 'offset coordinates', should create a mapping from offset
 * coordinate to pixel placement
 * Information on hexagonal coordinates here
 * https://www.redblobgames.com/grids/hexagons/
 */
const Canvas = (props) => {
	const ref = useRef(null);
	const width = 50;
	const spacing = 5;
	const [windowSize, setWindowSize] = useState({height: 0, width: 0})
	
	useEffect(() => {
		console.log('width', ref.current.offsetWidth, ref.current.offsetHeight);
		setWindowSize({
			height: ref.current.offsetHeight,
			width: ref.current.offsetWidth
		})
	}, []);

	const grid = createGrid(windowSize, width, spacing);

	const style = {
		overflow: "hidden",
		height: "100vh",
		width: "100vw"
	}

	return (
		<div ref={ref} style={style}>
			{grid && grid.map(coord => {
				const hexProps = {
					width,
					x: coord[0],
					y: coord[1],
					spacing
				}
		
				return <Hexagon key={`${coord[0]}:${coord[1]}`} {...hexProps} />
			})}
		</div>
	)
};

const createGrid = (windowSize, width, spacing) => {
	console.log('windowSize', windowSize, 'width', width);

	if (windowSize.height !== 0 && windowSize.width !== 0) {
		const sizeX = Math.floor(windowSize.width/ (width + spacing));
		const sizeY = Math.floor(windowSize.height/( 2 * Math.sqrt(3) / 3 * width));

		const coords = [];

		for (let i = 0; i < sizeX; i++) {
			for (let j = 0; j < sizeY; j++) {
				coords.push([i, j]);
			}
		}

		return coords;
	}
}

export default Canvas;
