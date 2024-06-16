import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import userReducer from "./userSlice";
import { api } from "./query/apiSlice";

// If you don't use RTK query, store will be like this. So simple!

// export const store = configureStore({
//   reducer: {
//     users: userReducer,
//   },
// });

// const rootReducer = combineReducers({
//   [api.reducerPath]: api.reducer,        // for RTK query
//   users: userReducer,                    // for redux store
// });

export const store = configureStore({
  // reducer: rootReducer,
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [api.reducerPath]: api.reducer,
    users: userReducer,
    // Other reducers go here
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
