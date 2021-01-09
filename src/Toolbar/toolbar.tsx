import React from "react";
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
import HexagonGridManager from "../HexagonGrid/hexagonGridManager";
import { useSelector } from "react-redux";
import store, { Store } from "../redux/store";
import { dispatchResetAnimation } from "../redux/dispatchers";
import {
  dispatchNewSelected,
  dispatchNewAlgorithm,
} from "../redux/dispatchers";

const { SubMenu } = Menu;
const { Sider } = Layout;

const Toolbar = () => {
  const siderWidth: number = 200;

  const goal = useSelector((state: Store) => state.fullHexagonStates.goal);
  const start = useSelector((state: Store) => state.fullHexagonStates.start);
  const animated = useSelector(
    (state: Store) => state.fullHexagonStates.animated.length !== 0
  );
  const algorithm = useSelector((state: Store) => state.algorithm);

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
          }}
        />
      </Layout>
    </Layout>
  );
};

export default Toolbar;
