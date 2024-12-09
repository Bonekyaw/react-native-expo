import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/config";
import * as SecureStore from "expo-secure-store";

interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
  randToken: string;
}

export const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs, // args can be a URL string or an object with more options
  unknown, // success type of the response
  FetchBaseQueryError // error type
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers) => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Content-Type", "application/json");
      }
      return headers;
    },
  });

  let result = await baseQuery(args, api, extraOptions);
  // console.log("RTK query--", result.data);

  if (result.error && result.error.status === 401) {
    // response.status == 401 && res.error === "Error_AccessTokenExpired"
    console.log("Access token expired, attempting to refresh...", result);
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    const randToken = await SecureStore.getItemAsync("randToken");

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "refresh-token",
          method: "POST",
          body: JSON.stringify({
            refreshToken: refreshToken,
            randToken: randToken,
          }),
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const data = refreshResult.data as RefreshTokenResponse;
        console.log("Refresh response data -----", data);

        await SecureStore.setItemAsync("token", data.token);
        await SecureStore.setItemAsync("refreshToken", data.refreshToken);
        await SecureStore.setItemAsync("randToken", data.randToken);

        // Retry the original query
        result = await baseQuery(args, api, extraOptions);
      } else {
        //api.dispatch(logout()); // Logout logic
        console.log("RTK query error 1");
      }
    } else {
      //api.dispatch(logout());
      console.log("RTK query error 2");
    }
  }

  return result;
};
