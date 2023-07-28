import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
   
      main: "#997379",
    },
    secondary: {
      main: "#FFC0CB",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
