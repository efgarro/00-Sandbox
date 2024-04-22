import * as React from "react";
import "./css/styles.css";
import styles from "./css/styles.module.css";
import { AddResta } from "./components/form/AddResta";

const App = () => {
  return (
    <>
      <h1 className={styles.h1class}>Hello React Hook Form</h1>
      <AddResta />
    </>
  );
};

export default App;
