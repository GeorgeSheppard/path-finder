import React from "react";
import styled from "styled-components";

// TODO: Cannot find a way to set multiple properties to the same value,
// would be useful for setting border-left and border-right at the same time,
// have tried using , like with &:before &:after but that doesn't work
const StyledHexagon = styled.div`
    position: absolute;
    width: ${props => `${props.middleWidth}px`};
    height: ${props => `${props.middleHeight}px`};
    background-color: ${props => props.backgroundColor};
    margin: ${props => `${props.margin}px`};
    border-left: ${props => borderStyle(props.middleBorderWidth)};
    border-right: ${props => borderStyle(props.middleBorderWidth)};
    &:before, &:after {
        content: "";
        position: absolute;
        z-index: 1;
        width: ${props => `${props.topBotDiameter}px`};
        height: ${props => `${props.topBotDiameter}px`};
        transform: scaleY(0.5774) rotate(-45deg);
        background-color: inherit;
        left: ${props => `${props.left}px`};
    }
    &:before {
        top: ${props => `${props.topBot}px`};
        border-top: ${props => borderStyle(props.topBotBorderWidth)};
        border-right: ${props => borderStyle(props.topBotBorderWidth)};
    }
    &:after {
        bottom: ${props => `${props.topBot}px`};
        border-bottom: ${props => borderStyle(props.topBotBorderWidth)};
        border-left: ${props => borderStyle(props.topBotBorderWidth)};
    }
`;

const borderStyle = (borderWidth) => `solid ${borderWidth}px #333333`

export const hexagonStylingProps = ({ width, borderWidth, backgroundColor }) => {
    return {
        middleWidth: width,
        middleHeight: (Math.sqrt(3) / 3) * width,
        topBotDiameter: width / Math.sqrt(2),
        margin: width * Math.sqrt(3) / 6,
        topBotBorderWidth: borderWidth * Math.sqrt(2),
        middleBorderWidth: borderWidth,
        left: - borderWidth - width / (Math.sqrt(2) * 2) + width / 2,
        topBot: -width / (Math.sqrt(2) * 2),
        backgroundColor
    }
}

const Hexagon = (props) => {
    return <StyledHexagon {...props} style={props.style} />;
}

export default Hexagon;
