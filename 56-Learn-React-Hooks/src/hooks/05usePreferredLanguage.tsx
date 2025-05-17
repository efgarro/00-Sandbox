import * as React from "react";

export default function usePreferredLanguage() {
  const getSnapshot = () => {
    return navigator.language;
  };

  const subscribe = React.useCallback((cb: () => void) => {
    window.addEventListener("languagechange", cb);

    return () => {
      window.removeEventListener("languagechange", cb);
    };
  }, []);

  const getServerSnapshot = () => {
    throw Error("usePreferredLanguage is a client-only hook");
  };

  const preferredLan = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  console.log(`language ${preferredLan}`);
  // return "en-US";
  return preferredLan;
}
