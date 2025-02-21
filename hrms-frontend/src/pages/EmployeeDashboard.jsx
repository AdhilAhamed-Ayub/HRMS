import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Button } from "@mui/material"; // Importing Material UI Button

const EmployeeDashboard = () => {
  return (
    <MainLayout>
      <div className="container mt-5">
        <h2>Welcome, Employee!</h2>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          View Profile
        </Button>
      </div>
    </MainLayout>
  );
};

export default EmployeeDashboard;
