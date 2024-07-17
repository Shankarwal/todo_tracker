import { PayloadAction, createSlice, Slice, Reducer } from "@reduxjs/toolkit";
import { RootState } from "./store";
import "immer";

export interface TodoState {
  todos: any[];
  loading: Boolean;
  error: String;
}

const initialState = {
  todos: [],
  loading: false,
  error: "",
} as TodoState;

const todoSlice: Slice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    fetchRequest: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    fetchTodosSuccess: (state, action: PayloadAction<any>) => {
      state.todos = action.payload;
      state.loading = false;
    },
    requestFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    addTodoSuccess: (state, action: PayloadAction<any>) => {
      state.todos = [...state.todos, action.payload];
      state.loading = false;
    },
    updateTodoSuccess: (state, action: PayloadAction<any>) => {
      state.todos = state.todos.map((todo: any) => {
        if (todo._id === action.payload._id) {
          todo = {
            ...todo,
            ...action.payload,
          };
        }
        return todo;
      });
      state.loading = false;
    },
    addUpdateTodoFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTodo: (state, action: PayloadAction<any>) => {
      state.todos = state.todos.filter(
        (todo: any) => todo._id !== action.payload
      );
      state.loading = false;
    },
  },
});

export const getTodosState = (state: RootState) => state.todo;
export const {
  fetchRequest,
  fetchTodosSuccess,
  requestFailed,
  addTodoSuccess,
  updateTodoSuccess,
  deleteTodo,
} = todoSlice.actions;
const todoReducer: Reducer = todoSlice.reducer;
export default todoReducer;
