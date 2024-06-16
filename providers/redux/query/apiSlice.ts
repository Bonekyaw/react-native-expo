import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["users"], // Declare a tag type to group related queries/mutations
  endpoints: (builder) => ({
    getList: builder.query({
      query: (param) => param,
      // query: (id) => `user/${id}`,
      // query: (id) => ({ url: `users/${id}` }),
      // query: () => ({
      //     url: "users",
      //     // method: "Get",
      //     // headers: {
      //     //   accept: "application/json",
      //     //   Authorization: "Bearer " + token,
      //     // },
      //   }),
      providesTags: ["users"], // associate the result of this mutation with the "users" tag
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: "users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["users"], // invalidate all queries/mutations with the "users" tag when this mutation is executed
    }),
  }),
});

export const { useGetListQuery, useCreateUserMutation } = api;
