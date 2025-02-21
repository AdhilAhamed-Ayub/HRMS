import React, { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      setUser(res.data);
      if (res.data.role === "admin") {
        navigate("/AdminDashboard"); // Redirect to Admin Dashboard
      } else if (res.data.role === "employee") {
        navigate("/EmployeeDashboard"); // Redirect to Employee Dashboard
      }
    } catch (error) {
      console.error("Login error:", error.response?.data);
      alert("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/"); // Redirect to home page
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
