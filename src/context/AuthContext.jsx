// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { login as loginUser, signup as signupUser } from "../api";
import { theme } from "antd";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("userInfo") || null);
  const [collapsed, setCollapsed] = useState(true);
  const [mobileSideBarOpen, setMobileSideBarOpen] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const login = async (employeeId, password) => {
    const { data } = await loginUser(employeeId, password);
    setUser(data);
  };

  const signup = async (name, employeeId, password) => {
    const { data } = await signupUser(name, employeeId, password);
    setUser(data);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userInfo");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        collapsed,
        setCollapsed,
        colorBgContainer,
        borderRadiusLG,mobileSideBarOpen, setMobileSideBarOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
