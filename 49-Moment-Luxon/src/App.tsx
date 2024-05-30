import * as React from "react";
import "./css/styles.css";
import styles from "./css/styles.module.css";

import { DateTime, Duration } from "luxon";

const App = () => {
  const now = DateTime.now();
  const dur = Duration.fromObject({ minutes: 1200 });
  console.log(now);
  console.log(dur.as("milliseconds"));
  const expiresAt = now.plus(dur);
  console.log(expiresAt);
  const expiration = now < expiresAt ? true : false;
  console.log(expiration);

  return (
    <>
      <h1 className={styles.h1class}>Hello Bella</h1>
    </>
  );
};

export default App;
