import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { fetchApi } from "@/api";
import type { User } from "@/types";

interface initialStateType {
  users: User[];
  isFetching: boolean;
}

const initialState: initialStateType = {
  users: [],
  isFetching: false,
};

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    const response = await fetchApi("users");
    if (!response) {
      return rejectWithValue("Network Connection failed. Please try again.");
    }
    if (response.error === "Error_Attack") {
      // Error_Attack - Must Log Out
      return rejectWithValue(response.error);
    }
    if (response.error) {
      return rejectWithValue(response.message);
    }
    return response;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user: User, { rejectWithValue }) => {
    const response = await fetchApi(`users/${user.id}`, "PUT", user);
    if (!response) {
      return rejectWithValue("Network Connection failed. Please try again.");
    }
    if (response.error === "Error_Attack") {
      // Error_Attack - Must Log Out
      return rejectWithValue(response.error);
    }
    if (response.error) {
      return rejectWithValue(response.message);
    }
    return response;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(
      getUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.isFetching = false;
      }
    );
    builder.addCase(getUsers.rejected, (state) => {
      state.isFetching = false;
    });
    builder.addCase(
      updateUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        const { id, name } = action.payload;
        const existingUser = state.users.find((user) => user.id === id);
        if (existingUser) {
          existingUser.name = name;
        }
      }
    );
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
