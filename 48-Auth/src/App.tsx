import * as React from "react";
import "./css/styles.css";
import styles from "./css/styles.module.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import PublicPage from "./components/PublicPage";
import { LoginPage } from "./components/LoginPage";
import { RequireAuth } from "./components/RequiredAuth";
import ProtectedPage from "./components/ProtectedPage";

import { AuthProvider, useAuth } from "./components/AuthContext";
import { getUsers } from "./utils/routeHandlers";
import ErrorPage from "./components/ErrorPage";

export default function App() {
  const auth = useAuth();

  // React.useEffect(() => {
  //   getUsers();
  // });

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/error" element={<ErrorPage />} />

          <Route element={<Layout />}>
            <Route path="/" element={<PublicPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/protected"
              element={
                <RequireAuth>
                  <ProtectedPage />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
