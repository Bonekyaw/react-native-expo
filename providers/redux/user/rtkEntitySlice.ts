import { createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "@/providers/redux/query/apiSlice";
import type { Product } from "@/types";

const productsAdapter = createEntityAdapter<Product>({
  // sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const initialState = productsAdapter.getInitialState();

export const entityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
      extraOptions: { maxRetries: 8 }, // Override
      transformResponse: (response, meta, arg) => {
        // console.log("Fetching All users --------");
        if (!Array.isArray(response)) {
          return productsAdapter.setAll(initialState, []);
        }
        // console.log("Response Products --------", response);
        return productsAdapter.setAll(initialState, response);
      },
      // providesTags: ["Users"],
      providesTags: (result: any, error, arg) => [
        { type: "Products" as const, id: "LIST" },
        ...result.ids.map((id: any) => ({ type: "Products", id } as const)),
      ],
    }),
    updateProduct: builder.mutation<Product, Product>({
      query: (body) => ({
        url: `products/${body.id}`,
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
          entityApiSlice.util.updateQueryData(
            "getProducts",
            "getProducts",
            (draftProducts) => {
              // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
              //   const user = draftUsers.find((user) => user.id === id);
              //   if (user) user.name = name;
              const product = draftProducts.entities[id];
              if (product) product.name = name;
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

export const { useGetProductsQuery, useUpdateProductMutation } = entityApiSlice;
