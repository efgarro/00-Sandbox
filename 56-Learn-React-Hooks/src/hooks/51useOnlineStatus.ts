import * as React from "react";

const subscribe = (callback: () => void) => {
  window.addEventListener("online", callback, { passive: true });
  window.addEventListener("offline", callback, { passive: true });
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
};

export default function useOnlineState() {

  const getSnapshot = () => {
    const isOnline = navigator.onLine
    return isOnline;
  };

  return React.useSyncExternalStore(subscribe, getSnapshot);
}
