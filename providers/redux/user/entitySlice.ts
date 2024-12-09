import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/providers/redux/store";
import { fetchApi } from "@/api";
import type { User } from "@/types";

export const getUsersEntity = createAsyncThunk(
  "userEntity/getUsers",
  async (_, { rejectWithValue }) => {
    const response = await fetchApi("users");
    if (!response) {
      return rejectWithValue("Network connection failed. Please try again!");
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

export const updateUserEntity = createAsyncThunk(
  "userEntity/updateUser",
  async (user: User, { rejectWithValue }) => {
    const response = await fetchApi(`users/${user.id}`, "PUT", user);
    if (!response) {
      return rejectWithValue("Network connection failed. Please try again!");
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

export const usersAdapter = createEntityAdapter<User>();

const initialState = usersAdapter.getInitialState({
  loading: false,
  error: false,
});

export const userEntitySlice = createSlice({
  name: "usersEntity",
  initialState,
  reducers: {
    // removeUser: usersAdapter.removeOne,
    updateUser: usersAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersEntity.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      getUsersEntity.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        usersAdapter.setAll(state, action.payload);
        state.error = false;
        state.loading = false;
      }
    );
    builder.addCase(getUsersEntity.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(
      updateUserEntity.fulfilled,
      (state, action: PayloadAction<User>) => {
        usersAdapter.updateOne(state, {
          id: action.payload.id,
          changes: { name: action.payload.name },
        });
      }
    );
  },
});

const reducer = userEntitySlice.reducer;
export default reducer;

export const { updateUser } = userEntitySlice.actions;

export const error = (state: RootState) => state.usersEntity.error;
export const loading = (state: RootState) => state.usersEntity.loading;

export const {
  selectById: selectUserById,
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectTotalUsers,
} = usersAdapter.getSelectors((state: RootState) => state.usersEntity);
