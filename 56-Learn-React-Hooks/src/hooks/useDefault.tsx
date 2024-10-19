import * as React from "react";

export default function useDefault(initialState: any, defaultState: any) {
  const [state, setState] = React.useState(initialState);

  if (state === null || typeof state === "undefined") {
    return [defaultState, setState];
  }

  return [state, setState];
}
