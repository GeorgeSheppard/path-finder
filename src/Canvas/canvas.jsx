import React, { useRef, useEffect, useState } from "react";

/**
 * Helper component that sends the size of the window it fills to the child
 * component
 * @param {object} props the child component, and any props to pass to the child
 * component
 */
const Canvas = (props) => {
  const { Component, ...other } = props;

  const ref = useRef(null);
  const [windowSize, setWindowSize] = useState({ height: 0, width: 0 });

  useEffect(() => {
    setWindowSize({
      height: ref.current.offsetHeight,
      width: ref.current.offsetWidth,
    });
  }, []);

  const canvasStyle = {
    overflow: "hidden",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#dddddd",
  };

  return (
    <div ref={ref} style={canvasStyle}>
      <Component {...{ windowSize, ...other }} />
    </div>
  );
};

export default Canvas;
