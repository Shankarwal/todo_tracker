import { Form, Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import TrashIcon from "../assets/trash.svg";
import EditIcon from "../assets/edit.svg";
import { Link } from "react-router-dom";
import { getStatusString } from "../utils/helpers";
import { removeTodo, updateTodo } from "../store/todo-actions";

const TableRow = ({ id, rowData }: any) => {
  const { title, description, status, _id: todoId } = rowData;
  const dispatch = useDispatch();

  const handleOnStatusChange = async (e: any) => {
    const { checked } = e.target;
    const updatedTodo = {
      title: rowData.title,
      description: rowData.description,
      status: checked ? 2 : 1,
    };

    dispatch(updateTodo(updatedTodo, todoId));
  };

  const handleDelete = () => {
    dispatch(removeTodo(todoId));
  };

  return (
    <tr key={`row-${id}`} style={{ verticalAlign: "middle"}}>
      <td>
        <p style={{ height: "100%" }} className="my-auto">
          {id + 1}
        </p>
      </td>
      <td>
        <p style={{ height: "100%" }} className="my-auto">
          {title}
        </p>
      </td>
      <td style={{ textOverflow: "ellipsis", maxWidth: "200px" }}>
        <p style={{ height: "100%" }} className="my-auto">
          {description}
        </p>
      </td>
      <td>
        <p style={{ height: "100%" }} className="my-auto">
          <span style={{ display: "block", width: "100px" }}>{getStatusString(status)}</span>
        </p>
      </td>
      <td>
        <Stack direction="horizontal" gap={3} className="justify-content-start">
          <Form>
            <Form.Check
              type="checkbox"
              id={`${id}`}
              onChange={handleOnStatusChange}
              checked={status == 2}
            />
          </Form>
          <div className="vr" />
          <button type="button" className="btn btn-link">
            <img src={TrashIcon} onClick={handleDelete} />
          </button>
          <div className="vr" />
          <span>
            <Link to={`/todos/edit/${todoId}`} className="btn btn-link">
              <img src={EditIcon} />
            </Link>
          </span>
        </Stack>
      </td>
    </tr>
  );
};

export default TableRow;
