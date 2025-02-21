import React from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material"; // Ensures consistent MUI styling
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <CssBaseline /> {/* Ensures consistent Material UI styles */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/AdminDashboard"
          element={
            <ProtectedRoute
              element={<AdminDashboard />}
              allowedRoles={["admin"]}
            />
          }
        />
        <Route
          path="/EmployeeDashboard"
          element={
            <ProtectedRoute
              element={<EmployeeDashboard />}
              allowedRoles={["employee"]}
            />
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
