import * as React from "react";
import "../css/styles.css";
// import styles from "./css/styles.module.css";

import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";

import AuthStatus from "./AuthStatus";

import Layout from "./Layout";
import PublicPage from "./PublicPage";
import { LoginPage } from "./LoginPage";
import { RequireAuth } from "./RequiredAuth";
import ProtectedPage from "./ProtectedPage";

import { AuthProvider, useAuth } from "./AuthContext";
import ErrorPage from "./ErrorPage";

export default function Dashboard() {
  const auth = useAuth();

  return (
    <React.Fragment>
      <h1>Auth Example</h1>

      <p>
        This example demonstrates a simple login flow with three pages: a public
        page, a protected page, and a login page. In order to see the protected
        page, you must first login. Pretty standard stuff.
      </p>

      <p>
        First, visit the public page. Then, visit the protected page. You're not
        yet logged in, so you are redirected to the login page. After you login,
        you are redirected back to the protected page.
      </p>

      <p>
        Notice the URL change each time. If you click the back button at this
        point, would you expect to go back to the login page? No! You're already
        logged in. Try it out, and you'll see you go back to the page you
        visited just *before* logging in, the public page.
      </p>
      <AuthStatus />

      <ul>
        <li>
          <Link to="/public">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>
      <Outlet />
    </React.Fragment>
  );
}
