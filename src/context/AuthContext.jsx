// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { login as loginUser, signup as signupUser } from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("userInfo") || null);
  console.log('user: ', user);

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
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
