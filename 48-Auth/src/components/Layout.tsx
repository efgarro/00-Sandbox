import * as React from "react";

import { Link, Outlet } from "react-router-dom";

import AuthStatus from "./AuthStatus";
import LoginForm from "./LoginForm";

function Layout() {
  return (
    <div>
      <AuthStatus />

      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>
      {/* <LoginForm /> */}
      <Outlet />
    </div>
  );
}
export default Layout;
