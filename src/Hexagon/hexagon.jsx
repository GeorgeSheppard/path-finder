import React from "react";
import styled from "styled-components";

const StyledHexagon = styled.div`
    position: relative;
    width: 300px;
    height: 173.21px;
    background-color: #64C7CC;
    margin: 86.60px 0;
    border-left: solid 5px #333333;
    border-right: solid 5px #333333;
    &:before {
        content: "";
        position: absolute;
        z-index: 1;
        width: 212.13px;
        height: 212.13px;
        transform: scaleY(0.5774) rotate(-45deg);
        background-color: inherit;
        left: 38.9340px;
        top: -106.0660px;
        border-top: solid 7.0711px #333333;
        border-right: solid 7.0711px #333333;
    }
    &:after {
        content: "";
        position: absolute;
        z-index: 1;
        width: 212.13px;
        height: 212.13px;
        transform: scaleY(0.5774) rotate(-45deg);
        background-color: inherit;
        left: 38.9340px;
        bottom: -106.066px;
        border-bottom: solid 7.0711px #333333;
        border-left: solid 7.0711px #333333
    }
`;


const Hexagon = () => {
    return <StyledHexagon />;
}

export default Hexagon;
