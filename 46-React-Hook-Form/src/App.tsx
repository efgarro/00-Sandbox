import * as React from "react";
import "./css/styles.css";
import styles from "./css/styles.module.css";
import { PlaceRegistration } from "./components/form/PlaceRegistration";
import { ThemeProvider } from "@mui/material/styles";
import { customTheme } from "./css/customTheme";
import { PhoneInput } from "react-international-phone";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#F000D0",
//     },
//   },
//   components: {
//     // Name of the component ⚛️
//     MuiButtonBase: {
//       defaultProps: {
//         // The props to apply
//         disableRipple: true, // No more ripple, on the whole application 💣!
//       },
//     },
//   },
//   typography: {
//     fontFamily: "Quicksand, sans-serif",
//   },
// });

const App = () => {
  const [phone, setPhone] = React.useState("");
  return (
    <ThemeProvider theme={customTheme}>
      <div className="layout_wrapper">
        {/* <h1 className={styles.h1class}>Hello React Hook Form</h1> */}
        <PlaceRegistration />
      </div>
    </ThemeProvider>
  );
};

export default App;
