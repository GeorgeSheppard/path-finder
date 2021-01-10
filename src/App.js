import React, { useState } from "react";
import Page from "./Toolbar/toolbar";
import { dispatchNewMouseState } from "./redux/dispatchers";
import Tour from "reactour";

const steps = [
  {
    selector: '[data-tut="reactour-header"]',
    content: "Here is the header",
  },
  {
    selector: '[data-tut="reactour-sider"]',
    content: "Here is the sider",
  },
  {
    selector: '[data-tut="reactour-visualise"]',
    content: "Here is the visualise button",
  },
  {
    selector: '[data-tut="reactour-reset"]',
    content: "Here is the reset button",
  },
  {
    selector: '[data-tut="reactour-tiles"]',
    content: "Here is the tiles dropdown",
  },
  {
    selector: '[data-tut="reactour-mazes"]',
    content: "Here is the tiles dropdown",
  },
  {
    selector: '[data-tut="reactour-algorithm"]',
    content: "Here is the tiles dropdown",
  },
  {
    selector: '[data-tut="reactour-canvas"]',
    content: "Here is the main canvas",
  },
];

const App = () => {
  const [isTourOpen, setIsTourOpen] = useState(false);

  const handleMouseDown = (state) => {
    return (event) => {
      if (event.button === 0) {
        dispatchNewMouseState(state);
      }
    };
  };

  return (
    <div onMouseDown={handleMouseDown(true)} onMouseUp={handleMouseDown(false)}>
      <Page setIsTourOpen={setIsTourOpen} />
      <Tour
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={() => setIsTourOpen(false)}
        disableInteration={true}
        maskSpace={15}
      />
    </div>
  );
};

export default App;
