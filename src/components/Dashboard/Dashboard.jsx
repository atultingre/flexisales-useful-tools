import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";

const { Header, Sider, Content } = Layout;

const Dashboard = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Layout>
      <Sider trigger={null} collapsible className="h-dvh" collapsed={collapsed}>
        <div className="my-5 flex justify-center items-center">
          <h1 className="text-xl text-white">
            {!collapsed ? "Flexisales useful tools" : "Flexi"}
          </h1>
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[currentPath]}>
          <Menu.Item key="/" icon={<UserOutlined />}>
            <Link to="/">CQ Questions</Link>
          </Menu.Item>
          <Menu.Item key="/radio" icon={<VideoCameraOutlined />}>
            <Link to="/radio">Radio</Link>
          </Menu.Item>
          <Menu.Item key="/checkbox" icon={<UploadOutlined />}>
            <Link to="/checkbox">Checkbox</Link>
          </Menu.Item>
          <Menu.Item key="/link-opener" icon={<UploadOutlined />}>
            <Link to="/link-opener">Link opener</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
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
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
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
