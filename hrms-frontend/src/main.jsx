import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "@mui/material/styles"; // Import ThemeProvider
import theme from "./theme"; // Import custom theme
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // Keep Bootstrap for styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {" "}
      {/* Apply Material UI Theme */}
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
