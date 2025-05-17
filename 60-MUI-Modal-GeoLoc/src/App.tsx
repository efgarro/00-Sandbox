import * as React from "react";
import "./css/styles.css";
import styles from "./css/styles.module.css";
import GeoLocForm from "./components/GeoLocForm";

const App = () => {
  return (
    <>
      <h1 className={styles.h1class}>Hello Bella</h1>
      <GeoLocForm />
    </>
  );
};

export default App;
