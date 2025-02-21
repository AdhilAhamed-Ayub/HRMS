import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Primary color
    },
    secondary: {
      main: "#dc004e", // Secondary color
    },
    background: {
      default: "#f5f5f5", // Background color
    },
  },
  typography: {
    h5: {
      fontWeight: 600,
    },
  },
});

export default theme;
