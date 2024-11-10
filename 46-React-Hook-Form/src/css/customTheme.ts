import { createTheme } from "@mui/material/styles";



export const customTheme = createTheme({
  palette: {
    primary: {
      main: "#F000D0",
    },
  },
  components: {
    // Name of the component ⚛️
    MuiButtonBase: {
      defaultProps: {
        // The props to apply
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
  typography: {
    fontFamily: "Quicksand, sans-serif",
  },
});
