import * as React from "react";
import "./css/styles.css";
// import styles from "./css/styles.module.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import PublicPage from "./components/PublicPage";
import { LoginPage } from "./components/LoginPage";
import { RequireAuth } from "./components/RequiredAuth";
import ProtectedPage from "./components/ProtectedPage";

import { AuthProvider, useAuth } from "./components/AuthContext";
import { getUsers } from "./utils/routeHandlers";
import ErrorPage from "./components/ErrorPage";
import Dashboard from "./components/Dashboard";

export default function App() {
  const auth = useAuth();

  // React.useEffect(() => {
  //   getUsers();
  // });

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          >
            <Route index element={<p>Default Index Content</p>} />
            <Route path="/public" element={<PublicPage />} />
            <Route path="/protected" element={<ProtectedPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
