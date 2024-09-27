import * as React from "react";
import "./css/styles.css";
import styles from "./css/styles.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PhotoList from "./components/PhotoList";

const App = () => {
  return (
    <>
      <h1 className={styles.h1class}>Hello Bella</h1>
      <DndProvider backend={HTML5Backend}>
        <PhotoList />
      </DndProvider>
    </>
  );
};

export default App;
