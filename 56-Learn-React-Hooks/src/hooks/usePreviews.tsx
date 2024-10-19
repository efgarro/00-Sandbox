import * as React from "react";

export default function usePrevious(newValue: any) {
  const refValue = React.useRef(newValue);
  const refPrevValue = React.useRef(null);

  if (refValue.current !== newValue) {
    [refPrevValue.current, refValue.current] = [refValue.current, newValue];
  }
  return refPrevValue.current;
}
