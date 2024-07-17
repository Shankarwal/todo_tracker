import { FormValues, Todo } from "./types";
import axios from "axios";
import instance from "./http-common";

const baseURL = import.meta.env.VITE_BCKEND_URL;

export const authApi = {
  login: (data: Omit<FormValues, "confirmpassword">): Promise<any> => {
    const url = `${baseURL}/auth/login`;
    return axios.post(url, data);
  },
  register: (data: Omit<FormValues, "confirmpassword">): Promise<any> => {
    const url = `${baseURL}/auth/register`;
    console.log("resiter url", url);
    return axios.post(url, data);
  },
};

export const todosApi = {
  fetchTodos: (): Promise<any> => {
    const url = `/todo`;
    return instance.get(url);
  },
  getTodoById: (id: string): Promise<any> => {
    const url = `/todo/${id}`;
    return instance.get(url);
  },
  addTodo: (data: Todo): Promise<any> => {
    const url = `/todo`;
    return instance.post(url, data);
  },
  updateTodo: (data: Omit<Todo, "authorId">, id: any): Promise<any> => {
    const url = `/todo/${id}`;
    return instance.patch(url, data);
  },
  deleteTodo: (id: any): Promise<any> => {
    const url = `/todo/${id}`;
    return instance.delete(url);
  } 
};

export const getStatusString = (status: number) => {
  switch (status) {
    case 0:
      return "New";
    case 1:
      return "In-Progress";
    case 2:
      return "Complete";
    default:
      return "New";
  }
};
