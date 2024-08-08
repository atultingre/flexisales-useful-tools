import React, { useState } from "react";
import { useLocation, Link, NavLink } from "react-router-dom";
import {
  CheckOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { MdOutlineCampaign, MdOutlineRadioButtonChecked } from "react-icons/md";
import { FaLink, FaListUl, FaQuestion } from "react-icons/fa";
import { HiTemplate } from "react-icons/hi";
import { Button, Layout, Menu, theme } from "antd";

const { Header, Sider, Content } = Layout;

const Dashboard = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { key: "/", icon: <MdOutlineCampaign />, label: "Campaigns" },
    { key: "/template", icon: <HiTemplate />, label: "Campaign Template" },
    { key: "/select", icon: <FaQuestion />, label: "CQ Questions" },
    { key: "/list", icon: <FaListUl />, label: "List" },
    { key: "/url-generator", icon: <FaLink />, label: "Url Generator" },
    { key: "/radio", icon: <MdOutlineRadioButtonChecked />, label: "Radio" },
    { key: "/checkbox", icon: <CheckOutlined />, label: "Checkbox" },
  ];

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        className="h-dvh"
        collapsed={collapsed}
        style={{
          position: "fixed",
          height: "100vh",
          background: "orange",
          zIndex: 1,
        }}
      >
        <div className="my-5 flex justify-center items-center">
          <NavLink to="/">
            <h1 className="text-xl text-black font-bold">
              {collapsed ? "Dev" : "Developer"}
            </h1>
          </NavLink>
        </div>
        <Menu
          theme="transparent"
          mode="inline"
          selectedKeys={[currentPath]}
          className="text-black"
        >
          {menuItems.map(({ key, icon, label }) => (
            <Menu.Item
              key={key}
              icon={React.cloneElement(icon, { style: { fontWeight: "bold" } })}
              className={currentPath === key ? "shadow-md" : ""}
              style={{
                background: currentPath === key ? "white" : "",
                color: "black",
                fontWeight: currentPath === key ? "bold" : "normal",
              }}
            >
              <Link to={key}>{label}</Link>
            </Menu.Item>
          ))}
        </Menu>
        <NavLink to="https://atultingre.vercel.app" target="_blank">
          <div className="fixed bottom-0 text-black flex items-center justify-center gap-3 mb-5">
            <div
              className={`bg-white shadow-md ${
                collapsed
                  ? "p-1 ml-2 rounded-full"
                  : "flex gap-2 ml-1.5 items-center px-2 py-2 rounded-md"
              }`}
            >
              <img
                src="./Atul.jpg"
                alt="logo"
                width={collapsed ? 50 : 40}
                className="rounded-full"
              />
              {!collapsed && (
                <div>
                  <h1 className="font-bold text-md">Atul Tingre</h1>
                  <p className="text-black font-semibold">Software Developer</p>
                </div>
              )}
            </div>
          </div>
        </NavLink>
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            position: "fixed",
            zIndex: 1,
            width: "100%",
            marginLeft: collapsed ? 0 : 0,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
        </Header>
        <Content
          style={{
            margin: "90px 16px 18px",
            minHeight: "82vh",
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
