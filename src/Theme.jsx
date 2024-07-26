import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ee8e3b',
      // main: '#832d14',
    },
    secondary: {
      main: '#44b0cc',
    },
  },  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily:'poppins, sans-serif',
  },

});