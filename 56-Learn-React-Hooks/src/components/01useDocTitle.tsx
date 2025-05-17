import * as React from "react";
import useDocumentTitle from "../hooks/01useDocumentTitle";

export default function HookApp() {
  const [count, setCount] = React.useState(0);
  useDocumentTitle(`Clicked ${count} times.`);

  const handleClick = () => setCount(count + 1);


  return (
    <section>
      <h1>useDocumentTitle</h1>
      <button className="primary" onClick={handleClick}>
        Increment Count: {count}
      </button>

      <p>
        You won't be able to see the changes if you're in a sandbox environment.
        Instead, you'll want to open up the app{" "}
        <a
          className="link"
          href="https://codesandbox.io/s/usedocumenttitle-challenge-qqt4zt?file=/src/useDocumentTitle.js"
          target="_blank"
          rel="noreferrer"
        >
          in a new tab and paste your code into it.
        </a>
        .
      </p>
    </section>
  );
}
