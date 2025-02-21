import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const MainLayout = ({ children }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            HRMS Dashboard
          </Typography>
          <Button color="inherit" onClick={() => logout()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 3 }}>{children}</Box>
    </Box>
  );
};

export default MainLayout;
