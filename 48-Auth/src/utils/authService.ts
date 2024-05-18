import * as moment from "moment";

const login = (response: any) => {
  const expiresAt = moment().add(response.expiresIn);
  localStorage.setItem("token", response.token);
  localStorage.setItem("expiresAt", JSON.stringify(expiresAt.valueOf()));
};

const signout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiresAt");
};

const isLoggedIn = () => {
  return moment().isBefore(getExpireAt());
};

const isLoggedOut = () => {
  return !isLoggedIn();
};

const getExpireAt = () => {
  const expiresAt = JSON.parse(localStorage.getItem("expiresAt")!);
  return moment(expiresAt);
};
