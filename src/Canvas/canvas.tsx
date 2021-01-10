import React, { createRef } from "react";

type CanvasProps = {
  Component: Function;
  [key: string]: any;
};

export type WindowSize = {
  height: number;
  width: number;
};

type Ref = React.RefObject<HTMLDivElement>;

type CanvasState = {
  ref: Ref;
  windowSize: {
    height: number;
    width: number;
  };
};

/**
 * Helper component that sends the size of the window it fills to the child
 * component
 * @param {object} props the child component, and any props to pass to the child
 * component
 */
class Canvas extends React.Component<CanvasProps, CanvasState> {
  constructor(props: CanvasProps) {
    super(props);

    this.state = {
      ref: createRef(),
      windowSize: {
        height: 0,
        width: 0,
      },
    };
  }

  componentDidMount() {
    const ref: Ref = this.state.ref;
    this.setState({
      windowSize: {
        height: ref.current?.offsetHeight ?? 0,
        width: ref.current?.offsetWidth ?? 0,
      },
    });
  }

  shouldComponentUpdate(nextProps: CanvasProps, nextState: CanvasState) {
    const currentWindow = this.state.windowSize;
    const nextWindow = nextState.windowSize;
    return (
      currentWindow.height !== nextWindow.height ||
      currentWindow.width !== nextWindow.width
    );
  }

  render() {
    const canvasStyle = {
      overflow: "hidden",
      height: "100vh",
      width: "100vw",
      backgroundColor: "#dddddd",
    };

    console.log("windowSize", this.state.windowSize);

    return (
      <div ref={this.state.ref} style={canvasStyle}>
        <this.props.Component
          {...{
            windowSize: this.state.windowSize,
            siderWidth: this.props.siderWidth,
            headerHeight: this.props.headerHeight,
          }}
        />
      </div>
    );
  }
}

export default Canvas;
