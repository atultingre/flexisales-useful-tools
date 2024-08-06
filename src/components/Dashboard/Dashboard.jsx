import React, { useState } from "react";
import { useLocation, Link, NavLink } from "react-router-dom";
import {
  CheckOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import { Button, Layout, Menu, theme } from "antd";
import { FaListUl, FaQuestion } from "react-icons/fa";

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
          height: "100vh",
          position: "fixed",
          background: "orange",
          color: "black",
          zIndex: 1,
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="my-5 flex justify-center items-center">
          <h1 className="text-xl text-black font-bold">
            {!collapsed ? "Flexisales" : "Flexi"}
          </h1>
        </div>
        <Menu
          theme="transparent"
          mode="inline"
          selectedKeys={[currentPath]}
          style={{ color: "black" }}
        >
          <Menu.Item
            key="/"
            icon={<FaQuestion style={{ fontWeight: "bold" }} />}
            className={currentPath === "/" && "shadow-md"}
            style={{
              background: currentPath === "/" ? "white" : "",
              color: "black",
              fontWeight: currentPath === "/" && "bold",
            }}
          >
            <Link to="/">CQ Questions</Link>
          </Menu.Item>
          <Menu.Item
            key="/List"
            icon={<FaListUl style={{ fontWeight: "bold" }} />}
            className={currentPath === "/list" && "shadow-md"}
            style={{
              background: currentPath === "/List" ? "white" : "",
              color: "black",
              fontWeight: currentPath === "/List" && "bold",
            }}
          >
            <Link to="/List">List</Link>
          </Menu.Item>
          <Menu.Item
            key="/radio"
            icon={
              <MdOutlineRadioButtonChecked style={{ fontWeight: "bold" }} />
            }
            className={currentPath === "/radio" && "shadow-md"}
            style={{
              background: currentPath === "/radio" ? "white" : "",
              color: "black",
              fontWeight: currentPath === "/radio" && "bold",
            }}
          >
            <Link to="/radio">Radio</Link>
          </Menu.Item>
          <Menu.Item
            key="/checkbox"
            icon={<CheckOutlined style={{ fontWeight: "bold" }} />}
            className={currentPath === "/checkbox" && "shadow-md"}
            style={{
              background: currentPath === "/checkbox" ? "white" : "",
              color: "black",
              fontWeight: currentPath === "/checkbox" && "bold",
            }}
          >
            <Link to="/checkbox">Checkbox</Link>
          </Menu.Item>
          <Menu.Item
            key="/url-generator"
            icon={<FaLink style={{ fontWeight: "bold" }} />}
            className={currentPath === "/url-generator" && "shadow-md"}
            style={{
              background: currentPath === "/url-generator" ? "white" : "",
              color: "black",
              fontWeight: currentPath === "/url-generator" && "bold",
            }}
          >
            <Link to="/url-generator">Checkbox</Link>
          </Menu.Item>
          {/* <Menu.Item
            key="/link-opener"
            icon={<FaLink style={{ fontWeight: "bold" }} />}
            className={currentPath === "/link-opener" && "shadow-md"}
            style={{
              background: currentPath === "/link-opener" ? "white" : "",
              color: "black",
              fontWeight: currentPath === "/link-opener" && "bold",
            }}
          >
            <Link to="/link-opener">Link Opener</Link>
          </Menu.Item> */}
        </Menu>
        <NavLink to="https://atultingre.vercel.app" target="_blank">
          <div className="fixed bottom-0 text-black flex items-center  justify-center gap-3 mb-5">
            {!collapsed ? (
              <div className="bg-white shadow-md flex gap-2 ml-1.5 items-center px-2 py-2 rounded-md">
                <div>
                  <img
                    src="./Atul.jpg"
                    alt="logo"
                    width={40}
                    className="rounded-full "
                  />
                </div>
                <div>
                  <h1 className="font-bold text-md">Atul Tingre</h1>
                  <p className="text-[black] font-semibold hover:text-[black]">
                    Software Developer
                  </p>
                  {/* <p className="text-[black] font-semibold hover:text-[black]">
                    Flexisales
                  </p> */}
                  {/* <span className="text-[black] font-semibold hover:text-[black]">
                    Software Engineer
                  </span> */}
                </div>
              </div>
            ) : (
              <div className="bg-white shadow-md p-1 ml-2 rounded-full">
                <img
                  alt="logo"
                  // src="./AtulSquare.jpg"
                  src="./Atul.jpg"
                  width={50}
                  className="rounded-full "
                />
              </div>
            )}
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
