import todoReducer from "./todo-reducer";
import { configureStore, Store } from "@reduxjs/toolkit";

const store: Store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
