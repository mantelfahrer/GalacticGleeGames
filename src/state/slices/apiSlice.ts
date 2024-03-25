import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Thread } from "../../models/Thread";
import { RootState } from "../store";
import { LOG_OUT, SET_CREDENTIALS } from "./authSlice";
import { User, UserToLogin, UserToRegister } from "../../models/User";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/users/refresh", api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = (api.getState() as RootState).auth.user;
      // store new token
      api.dispatch(SET_CREDENTIALS({ ...refreshResult.data, user }));
      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(LOG_OUT());
    }
  }
  return result;
};

export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // AUTH
    registerUser: builder.mutation<void, UserToRegister>({
      query: () => "/users/signup",
    }),
    loginUser: builder.mutation<
      { token: string; user: User },
      UserToLogin
    >({
      query: ({ ...user }) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),
    // THREADS
    getThreads: builder.query<Thread[], void>({
      query: () => "/threads",
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useGetThreadsQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
} = apiSlice;
