import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
} from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password); // Calls API from AuthContext
  };

  return (
    <Container maxWidth="sm">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Paper elevation={5} sx={{ padding: 4 }}>
            <Typography variant="h5" align="center" gutterBottom>
              HRMS Login
            </Typography>
            <form onSubmit={handleLogin}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Login
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
