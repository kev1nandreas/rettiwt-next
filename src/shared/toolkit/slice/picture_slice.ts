import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PictureState = {
  Picture: string;
};

const initialState = {
  Picture: "",
} as PictureState;

export const picture = createSlice({
  name: "picture",
  initialState,
  reducers: {
    reset: () => initialState,
    setPicture: (state: PictureState, action: PayloadAction<string>) => {
      const { payload } = action;
      state.Picture = payload !== undefined ? payload : state.Picture;
    },
  },
});

export const { setPicture, reset } = picture.actions;
export default picture.reducer;
