import * as React from 'react';
import sty from "./sty.module.css";

const App = ({ name } : {name: string}) => {
  return (
    <>
      <h1 className={sty.h1class}>Hello {name}</h1>
    </>
  );
};

export default App;
