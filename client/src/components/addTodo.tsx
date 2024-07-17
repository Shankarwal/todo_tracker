import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Row, Col, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Todo } from "../utils/types";
import { useDispatch } from "react-redux";
import { getLocalUser } from "../utils/constants";
import { addTodo } from "../store/todo-actions";

const AddTodo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Todo>({
    defaultValues: {
      title: "",
      description: "",
      status: 0,
    },
  });

  const onSubmit = async (data: Todo) => {
    const user = getLocalUser();
    const formInput = {
      title: data?.title.trim(),
      status: data?.status,
      description: data?.description.trim(),
      authorId: user?.userId,
    };

    dispatch(addTodo(formInput, navigate));
  };

  return (
    <Container
      className="p-4 border shadow p-3 mb-5 bg-body-tertiary rounded"
      style={{ backgroundColor: "white", minWidth: "400px", maxWidth: "70%" }}
    >
      <Row>
        <Col>
          <h5 className="text-dark text-center mb-3">Add New Task</h5>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter title"
                maxLength={100}
                {...register("title", { required: "Title is required" })}
              />
              {errors?.title && (
                <Form.Text className="text-danger text-start">
                  {errors?.title?.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="Enter description"
                maxLength={300}
                {...register("description")}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Select
                {...register("status", { required: "Status is required" })}
                // defaultValue={0}
              >
                <option value="">Select Status</option>
                <option value={0}>New</option>
                <option value={1}>In-Progress</option>
                <option value={2}>Complete</option>
              </Form.Select>
              {errors?.status && (
                <Form.Text className="text-danger text-start">
                  {errors?.status?.message}
                </Form.Text>
              )}
            </Form.Group>

            <Stack direction="horizontal" gap={3}>
              <Button variant="primary" type="submit">
                Create
              </Button>

              <Link to="/todos" className="link-light">
                <Button variant="secondary">Cancel</Button>
              </Link>
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddTodo;

