import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import "./toolbar.css";
import "antd/dist/antd.css";
import Canvas from "../Canvas/canvas";
import HexagonGrid from "../HexagonGrid/hexagonGrid";

const { SubMenu } = Menu;
const { Sider } = Layout;

const Toolbar = () => {
	const [hexagonStates, setHexagonStates] = useState({
		goal: [[7, 3]],
		start: [[4, 5]],
		wall: [[8, 2], [5, 4], [6, 7], [5, 5], [6, 4], [7, 4], [6, 5], [7, 6], [4, 3], [4, 2], [3, 2], [7, 7], [8, 6], [8, 5]]
	})
	const [selected, setSelected] = useState('wall')

  return (
    <Layout>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
						mode="inline"
            style={{ height: "100vh" }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="Required" style={{
							color: (hexagonStates.start.length === 0 || hexagonStates.goal.length === 0) && "red"
						}}>
              <Menu.Item key="1" onClick={() => setSelected('start')} style={{
								color: hexagonStates.start.length === 0 && "red"
							}}>Start</Menu.Item>
              <Menu.Item key="2" onClick={() => setSelected('goal')} style={{
								color: hexagonStates.goal.length === 0 && "red"
							}}>Goal</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Optional" >
              <Menu.Item key="3" onClick={() => setSelected('wall')}>Wall</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              icon={<NotificationOutlined />}
              title="Algorithm"
            >
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
            <Canvas Component={HexagonGrid} {...{selected, hexagonStates, setHexagonStates}} />
      </Layout>
    </Layout>
  );
}

export default Toolbar;
