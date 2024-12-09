import { apiSlice } from "@/providers/redux/query/apiSlice";
import type { User } from "@/types";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "users",
      // providesTags: ["Users"],
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Users" as const, id })),
              "Users",
            ]
          : ["Users"],
    }),
    updateUser: builder.mutation<User, User>({
      query: (body) => ({
        url: `users/${body.id}`,
        method: "PUT",
        body,
      }),
      // invalidatesTags: ["Users"],
      // invalidatesTags: (result, error, arg) => [{ type: "Users", id: arg.id }],
      async onQueryStarted({ id, name }, { dispatch, queryFulfilled }) {
        // `updateQueryData` requires the endpoint name and cache key arguments,
        // so it knows which piece of cache state to update
        const patchResult = dispatch(
          // updateQueryData takes three arguments: the name of the endpoint to update, the same cache key value used to identify the specific cached data, and a callback that updates the cached data.
          extendedApiSlice.util.updateQueryData(
            "getUsers",
            undefined,
            (draftUsers) => {
              // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
              const user = draftUsers.find((user) => user.id === id);
              if (user) user.name = name;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetUsersQuery, useUpdateUserMutation } = extendedApiSlice;
