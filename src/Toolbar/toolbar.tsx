import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import "./toolbar.css";
import "antd/dist/antd.css";
import Canvas from "../Canvas/canvas";
import { router } from "../Algorithms/base";
import { HexagonTypes, HexagonStates } from "../types/dtypes";
import HexagonGridManager from "../HexagonGrid/hexagonGridManager";
import { HexagonGridPropertiesContext } from "./Context";

const { SubMenu } = Menu;
const { Sider } = Layout;

export type GridSize = {
  x: number;
  y: number;
};

const Toolbar = () => {
  const [hexagonStates, setHexagonStates] = useState<HexagonStates>({
    goal: [[7, 3]],
    start: [[4, 5]],
    wall: [
      [8, 2],
      [5, 4],
      [6, 7],
      [5, 5],
      [6, 4],
      [7, 4],
      [6, 5],
      [7, 6],
      [4, 3],
      [4, 2],
      [3, 2],
      [7, 7],
      [8, 6],
      [8, 5],
    ],
  });

  const [gridSize, setGridSize] = useState<GridSize>({
    x: 0,
    y: 0,
  });

  const [selected, setSelected] = useState<HexagonTypes>("wall");
  const siderWidth: number = 200;

  const [algorithm, setAlgorithm] = useState("");

  return (
    <Layout>
      <Layout>
        <Sider width={siderWidth} className="site-layout-background">
          <Menu mode="inline" style={{ height: "100vh" }}>
            <SubMenu
              key="sub1"
              icon={<UserOutlined />}
              title="Required"
              style={{
                color:
                  hexagonStates.start.length === 0 ||
                  hexagonStates.goal.length === 0
                    ? "red"
                    : undefined,
              }}
            >
              <Menu.Item
                key="1"
                onClick={() => setSelected("start")}
                style={{
                  color: hexagonStates.start.length === 0 ? "red" : undefined,
                }}
              >
                Start
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => setSelected("goal")}
                style={{
                  color: hexagonStates.goal.length === 0 ? "red" : undefined,
                }}
              >
                Goal
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Optional">
              <Menu.Item key="3" onClick={() => setSelected("wall")}>
                Wall
              </Menu.Item>
              <Menu.Item key="4" onClick={() => setSelected("space")}>
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
              <Menu.Item key="9" onClick={() => setAlgorithm("dijkstra")}>
                Dijkstra
              </Menu.Item>
              <Menu.Item key="10" onClick={() => setAlgorithm("greedy")}>
                Greedy
              </Menu.Item>
            </SubMenu>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <Button
                type="primary"
                shape="round"
                size={"large"}
                disabled={
                  algorithm.length === 0 ||
                  hexagonStates.goal.length === 0 ||
                  hexagonStates.start.length === 0
                }
                onClick={() =>
                  // TODO: To access gridSize need hexagonGrid not to re-render
                  // whenever props the toolbar re-renders, therefore turn hexagonGrid
                  // into class component and add shouldComponentUpdate function
                  router(algorithm, hexagonStates, gridSize.x, gridSize.y)
                }
              >
                Visualise
              </Button>
            </div>
          </Menu>
        </Sider>
        <HexagonGridPropertiesContext.Provider
          value={{ hexagonStates, setHexagonStates, selected }}
        >
          <Canvas
            Component={HexagonGridManager}
            {...{
              siderWidth,
              setGridSize,
            }}
          />
        </HexagonGridPropertiesContext.Provider>
      </Layout>
    </Layout>
  );
};

export default Toolbar;
