import React, { useEffect } from "react";
import { Layout, Menu, Button } from "antd";
import {
  GithubOutlined,
  LinkedinOutlined,
  AppstoreAddOutlined,
  CalculatorOutlined,
} from "@ant-design/icons";
import "./toolbar.css";
import "antd/dist/antd.css";
import Canvas from "../Canvas/canvas";
import { router } from "../Algorithms/base";
import HexagonGridManager from "../HexagonGrid/hexagonGridManager";
import { useSelector } from "react-redux";
import store, { Store } from "../redux/store";
import {
  dispatchResetAnimation,
  dispatchPresetGrid,
  dispatchNewGridSize,
} from "../redux/dispatchers";
import {
  dispatchNewSelected,
  dispatchNewAlgorithm,
} from "../redux/dispatchers";
import maze from "../assets/maze.svg";
import Paragraph from "antd/lib/typography/Paragraph";

const { SubMenu } = Menu;
const { Sider, Header } = Layout;

const Toolbar = (props: any) => {
  console.log("toolbar props", props);
  console.log("height", props.windowSize.height - 70);

  const siderWidth: number = 200;
  const headerHeight: number = 70;
  const headerStyle = {
    height: `${headerHeight}px`,
  };

  const goal = useSelector((state: Store) => state.fullHexagonStates.goal);
  const start = useSelector((state: Store) => state.fullHexagonStates.start);
  const animated = useSelector(
    (state: Store) => state.fullHexagonStates.animated.length !== 0
  );
  const algorithm = useSelector((state: Store) => state.algorithm);

  // const [displayPlayback, setDisplayPlayback] = useState(false);

  useEffect(() => {
    dispatchPresetGrid("Default");
  }, []);

  return (
    <Layout>
      <Header
        style={{ ...headerStyle, paddingLeft: "0px", paddingRight: "0px" }}
      >
        <div
          style={{
            width: `${siderWidth}px`,
            paddingLeft: "20px",
            float: "left",
            ...headerStyle,
          }}
        >
          <img src={maze} alt={""} width={"50px"} height={"50px"} />
          <Paragraph
            style={{ color: "#a6adac", float: "right", paddingRight: "30px" }}
          >
            Path Finder
          </Paragraph>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Menu.Item
            key="tutorial"
            style={{ ...headerStyle, position: "absolute", top: 0, left: 0 }}
          >
            Tutorial
          </Menu.Item>
          {/* <Menu.Item
            key="playback"
            style={{ ...headerStyle, position: "relative", float: "left" }}
          >
            Playback Controls
          </Menu.Item> */}
          <Paragraph
            style={{
              ...headerStyle,
              color: "#a6adac",
              position: "absolute",
              top: 0,
              right: 180,
            }}
            copyable
          >
            +44 (0)7956-731633
          </Paragraph>
          {/* </Menu.Item> */}
          <Menu.Item
            key="github"
            style={{
              display: "flex",
              alignItems: "center",
              float: "right",
              position: "absolute",
              top: 0,
              right: 84,
              height: `${headerHeight}px`,
            }}
          >
            <Button
              type="link"
              href={"https://www.github.com/GeorgeSheppard/"}
              style={{
                height: "40px",
                width: "44px",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
            >
              <GithubOutlined
                style={{
                  fontSize: `35px`,
                }}
              />
            </Button>
          </Menu.Item>
          <Menu.Item
            key="linkedin"
            style={{
              display: "flex",
              alignItems: "center",
              float: "right",
              position: "absolute",
              top: 0,
              right: 0,
              height: `${headerHeight}px`,
            }}
          >
            <Button
              type="link"
              href={"https://www.linkedin.com/in/georgesheppard/"}
              style={{
                height: "40px",
                width: "44px",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
            >
              <LinkedinOutlined
                style={{
                  fontSize: `35px`,
                }}
              />
            </Button>
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={siderWidth} className="site-layout-background">
          <Menu
            mode="inline"
            style={{ height: `${props.windowSize.height - headerHeight}px` }}
          >
            <SubMenu
              key="sub1"
              icon={<AppstoreAddOutlined />}
              title="Tiles"
              style={{
                color:
                  start.length === 0 || goal.length === 0 ? "red" : undefined,
              }}
            >
              <Menu.Item
                key="1"
                onClick={() => dispatchNewSelected("start")}
                style={{
                  color: start.length === 0 ? "red" : undefined,
                }}
              >
                {start.length === 0 ? "Start (required)" : "Start"}
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => dispatchNewSelected("goal")}
                style={{
                  color: goal.length === 0 ? "red" : undefined,
                }}
              >
                {goal.length === 0 ? "Goal (required)" : "Goal"}
              </Menu.Item>
              <Menu.Item key="3" onClick={() => dispatchNewSelected("wall")}>
                Wall
              </Menu.Item>
              <Menu.Item key="4" onClick={() => dispatchNewSelected("space")}>
                Space
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              icon={<CalculatorOutlined />}
              title="Algorithm"
              style={{
                color: algorithm.length === 0 ? "red" : undefined,
              }}
            >
              <Menu.Item
                key="9"
                onClick={() => dispatchNewAlgorithm("dijkstra")}
              >
                Dijkstra
              </Menu.Item>
              {/* <Menu.Item
                key="10"
                onClick={() => dispatchNewAlgorithm("greedy")}
              >
                Greedy
              </Menu.Item> */}
            </SubMenu>
            <SubMenu
              key="mazes"
              icon={<CalculatorOutlined />}
              title="Preset Mazes"
            >
              <Menu.Item
                key="Maze 1"
                onClick={() => {
                  dispatchPresetGrid("Default");
                  dispatchNewGridSize();
                }}
              >
                Default
              </Menu.Item>
              <Menu.Item
                key="Maze 2"
                onClick={() => {
                  dispatchPresetGrid("CleanGrid");
                  dispatchNewGridSize();
                }}
              >
                Blank Grid
              </Menu.Item>
              <Menu.Item
                key="Maze 3"
                onClick={() => {
                  dispatchPresetGrid("LongMaze");
                  dispatchNewGridSize();
                }}
              >
                Long Maze
              </Menu.Item>
              <Menu.Item
                key="Maze 4"
                onClick={() => {
                  dispatchPresetGrid("HexagonMaze");
                  dispatchNewGridSize();
                }}
              >
                Hexagon Maze
              </Menu.Item>
              <Menu.Item
                key="Maze 5"
                onClick={() => {
                  dispatchPresetGrid("MaizeMaze");
                  dispatchNewGridSize();
                }}
              >
                Maize Maze
              </Menu.Item>
            </SubMenu>
            <div
              style={{
                // display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
                marginRight: "10px",
                marginLeft: "10px",
              }}
            >
              <Button
                type="primary"
                shape="round"
                size={"large"}
                disabled={
                  algorithm.length === 0 ||
                  goal.length === 0 ||
                  start.length === 0
                }
                onClick={() => {
                  dispatchResetAnimation();
                  const gridSize = store.getState().gridSize;
                  const hexagonStates = store.getState().fullHexagonStates;
                  console.log(
                    JSON.stringify(store.getState().individualHexagonStates)
                  );
                  router(
                    algorithm,
                    hexagonStates,
                    gridSize.sizeX,
                    gridSize.sizeY
                  );
                }}
                block={true}
              >
                Visualise
              </Button>
              <Button
                type="primary"
                shape="round"
                size={"large"}
                disabled={!animated}
                onClick={() => dispatchResetAnimation()}
                style={{
                  marginTop: "20px",
                }}
                block
              >
                Reset
              </Button>
            </div>
          </Menu>
        </Sider>
        <HexagonGridManager
          headerHeight={headerHeight}
          siderWidth={siderWidth}
          windowSize={{
            height: props.windowSize.height,
            width: props.windowSize.width,
          }}
        />
        {/* <Canvas
          Component={HexagonGridManager}
          {...{
            siderWidth,
            headerHeight,
          }}
        /> */}
      </Layout>
    </Layout>
  );
};

const Page = () => {
  return <Canvas Component={Toolbar} />;
};

export default Page;
