import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USER_LOCALSTORAGE_KEY } from "../const/localStorage";
declare const __IS_DEV__: boolean;

const baseUrl = __IS_DEV__
  ? "http://localhost:8000"
  : "https://production-project-server.vercel.app";

export const rtkApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || "";
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
