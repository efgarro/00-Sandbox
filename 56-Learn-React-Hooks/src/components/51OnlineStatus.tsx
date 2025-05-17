import * as React from "react";

import useOnlineStatus from "../hooks/51useOnlineStatus";

export default function App() {
  const isOnline = useOnlineStatus();

  return (
    <section>
      <h1>useOnlineStatus</h1>
      <p>{`Online: ${isOnline}`}</p>
    </section>
  );
}
