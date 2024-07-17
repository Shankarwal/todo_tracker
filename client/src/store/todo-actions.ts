import { todosApi } from "../utils/helpers";
import { Todo } from "../utils/types";
import { AppDispatch } from "./store";
import {
  addTodoSuccess,
  fetchRequest,
  requestFailed,
  fetchTodosSuccess,
  updateTodoSuccess,
  deleteTodo,
} from "./todo-reducer";

export const fetchTodos = () => {
  return (dispatch: AppDispatch) => {
    dispatch(fetchRequest(true));
    todosApi
      .fetchTodos()
      .then((res) => {
        dispatch(fetchTodosSuccess(res?.data));
      })
      .catch((error) => {
        dispatch(requestFailed(error?.message));
      });
  };
};

export const getTodo = (
  todoId: string,
  successCallback: (data: any) => void
) => {
  return (dispatch: AppDispatch) => {
    dispatch(fetchRequest(true));
    todosApi
      .getTodoById(todoId)
      .then((res) => {
        successCallback(res?.data);
      })
      .catch((error) => {
        dispatch(requestFailed(error?.message));
        console.log("getTodo-error", error);
      });
  };
};

export const addTodo = (data: Todo, navigate: any) => {
  return (dispatch: AppDispatch) => {
    dispatch(fetchRequest(true));
    todosApi
      .addTodo(data)
      .then((res) => {
        dispatch(addTodoSuccess(res?.data));
        navigate("/todos");
      })
      .catch((error) => {
        dispatch(requestFailed(error?.message));
        console.log("addTodo-error", error);
      });
  };
};

export const updateTodo = (
  data: Omit<Todo, "authorId">,
  todoId: string,
  navigate?: any
) => {
  return (dispatch: AppDispatch) => {
    dispatch(fetchRequest(true));
    todosApi
      .updateTodo(data, todoId)
      .then((res) => {
        dispatch(updateTodoSuccess(res?.data));
        if (navigate) {
          navigate("/todos");
        }
      })
      .catch((error) => {
        dispatch(requestFailed(error?.message));
        console.log("updateTodo-error", error);
      });
  };
};

export const removeTodo = (todoId: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(fetchRequest(true));
    todosApi
      .deleteTodo(todoId)
      .then((res) => {
        dispatch(deleteTodo(res?.data?._id));
      })
      .catch((error) => {
        dispatch(requestFailed(error?.message));
        console.log("deleteTodo-error", error);
      });
  };
};
