
import * as React from 'react';
import sty from "./sty.module.css";


interface Props {
   name:
    string
}

class App extends React.Component<Props> {
  render() {
    const { name } = this.props;
    return (
      <>
        <h1 className={sty.h1class}>
          Hello {name}
        </h1>
      </>
    );
  }
}

export default App;
