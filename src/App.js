import React from "react";
import Toolbar from "./Toolbar/toolbar";
import { dispatchNewMouseState } from "./redux/dispatchers";

const App = () => {
  const handleMouseDown = (state) => {
    return (event) => {
      if (event.button === 0) {
        dispatchNewMouseState(state)
      }
    };
  };

  return (
    <div onMouseDown={handleMouseDown(true)} onMouseUp={handleMouseDown(false)}>
        <Toolbar />
    </div>
  );
}

export default App;
