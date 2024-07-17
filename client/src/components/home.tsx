import { Stack, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getTodosState } from "../store/todo-reducer";
import { useEffect, useState } from "react";
import TodoTable from "./TodoTable";
import {
  getLocalUser,
  removeLocalUser,
  removeTokens,
} from "../utils/constants";
import { PlusCircle } from "react-feather";
import { fetchTodos } from "../store/todo-actions";

const TodosHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { todos } = useSelector(getTodosState);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [filter, setFilter] = useState("-1");

  const init = () => {
    if (!todos.length) {
      dispatch(fetchTodos());
    }
  };

  const logout = () => {
    removeLocalUser();
    removeTokens();
    navigate("/login");
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilter(value);
  };

  useEffect(() => {
    const user = getLocalUser();
    if (!user) {
      logout();
      return;
    }
    init();
  }, []);

  useEffect(() => {
    if (todos) {
      setFilteredTodos(todos);
    }
  }, [todos]);

  return (
    <>
      <Stack
        direction="horizontal"
        className="justify-content-between intro"
        style={{ width: "100%" }}
      >
        <div className="m-0 p-0">
          <p className="block m-0 text-light fw-bold">Your Todos</p>
        </div>
        <div className="tableIntro">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 2,
              }}
            >
              <p className="d-block m-0 ps-0 pe-1 text-light">Filter:{"  "}</p>
              <Form.Group controlId="formPassword" className="p-1">
                <Form.Select onChange={handleSort} size="sm">
                  <option value={-1}>All</option>
                  <option value={0}>New</option>
                  <option value={1}>In-Progress</option>
                  <option value={2}>Complete</option>
                </Form.Select>
              </Form.Group>
            </div>
            <Link to="/todos/addNew" className="link-light btn p-0 addBtn">
              <Button
                variant="primary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <span style={{ display: "block" }}>Add New{"  "}</span>
                <PlusCircle className="plusIcons" />
              </Button>
            </Link>
          </div>
        </div>
      </Stack>
      <TodoTable
        todos={todos}
        filteredTodos={filteredTodos}
        filter={filter}
        setFilteredTodos={setFilteredTodos}
      />
    </>
  );
};

export default TodosHome;
