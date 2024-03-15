import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Thread } from "../../models/Thread";

export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (builder) => ({
    // The `getThreads` endpoint is a "query" operation that returns data
    getThreads: builder.query<Thread[], void>({
      query: () => "/threads",
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetThreadsQuery } = apiSlice;
