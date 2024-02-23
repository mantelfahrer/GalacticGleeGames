import { LoginFormData } from "./LoginFormData";

export type SignupFormData = LoginFormData & {
  name: string;
  username: string;
};

export const initialSignupFormData: SignupFormData = {
  name: "",
  username: "",
  email: "",
  password: "",
};
