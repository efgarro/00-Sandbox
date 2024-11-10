import * as React from "react";

export default function useToggle(initialValue: boolean) {
  const [isOn, setOn] = React.useState(() => {
    return initialValue;
  });

  const handleToggle = React.useCallback(() => {
    setOn((v) => !v);
  }, []);

  return [isOn, handleToggle] as const;
}
