import { configureStore } from "@reduxjs/toolkit";
import tariffsReducer from "./tariffsSlice";

export const store = configureStore({
  reducer: {
    tariffs: tariffsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;