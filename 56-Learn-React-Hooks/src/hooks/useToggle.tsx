import * as React from "react";

export default function useToggle(initialValue: boolean) {
  const [on, setOn] = React.useState(() => {
    return initialValue;
  });

  const handleToggle = React.useCallback(() => {
    setOn((v) => !v);
  }, []);

  return [on, handleToggle] as const

}
