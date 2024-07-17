import { createBrowserRouter } from "react-router-dom";
import LoginForm from "./login";
import RegisterForm from "./register";
import Layout from "./layout";
import AddTodo from "./addTodo";
import EditTodo from "./editTodo";
import TodosHome from "./home";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
      {
        path: "/todos",
        element: <TodosHome />,
      },
      {
        path: "/todos/addNew",
        element: <AddTodo />,
      },
      {
        path: "todos/edit/:todoId",
        element: <EditTodo />,
      },
      {
        path: "/",
        element: <LoginForm />,
      },
      {
        path: "/*",
        element: <LoginForm />,
      },
    ],
  }
]);

export default Router;
