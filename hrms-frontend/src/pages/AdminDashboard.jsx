import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import axios from "axios";
import { deepPurple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: deepPurple,
    secondary: {
      main: "#f50057",
    },
  },
});

const AdminDashboard = () => {
  const { logout, user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    userId: uuidv4(),
    name: "",
    email: "",
    password: "",
    role: "employee",
    phone: "",
    userImage: "",
    status: "active",
  });
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const employeesResponse = await axios.get(
          "http://localhost:5000/api/auth/employees/count",
          {
            headers: { "x-auth-token": user.token },
          }
        );
        setTotalEmployees(employeesResponse.data.count);

        const adminsResponse = await axios.get(
          "http://localhost:5000/api/auth/admins/count",
          {
            headers: { "x-auth-token": user.token },
          }
        );
        setTotalAdmins(adminsResponse.data.count);
      } catch (error) {
        console.error("Error fetching counts:", error.response?.data);
      }
    };
    fetchCounts();
  }, [user.token]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
              <Typography variant="h6">Total Employees</Typography>
              <Typography variant="h4">{totalEmployees}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
              <Typography variant="h6">Total Admins</Typography>
              <Typography variant="h4">{totalAdmins}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default AdminDashboard;
