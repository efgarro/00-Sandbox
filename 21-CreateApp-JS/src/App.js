import React from "react";

import sty from "./sty.module.css";

console.log(sty);

const App = ({ name }) => {
  return (
    <>
      <h1 className={sty.h1class}>Hello {name}</h1>
    </>
  );
};

export default App;
