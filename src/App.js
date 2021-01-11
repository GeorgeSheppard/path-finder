import React, { useState } from "react";
import Page from "./Toolbar/toolbar";
import { dispatchNewMouseState } from "./redux/dispatchers";
import Tour from "reactour";

const steps = [
  {
    selector: '[data-tut="reactour-main"]',
    content:
      "Welcome to Path Finder! The goal of this website is simple, to help you visualise how computers solve mazes.",
  },
  {
    selector: '[data-tut="reactour-canvas"]',
    content:
      "This is the main canvas, drag over or click on the tiles to create a maze to solve!",
  },
  {
    selector: '[data-tut="reactour-sider"]',
    content:
      "Here is the sider, this lets you select: what type of tile you want to place, how the computer solves the maze, and to make it a bit easier there are some already created mazes for you to try!",
  },
  {
    selector: '[data-tut="reactour-tiles"]',
    content:
      "Here are the tiles you can choose from, other than having one start and one end tile, you are free to choose what to do...",
  },
  {
    selector: '[data-tut="reactour-algorithm"]',
    content:
      "There are many methods computers use to solve these sort of tasks, here are the ones you can visualise!",
  },
  {
    selector: '[data-tut="reactour-visualise"]',
    content:
      "Once your maze has everything it needs, you can click this button to watch the maze being solved.",
  },
  {
    selector: '[data-tut="reactour-reset"]',
    content:
      "After you've watched the animation, feel free to reset the animated tiles so you can create another maze!",
  },
  {
    selector: '[data-tut="reactour-main"]',
    content:
      "I hope you find this website useful, and if you have any feedback please let me know using my contact details in the top right!",
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
