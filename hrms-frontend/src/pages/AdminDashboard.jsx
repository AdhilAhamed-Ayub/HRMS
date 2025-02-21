import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid"; // Generate userId
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Container,
  Grid,
  Paper,
  Box,
} from "@mui/material";
import axios from "axios";

const AdminDashboard = () => {
  const { logout, user } = useContext(AuthContext);
  const [open, setOpen] = useState(false); // State to handle form dialog
  const [userData, setUserData] = useState({
    userId: uuidv4(), // Generate unique userId
    name: "",
    email: "",
    password: "",
    role: "employee",
    phone: "",
    userImage: "",
    address: { street: "", city: "", state: "", zip: "" },
    status: "active",
  });
  const [error, setError] = useState("");
  const [profile, setProfile] = useState({});
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);

  useEffect(() => {
    // Fetch profile details
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: {
              "x-auth-token": user.token,
            },
          }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data);
      }
    };

    // Fetch total number of employees and admins
    const fetchCounts = async () => {
      try {
        const employeesResponse = await axios.get(
          "http://localhost:5000/api/auth/employees/count",
          {
            headers: {
              "x-auth-token": user.token,
            },
          }
        );
        setTotalEmployees(employeesResponse.data.count);

        const adminsResponse = await axios.get(
          "http://localhost:5000/api/auth/admins/count",
          {
            headers: {
              "x-auth-token": user.token,
            },
          }
        );
        setTotalAdmins(adminsResponse.data.count);
      } catch (error) {
        console.error("Error fetching counts:", error.response?.data);
      }
    };

    fetchProfile();
    fetchCounts();
  }, [user.token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setUserData({
        ...userData,
        address: { ...userData.address, [field]: value },
      });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/users", userData, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": user.token, // Include the token in the headers
        },
      });
      alert("User added successfully!");
      setOpen(false); // Close form after submission
      setUserData({
        userId: uuidv4(),
        name: "",
        email: "",
        password: "",
        role: "employee", // Add admin role
        phone: "",
        userImage: "",
        address: { street: "", city: "", state: "", zip: "" },
        status: "active",
      }); // Reset form
    } catch (error) {
      console.error("Error adding user:", error.response?.data);
      setError("Failed to add user. Please try again.");
    }
  };

  return (
    <Container style={{ marginTop: "40px" }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Profile Details */}
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6">Profile Details</Typography>
        <Typography>Name: {profile.name}</Typography>
        <Typography>Email: {profile.email}</Typography>
        <Typography>Role: {profile.role}</Typography>
      </Paper>

      {/* Total Counts */}
      <Grid container spacing={3} style={{ marginBottom: "20px" }}>
        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6">Total Employees</Typography>
            <Typography variant="h4">{totalEmployees}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6">Total Admins</Typography>
            <Typography variant="h4">{totalAdmins}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Add User Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        style={{ marginRight: "10px" }}
      >
        Add User
      </Button>

      {/* Logout Button */}
      <Button variant="contained" color="secondary" onClick={logout}>
        Logout
      </Button>

      {/* Add User Form (Dialog) */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              margin="dense"
              value={userData.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              type="email"
              name="email"
              fullWidth
              margin="dense"
              value={userData.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              fullWidth
              margin="dense"
              value={userData.password}
              onChange={handleChange}
              required
            />
            <Select
              name="role"
              fullWidth
              margin="dense"
              value={userData.role}
              onChange={handleChange}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
            </Select>
            <TextField
              label="Phone"
              name="phone"
              fullWidth
              margin="dense"
              value={userData.phone}
              onChange={handleChange}
            />
            <TextField
              label="User Image URL"
              name="userImage"
              fullWidth
              margin="dense"
              value={userData.userImage}
              onChange={handleChange}
            />

            {/* Address Fields */}
            <Typography variant="h6" style={{ marginTop: "10px" }}>
              Address
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Street"
                  name="address.street"
                  fullWidth
                  margin="dense"
                  value={userData.address.street}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="City"
                  name="address.city"
                  fullWidth
                  margin="dense"
                  value={userData.address.city}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="State"
                  name="address.state"
                  fullWidth
                  margin="dense"
                  value={userData.address.state}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="ZIP Code"
                  name="address.zip"
                  fullWidth
                  margin="dense"
                  value={userData.address.zip}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Select
              name="status"
              fullWidth
              margin="dense"
              value={userData.status}
              onChange={handleChange}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
