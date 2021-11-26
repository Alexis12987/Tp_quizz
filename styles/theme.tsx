import { createTheme } from "@material-ui/core/styles";
import { Colors } from "../src/common/Constant";
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: Colors.black,
    },
    secondary: {
      main: Colors.white,
    },
    error: {
      main: Colors.redError,
    },
  },
  typography: {
    fontFamily: [
      "Epilogue",
      "Arial",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

export default theme;
