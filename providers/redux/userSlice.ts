import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  user: { id: number; name: string; email: string; company: { name: string } };
}

const initialState: CounterState = {
  user: { id: 1, name: "", email: "", company: { name: "" } },
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // Other reducers go here
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
