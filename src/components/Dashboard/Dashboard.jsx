import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SideBar from "./SideBar";
import MobileSideBar from "./MobileSideBar";
import TopBar from "./TopBar";

const { Header, Sider, Content } = Layout;

const Dashboard = ({ children }) => {
  const { collapsed, colorBgContainer, setCollapsed, borderRadiusLG } =
    useAuth();

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Layout>
      <div className="hidden md:block">
        <SideBar />
      </div>

      <div className="block md:hidden">
        <MobileSideBar />
      </div>
      <Layout
        className={`${!collapsed ? "ml-0" : "ml-0"} ${
          !collapsed ? "md:ml-[200px]" : "md:ml-[80px]"
        } `}
      >
        {/* <Header
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
        </Header> */}
        <TopBar/>
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
