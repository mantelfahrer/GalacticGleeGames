export type User = {
  userID: string;
  username: string;
  name: string;
  emailAddress: string;
  role: string;
};

export type UserToLogin = {
  username: string;
  password: string;
};

export type UserToRegister = UserToLogin & {
  name: string;
  emailAddress: string;
};
