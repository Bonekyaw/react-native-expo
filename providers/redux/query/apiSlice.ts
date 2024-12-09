import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithRefresh } from "@/providers/redux/query/baseQueryWithRefresh";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefresh, //staggeredBaseQuery,
  tagTypes: ["Users", "Products"],
  endpoints: (builder) => ({}),
});
