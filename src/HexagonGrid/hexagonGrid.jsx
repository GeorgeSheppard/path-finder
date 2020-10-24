import React from "react";
import Hexagon, { hexagonStylingProps } from "../Hexagon/hexagon";

const HexagonGrid = (props) => {
    const { width = 50, borderWidth = 5, spacing = 5,
    backgroundColor = "#64C7CC" } = props

    const createGrid = (windowSize, width, spacing, borderWidth) => {
        if (windowSize.height !== 0 && windowSize.width !== 0) {
            const horizontalSpacing = width + spacing + 2 * borderWidth;
            const sizeX = Math.floor((windowSize.width - width) / horizontalSpacing);
            const spaceX = windowSize.width - (sizeX * horizontalSpacing + width);
            
            const verticalSpacing = Math.sqrt(3) / 2 * (spacing + width)
            const sizeY = Math.floor((windowSize.height - Math.sqrt(3) / 3 * width) / verticalSpacing);
            const spaceY = windowSize.height - (sizeY * verticalSpacing + Math.sqrt(3) / 3 * width)
            
            const coords = [];
            
            for (let i = 0; i < sizeX; i++) {
                for (let j = 0; j < sizeY; j++) {
                    coords.push([i, j]);
                }
            }
            
            return { coords, spaceX, spaceY }
        }
    }

    // TODO: To centralise grid of hexagons properly need to make sure this returns exactly
    // the right spacing, can then update other maths to account for it
    const coordToPixels = (x, y, spacing, width) => {
        let pixelsX = (width + spacing) * x;
        let pixelsY = (width * Math.sqrt(3) / 2 + spacing * Math.sqrt(3) / 2) * y;
        if (y % 2 === 1) {
            pixelsX += width / 2 + spacing / 2
        }
    
        return { pixelsX, pixelsY }
    }

    console.log(props.windowSize, width, spacing, borderWidth)
    const gridProps = createGrid(props.windowSize, width, spacing, borderWidth)
    const hexagonProps = hexagonStylingProps({ width, borderWidth, backgroundColor });

    return (<div>
        {gridProps && gridProps.coords.map(coord => {
            const [x, y] = coord;

            const transform = coordToPixels(x, y, spacing, width);

            const { spaceX, spaceY } = gridProps;
            console.log(spaceX, spaceY);
            
            const style = {
                transform: `translate(${transform.pixelsX}px, ${transform.pixelsY}px)`
            }
            
            return <Hexagon key={`${coord[0]}:${coord[1]}`} style={style} {...hexagonProps} />
        })}
    </div>)
}

export default HexagonGrid;