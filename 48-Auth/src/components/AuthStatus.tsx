import * as React from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AuthStatus = () => {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.isLoggedIn) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {"hellow"}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
};

export default AuthStatus;
