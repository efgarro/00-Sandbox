export interface IUser {
  email: string;
  password: string;
}


export interface IAuthContext {
    user: any;
    signin: (user: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
  }
  