import React, { useRef, useEffect, useState } from "react";

type CanvasProps = {
  Component: Function;
  [key: string]: any;
};

export type WindowSize = {
  height: number;
  width: number;
};

/**
 * Helper component that sends the size of the window it fills to the child
 * component
 * @param {object} props the child component, and any props to pass to the child
 * component
 */
const Canvas = (props: CanvasProps): JSX.Element => {
  const { Component, ...other } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState<WindowSize>({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    setWindowSize({
      height: ref?.current?.offsetHeight ?? 0,
      width: ref?.current?.offsetWidth ?? 0,
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
