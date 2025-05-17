import * as React from "react";

import "./css/styles.css";
import styles from "./css/styles.module.css";
// import HookApp from "./components/01useDocTitle";
// import HookApp from "./components/02useDefault";
// import HookApp from "./components/03useToggle";
// import HookApp from "./components/04usePreviews";
// import HookApp from "./components/05usePreferredLanguage";
import HookApp from "./components/45Geolocation";
// import HookApp from "./components/49NetworkState";
// import HookApp from "./components/51OnlineState";

const App = () => {
  return (
    <>
      <h1 className={styles.h1class}>Hello Bella</h1>
      <HookApp />
    </>
  );
};

export default App;
