// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPageChoices from "./LoginPageChoices";
import HomePage from "./HomePage";
import ConfirmUserPage from "./ConfirmUserPage";
import ConfirmForgotPage from "./ConfirmForgotPage";
// import "./App.css";

const AuthApp = () => {
  const isAuthenticated = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    return !!accessToken;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Navigate replace to="/home" />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route path="/login" element={<LoginPageChoices />} />
        <Route path="/confirm" element={<ConfirmUserPage />} />
        <Route path="/forgotpsw" element={<ConfirmForgotPage />} />
        <Route
          path="/home"
          element={
            isAuthenticated() ? <HomePage /> : <Navigate replace to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AuthApp;
