import React, { useRef, useEffect, useState } from "react";

const Canvas = (props) => {
    const { Component } = props;

    const ref = useRef(null);
    const [windowSize, setWindowSize] = useState({height: 0, width: 0});

    useEffect(() => {
        setWindowSize({
            height: ref.current.offsetHeight,
            width: ref.current.offsetWidth
        })
    }, []);

    const canvasStyle = {
        overflow: "hidden",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#dddddd"
    }

    return (<div ref={ref} style={canvasStyle}>
        <Component {...{windowSize}} />
    </div>);
}

export default Canvas;
