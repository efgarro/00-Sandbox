import * as React from "react";
import { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import { openClient } from "../utils/axiosClient";
import { DateTime, Duration } from "luxon";
import * as moment from "moment";
import { IUser, IAuthContext } from "../types/scrTypes";
import { fakeAuthProvider } from "../utils/fakeAuth";
import { string } from "zod";

let AuthContext = React.createContext<IAuthContext>(null!);

let apCtxt = 0;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [expiresAt, setExpiresAt] = React.useState(() => {
    const expiresAtFromLS = localStorage.getItem("expiresAt");
    if (expiresAtFromLS !== null) {
      return DateTime.fromISO(expiresAtFromLS);
    } else {
      return DateTime.now().minus(Duration.fromObject({ minutes: 1 }));
    }
  });
  const [isAuth, setIsAuth] = React.useState(() => {
    const expiresAtFromLS = localStorage.getItem("expiresAt");
    if (expiresAtFromLS !== null) {
      return DateTime.now() < DateTime.fromISO(expiresAtFromLS) ? true : false;
    } else {
      return false;
    }
    // DateTime.now() < expiresAt ? true : false;
  });
  const [unAuthError, setUnAuthError] = React.useState("");

  const registerUser = () => {};

  let login = async (data: IUser, callback: VoidFunction) => {
    setUnAuthError("");
    try {
      const response = await openClient.post("/login", data);
      setIsAuth(true);
      const now = DateTime.now();
      const dur = Duration.fromObject({ minutes: response.data.expiresIn });
      setExpiresAt((now) => now.plus(dur));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("expiresAt", now.plus(dur).toString());

      // const expiresAtFromLS = localStorage
      //   .getItem("expiresAt")
      //   ?.toString() as string;
      // console.log(`expiresAtFromLS ${expiresAtFromLS}`);
      // const expiresAtFromLS = localStorage
      //   .getItem("expiresAt")
      //   ?.toString() as string;
      // console.log(`expiresAtFromLS ${expiresAtFromLS}`);
      // const expiresAtfromLS = localStorage.getItem("expiresAt") as string;
      // console.log(`expiredAtString ${expiresAtfromLS}`);

      // const dateToISOString = new Date(expiresAtfromLS).toISOString();
      // console.log(`dateToISOString ${dateToISOString}`);

      // const expiresAtTwo = DateTime.fromISO(expiresAtFromLS);
      // const expiresAtfromISO = DateTime.fromISO(expiresAtfromLS);
      // const expiresAtfromISO = DateTime.fromISO(
      //   "2024-05-19T14:58:37.621-06:00"
      // );

      // console.log(`expiresAtfromISO ${expiresAtfromISO}`);
      // const expiration = DateTime.now() < expiresAtfromISO ? true : false;
      // console.log(expiration);
      callback();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data === "Unauthorized") {
          setUnAuthError("Invalid email or password");
          //   navigate("/login");
        }
      }
    }
  };

  let signout = (callback: VoidFunction) => {
    setIsAuth(false);
    // setExpiresAt(DateTime.now().minus(Duration.fromObject({ days: 1 })));
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    // isLoggedIn();
    callback();
    // });
  };

  const isLoggedIn = () => {
    // const expiresAt = DateTime.fromISO(
    //   localStorage.getItem("expiresAt") as string
    // );

    // const expiresAtfromLS = localStorage.getItem("expiresAt") as string;
    // const expiresAt = DateTime.fromISO(expiresAtfromLS);
    return DateTime.now() < expiresAt ? true : false;
  };
  // const isLoggedOut = () => {
  //   return !isLoggedIn();
  // };

  // const getExpireAt = () => {
  //   const expiresAt = JSON.parse(localStorage.getItem("expiresAt")!);
  //   return moment(expiresAt);
  // };

  let value = { isAuth, setIsAuth, isLoggedIn, unAuthError, login, signout };
  // if (!isAuth) {
  // Redirect them to the /login page, but save the current location they were
  // trying to go to when they were redirected. This allows us to send them
  // along to that page after they login, which is a nicer user experience
  // than dropping them off on the home page.
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }
  console.log(`AuthCtxt counter ${apCtxt++}`);
  console.log(`AuthCtxt expiresAt ${expiresAt}`);
  console.log(`AuthCtxt isAuth ${isAuth}`);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
