import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { openClient } from "../utils/axiosClient";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { IUser } from "../types/scrTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "../types/scrTypes";
import { useAuth } from "./AuthContext";

import { TextField } from "@mui/material";
// import { AxiosError } from "axios";

const LoginForm = () => {
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || "/";

  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(authSchema),
  });

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    auth.login(data, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    });
    // auth.setIsAuth(auth.isLoggedIn());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="email"
            variant="outlined"
            margin="normal"
          />
        )}
      />
      <p>{errors.email?.message}</p>
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="password"
            variant="outlined"
            margin="normal"
          />
        )}
      />
      <p>{errors.password?.message}</p>
      {auth.unAuthError ? <p>{auth.unAuthError}</p> : false}
      <input type="submit" />
    </form>
  );
};

export default LoginForm;
