import { CheckOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { FaLink, FaListUl, FaQuestion } from "react-icons/fa";
import { HiTemplate } from "react-icons/hi";
import { MdOutlineCampaign, MdOutlineRadioButtonChecked } from "react-icons/md";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SideBarMenu = () => {
  const { collapsed, colorBgContainer, setCollapsed, borderRadiusLG } =
    useAuth();

  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { key: "/", icon: <MdOutlineCampaign />, label: "Campaigns" },
    { key: "/template", icon: <HiTemplate />, label: "Campaign Template" },
    { key: "/select", icon: <FaQuestion />, label: "CQ Questions" },
    { key: "/list", icon: <FaListUl />, label: "List" },
    { key: "/url-generator", icon: <FaLink />, label: "Url Generator" },
    { key: "/email-template", icon: <MdOutlineRadioButtonChecked />, label: "Email Template" },
    { key: "/radio", icon: <MdOutlineRadioButtonChecked />, label: "Radio" },
    { key: "/checkbox", icon: <CheckOutlined />, label: "Checkbox" },
  ];

  return (
    <div>
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
      <NavLink
        to="https://atultingre.vercel.app"
        target="_blank"
        className={"hidden md:block"}
      >
        <div className="fixed bottom-0 text-black flex items-center justify-center gap-3 mb-5">
          <div
            className={`bg-white shadow-md ${
              collapsed
                ? "p-1 ml-4 rounded-full"
                : "flex gap-2 ml-1.5 items-center px-2 py-2 rounded-md"
            }`}
          >
            <img
              src="./Atul.jpg"
              alt="logo"
              width={collapsed ? 40 : 40}
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
    </div>
  );
};

export default SideBarMenu;
