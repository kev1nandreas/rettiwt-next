import { configureStore } from "@reduxjs/toolkit";
import authorized from "./slice/authorized_slice";
import username from "./slice/username_slice";
import picture from "./slice/picture_slice";

export const store = configureStore({
	reducer: {
		authorized,
		username,
		picture
	},
	devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
