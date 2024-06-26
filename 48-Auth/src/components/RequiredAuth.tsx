import * as React from "react";

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  // auth.setIsAuth(auth.isLoggedIn());
  let location = useLocation();
  console.log(`is Auth ${auth.isAuth}`);
  console.log(`isLoggedIn ${auth.isLoggedIn()}`);

  if (/* !auth.isLoggedIn()  &&*/ !auth.isAuth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
