import React, { useState, useRef } from "react";
import { Layout, Menu, Button } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  GithubOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import "./toolbar.css";
import "antd/dist/antd.css";
import Canvas from "../Canvas/canvas";
import { router } from "../Algorithms/base";
import HexagonGridManager from "../HexagonGrid/hexagonGridManager";
import { useSelector } from "react-redux";
import store, { Store } from "../redux/store";
import { dispatchResetAnimation } from "../redux/dispatchers";
import {
  dispatchNewSelected,
  dispatchNewAlgorithm,
} from "../redux/dispatchers";
import { Overlay } from "react-bootstrap";
import maze from "../assets/maze.svg";
import Paragraph from "antd/lib/typography/Paragraph";

const { SubMenu } = Menu;
const { Sider, Header } = Layout;

const Toolbar = () => {
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

  const [displayPlayback, setDisplayPlayback] = useState(false);

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
          <Menu.Item
            key="playback"
            style={{ ...headerStyle, position: "relative", float: "left" }}
          >
            Playback Controls
          </Menu.Item>
          <Menu.Item
            key="phone"
            style={{
              ...headerStyle,
              position: "absolute",
              top: 0,
              right: 160,
              height: `${headerHeight}px`,
            }}
          >
            <Paragraph style={{ color: "#a6adac" }} copyable>
              +44 (0)7956-731633
            </Paragraph>
          </Menu.Item>
          <Menu.Item
            key="github"
            style={{
              display: "flex",
              alignItems: "center",
              float: "right",
              position: "absolute",
              top: 0,
              right: 80,
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
          <Menu mode="inline" style={{ height: "100vh" }}>
            <SubMenu
              key="sub1"
              icon={<UserOutlined />}
              title="Required"
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
                Start
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => dispatchNewSelected("goal")}
                style={{
                  color: goal.length === 0 ? "red" : undefined,
                }}
              >
                Goal
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Optional">
              <Menu.Item key="3" onClick={() => dispatchNewSelected("wall")}>
                Wall
              </Menu.Item>
              <Menu.Item key="4" onClick={() => dispatchNewSelected("space")}>
                Space
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              icon={<NotificationOutlined />}
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
                  const gridSize = store.getState().gridSize;
                  const hexagonStates = store.getState().fullHexagonStates;
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
        <Canvas
          Component={HexagonGridManager}
          {...{
            siderWidth,
            headerHeight,
          }}
        />
      </Layout>
    </Layout>
  );
};

export default Toolbar;
