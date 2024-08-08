import { useState } from "react";
import { Drawer } from "antd";
import { useAuth } from "../../context/AuthContext";
import SideBarMenu from "./SideBarMenu";
const MobileSideBar = () => {
  const { mobileSideBarOpen, setMobileSideBarOpen, collapsed } = useAuth();
  const [placement, setPlacement] = useState("top");

  const onClose = () => {
    setMobileSideBarOpen(false);
  };

  return (
    <Drawer
      destroyOnClose
      title={"Developer"}
      placement={placement}
      closable={true}
      onClose={onClose}
      open={mobileSideBarOpen}
      key={placement}
      style={{ height: "150%" }}
    >
      <SideBarMenu />
    </Drawer>
  );
};

export default MobileSideBar;
