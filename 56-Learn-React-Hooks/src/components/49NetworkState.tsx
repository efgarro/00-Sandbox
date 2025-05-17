import * as React from "react";

import useNetworkState from "../hooks/49useNetworkState";

export default function App() {
  const isOnline = useNetworkState();

  return (
    <section>
      <h1>useNetworkState</h1>
      <p>{`Online: ${isOnline}`}</p>

      {/* <table>
        <tbody>
          {Object.keys(network).map((key) => {
            return (
              <tr key={key} className={key}>
                <th>{key}</th>
                <td>{`${network[key as keyof typeof network]}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </section>
  );
}
