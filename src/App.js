import React, { useState } from "react";
import Toolbar from "./Toolbar/toolbar";
import { MouseDownContext } from "./Toolbar/Context";

const App = () => {
  const [mouseDown, setMouseDown] = useState(false);

  const handleMouseDown = (state) => {
    return (event) => {
      if (event.button === 0) {
        setMouseDown(state);
      }
    };
  };

  return (
    <div onMouseDown={handleMouseDown(true)} onMouseUp={handleMouseDown(false)}>
      <MouseDownContext.Provider value={mouseDown}>
        <Toolbar />
      </MouseDownContext.Provider>
    </div>
  );
}

export default App;
