import * as React from "react";

import "./css/styles.css";
import styles from "./css/styles.module.css";
import HookApp from "./components/05usePreferredLanguage";

const App = () => {
  return (
    <>
      <h1 className={styles.h1class}>Hello Bella</h1>
      <HookApp />
    </>
  );
};

export default App;
