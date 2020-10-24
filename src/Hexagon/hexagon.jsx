import React from "react";
import styled from "styled-components";

const StyledHexagon = styled.div`
    position: relative;
    width: ${props => props.width ? `${props.width}px` : "300px"};
    height: ${props => props.width ? `${(Math.sqrt(3) / 3) * props.width}px` : "173.21px"};
    background-color: #64C7CC;
    margin: ${props => props.width ? `${props.width / 2 * Math.sqrt(3) / 3}px 0` : "86.60px 0"};
    border-left: ${props => props.borderWidth ? `solid ${props.borderWidth}px #333333` : "solid 5px #333333"};
    border-right: ${props => props.borderWidth ? `solid ${props.borderWidth}px #333333` : "solid 5px #333333"};
    &:before {
        content: "";
        position: absolute;
        z-index: 1;
        width: ${props => props.width ? `${props.width / Math.sqrt(2)}px` : "212.13px"};
        height: ${props => props.width ? `${props.width / Math.sqrt(2)}px` : "212.13px"};
        transform: scaleY(0.5774) rotate(-45deg);
        background-color: inherit;
        left: ${props => (props.width && props.borderWidth) ? `${-props.borderWidth - props.width / (Math.sqrt(2) * 2) + props.width / 2 }px` : "38.9340px"};
        top: ${props => props.width ? `${-props.width / (Math.sqrt(2) * 2)}px` : "-106.0660px"};
        border-top: ${props => props.borderWidth ? `solid ${Math.sqrt(2) * props.borderWidth}px #333333` : "7.0711px"};
        border-right: ${props => props.borderWidth ? `solid ${Math.sqrt(2) * props.borderWidth}px #333333` : "7.0711px"};
    }
    &:after {
        content: "";
        position: absolute;
        z-index: 1;
        width: ${props => props.width ? `${props.width / Math.sqrt(2)}px` : "212.13px"};
        height: ${props => props.width ? `${props.width / Math.sqrt(2)}px` : "212.13px"};
        transform: scaleY(0.5774) rotate(-45deg);
        background-color: inherit;
        left: ${props => (props.width && props.borderWidth) ? `${-props.borderWidth - props.width / (Math.sqrt(2) * 2) + props.width / 2 }px` : "38.9340px"};
        bottom: ${props => props.width ? `${-props.width / (Math.sqrt(2) * 2)}px` : "-106.0660px"};
        border-bottom: ${props => props.borderWidth ? `solid ${Math.sqrt(2) * props.borderWidth}px #333333` : "7.0711px"};
        border-left: ${props => props.borderWidth ? `solid ${Math.sqrt(2) * props.borderWidth}px #333333` : "7.0711px"};
    }
`;


const Hexagon = () => {
    const hexagonProps = {
        width: 200,
        borderWidth: 5
    }

    return <StyledHexagon {...hexagonProps} />;
}

export default Hexagon;
