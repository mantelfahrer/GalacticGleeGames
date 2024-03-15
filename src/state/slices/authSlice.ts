import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, UserToLogin } from "../../models/User";

export interface AuthState {
  user?: User;
  loading: boolean;
  error: boolean;
}

const initialState: AuthState = {
  user: undefined,
  loading: false,
  error: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGIN_USER_REQUEST: (state, action: PayloadAction<UserToLogin>) => {
      state.loading = true;
    },
    LOGIN_USER_SUCCESS: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = false;
    },
    LOGIN_USER_FAILURE: (state) => {
      state.user = undefined;
      state.loading = false;
      state.error = true;
    },
  },
});

export const { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } =
  authSlice.actions;

export default authSlice.reducer;