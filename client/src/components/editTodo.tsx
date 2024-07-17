import { Form, Button, Container, Row, Col, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Todo } from "../utils/types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTodo, updateTodo } from "../store/todo-actions";

const EditTodo = () => {
  const { todoId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Todo>({
    defaultValues: {
      title: "",
      description: "",
      status: 0,
    },
  });

  const onSubmit = async (data: Omit<Todo, "authorId">) => {
    const formInput = {
      title: data?.title.trim(),
      status: data?.status,
      description: data?.description.trim(),
    };

    dispatch(updateTodo(formInput, todoId!, navigate))
  };

  const init = async () => {
    dispatch(getTodo(todoId!, getTodoSuccess));
  };

  const getTodoSuccess = (data: any) => {
    const { title, description, status } = data;
    setValue("title", title);
    setValue("description", description);
    setValue("status", status);
  };

  useEffect(() => {
    if (todoId) {
      init();
    }
  }, []);

  return (
    <Container
      className="p-4 border shadow p-3 mb-5 bg-body-tertiary rounded"
      style={{ backgroundColor: "white", minWidth: "400px", maxWidth: "70%" }}
    >
      <Row>
        <Col>
          <h5 className="text-dark text-center mb-3">Edit Task</h5>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Control
                type=""
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

            <Form.Group controlId="formStatus" className="mb-3">
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
                // defaultValue={
                //   currentTodo?.status === 0 ? 0 : currentTodo?.status || 0
                // }
              >
                <option value="">Select Status</option>
                <option value={0}>
                  New
                </option>
                <option value={1}>
                  In-Progress
                </option>
                <option value={2}>
                  Complete
                </option>
              </Form.Select>
              {errors?.status && (
                <Form.Text className="text-danger text-start">
                  {errors?.status?.message}
                </Form.Text>
              )}
            </Form.Group>

            <Stack direction="horizontal" gap={3}>
              <Button variant="primary" type="submit">
                Update
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

export default EditTodo;
