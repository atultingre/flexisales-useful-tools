import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { useAuth } from "../../context/AuthContext";

const { Header } = Layout;

const TopBar = () => {
  const { collapsed, setCollapsed, setMobileSideBarOpen, colorBgContainer } =
    useAuth();

  const toggleSidebar = () => {
    if (window.innerWidth >= 768) {
      setCollapsed(!collapsed);
    } else {
      setMobileSideBarOpen(true);
    }
  };

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        position: "fixed",
        zIndex: 100,
        left: 0,
        top: 0,
      }}
      className={`w-full flex items-center transition-all duration-300 ${
        !collapsed ? "ml-0" : "ml-0"
      } ${!collapsed ? "md:ml-[200px]" : "md:ml-[80px]"} `}
    >
      <div className="flex items-center justify-between px-4 py-2 md:px-6 md:py-3">
        <Button
          type="text"
          icon={!collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleSidebar}
          style={{
            fontSize: "16px",
            width: 48,
            height: 48,
          }}
        />
        <h1 className="block md:hidden text-xl text-black font-bold">
          {!collapsed ? "Dev" : "Developer"}
        </h1>
      </div>
    </Header>
  );
};

export default TopBar;
