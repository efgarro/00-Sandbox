import { authClient } from "./axiosClient";

export const getUsers = async () => {
  const response = await authClient.get("/users");
  console.log(response);
};
