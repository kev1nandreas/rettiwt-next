import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UsernameState = {
  Username: string;
};

const initialState = {
  Username: "",
} as UsernameState;

export const username = createSlice({
  name: "username",
  initialState,
  reducers: {
    reset: () => initialState,
    setUsername: (state: UsernameState, action: PayloadAction<string>) => {
      const { payload } = action;
      state.Username = payload !== undefined ? payload : state.Username;
    },
  },
});

export const { setUsername, reset } = username.actions;
export default username.reducer;
