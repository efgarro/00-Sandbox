// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp, forgotPassword } from "./services/authServices";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

const LoginPageChoices = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [isSignUp, setIsSignUp] = useState(false);
  const [activeChoice, setActiveChoice] = useState(1);
  const navigate = useNavigate();

  // type AuthChoices = {
  //   1: string;
  //   2: string;
  //   3: string;
  // };
  const authChoices = {
    1: (
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    ),
    2: (
      <SignUpForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
      />
    ),
    3: <ForgotPasswordForm />,
  }; /* as AuthChoices */

  // const handleSignIn = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   try {
  //     const session = await signIn(email, password);
  //     console.log("Sign in successful", session);
  //     if (session && typeof session.AccessToken !== "undefined") {
  //       sessionStorage.setItem("accessToken", session.AccessToken);
  //       if (sessionStorage.getItem("accessToken")) {
  //         window.location.href = "/home";
  //       } else {
  //         console.error("Session token was not set properly.");
  //       }
  //     } else {
  //       console.error("SignIn session or AccessToken is undefined.");
  //     }
  //   } catch (error) {
  //     alert(`Sign in failed: ${error}`);
  //   }
  // };

  // const handleSignUp = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   if (password !== confirmPassword) {
  //     alert("Passwords do not match");
  //     return;
  //   }
  //   try {
  //     await signUp(email, password);
  //     navigate("/confirm", { state: { email } });
  //   } catch (error) {
  //     alert(`Sign up failed: ${error}`);
  //   }
  // };
  // const handleForgotPassword = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   if (password !== confirmPassword) {
  //     alert("Passwords do not match");
  //     return;
  //   }
  //   try {
  //     await forgotPassword(email);
  //     navigate("/confirm", { state: { email } });
  //   } catch (error) {
  //     alert(`Sign up failed: ${error}`);
  //   }
  // };

  return (
    <React.Fragment>
      <p>{authChoices[activeChoice as keyof typeof authChoices]}</p>

      {activeChoice !== 1 && (
        <button
          onClick={() => {
            setActiveChoice(1);
          }}
        >
          Login
        </button>
      )}

      {activeChoice === 1 && (
        <button
          onClick={() => {
            setActiveChoice(2);
          }}
        >
          Sign Up
        </button>
      )}
      {activeChoice === 1 && (
        <button
          onClick={() => {
            setActiveChoice(3);
          }}
        >
          Forgot Password
        </button>
      )}
    </React.Fragment>
  );
};

export default LoginPageChoices;
