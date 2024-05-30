import * as z from "zod";

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  // , {
  //   message:
  //     "Invalid PASSWORD format. Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
  // }),
});

export interface IUser {
  email: string;
  password: string;
}

export interface IAuthContext {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: () => boolean;
  unAuthError: string;
  login: (data: IUser, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}
