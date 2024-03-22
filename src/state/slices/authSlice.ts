import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/User";
import { apiSlice } from "./apiSlice";

export interface AuthState {
  user?: User;
  token?: string;
}

const initialState: AuthState = {
  user: undefined,
  token: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_CREDENTIALS: (
      state,
      action: PayloadAction<{ token?: string; user?: User }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    LOG_OUT: (state) => {
      state.user = undefined;
      state.token = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.loginUser.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
    );
  },
});

export const { SET_CREDENTIALS, LOG_OUT } = authSlice.actions;

export default authSlice.reducer;
