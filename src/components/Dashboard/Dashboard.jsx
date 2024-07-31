import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  CheckOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import { Button, Layout, Menu, theme } from "antd";
import { FaLink, FaListUl, FaQuestion } from "react-icons/fa";

const { Header, Sider, Content } = Layout;

const Dashboard = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        className="h-dvh"
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100d vh",
          position: "fixed",
          zIndex: 1,
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="my-5 flex justify-center items-center">
          <h1 className="text-xl text-white">
            {!collapsed ? "Flexisales useful tools" : "Flexi"}
          </h1>
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[currentPath]}>
          <Menu.Item key="/" icon={<FaQuestion />}>
            <Link to="/">CQ Questions</Link>
          </Menu.Item>
          <Menu.Item key="/radio" icon={<MdOutlineRadioButtonChecked />}>
            <Link to="/radio">Radio</Link>
          </Menu.Item>
          <Menu.Item key="/checkbox" icon={<CheckOutlined />}>
            <Link to="/checkbox">Checkbox</Link>
          </Menu.Item>
          <Menu.Item key="/List" icon={<FaListUl />}>
            <Link to="/List">List</Link>
          </Menu.Item>
          {/* <Menu.Item key="/link-opener" icon={<FaLink />}>
            <Link to="/link-opener">Link opener</Link>
          </Menu.Item> */}
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            position: "fixed",
            zIndex: 1,
            width: "100vw",
            left: 0,
            top: 0,
            marginLeft: collapsed ? 80 : 200,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "90px 16px 18px 16px",
            minHeight: "82dvh",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
