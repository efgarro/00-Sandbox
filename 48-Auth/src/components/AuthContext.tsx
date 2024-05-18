import * as React from "react";
import { AxiosError } from "axios";
import { openClient } from "../utils/axiosClient";
import * as moment from "moment";
import { IUser, IAuthContext } from "../types/scrTypes";
import { fakeAuthProvider } from "../utils/fakeAuth";

let AuthContext = React.createContext<IAuthContext>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = React.useState(false);
  const [unAuthError, setUnAuthError] = React.useState("");

  const registerUser = () => {};

  let login = async (data: IUser, callback: VoidFunction) => {
    setUnAuthError("");
    try {
      const response = await openClient.post("/login", data);
      setIsAuth(true);
      const expiresAt = moment().add(response.data.expiresIn);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("expiresAt", JSON.stringify(expiresAt.valueOf()));
      console.log(response.data);
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
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    callback();
    // });
  };

  let value = { isAuth, setIsAuth, unAuthError, login, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
