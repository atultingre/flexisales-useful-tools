import { Layout } from "antd";
import { useAuth } from "../../context/AuthContext";

import { NavLink } from "react-router-dom";
import SideBarMenu from "./SideBarMenu";

const { Sider } = Layout;

const SideBar = () => {
  const { collapsed } = useAuth();


  return (
    <div>
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
              {collapsed ? "Dev" : "Developers Tool"}
            </h1>
          </NavLink>
        </div>

        <SideBarMenu collapsed={collapsed}/>
      </Sider>
    </div>
  );
};

export default SideBar;
