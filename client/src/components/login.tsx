import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Row, Col, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { getLocalUser, setLocalUser, setTokens } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { FormValues } from "../utils/types";
import { authApi } from "../utils/helpers";
import { useEffect } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<FormValues, "confirmpassword">>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      authApi
        .login(data)
        .then((response) => {
          if (response?.data?.user) {
            setLocalUser(response?.data?.user);
            setTokens(response?.data?.tokens);
            navigate("/todos");
          }
        })
        .then(() => navigate("/todos"))
        .catch((error) => {
          console.log("Login error", error);
        });
    } catch (error) {
      console.log("Login error", error);
    }
  };

  useEffect(() => {
    const user = getLocalUser();
    if (user && user?.userId) {
      navigate("/todos");
      return;
    }
  }, [])

  return (
    <Container
      className="p-4 border shadow p-3 mb-5 bg-body-tertiary rounded"
      style={{ backgroundColor: "white", minWidth: "400px", maxWidth: "60%" }}
    >
      <Row>
        <Col>
          <p className="text-dark text-center mb-3 fs-4">Signin to Todos</p>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter username"
                {...register("username", {
                  required: "Username is required",
                })}
                style={{ padding: "14px 12px" }}
              />
              {errors.username && (
                <Form.Text className="text-danger text-start">
                  {errors?.username.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-4">
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                })}
                style={{ padding: "14px 12px" }}
              />
              {errors.password && (
                <Form.Text className="text-danger text-start">
                  {errors.password.message}
                </Form.Text>
              )}
            </Form.Group>

            <Stack
              direction="horizontal"
              className="align-tems-center justify-content-between mb-3"
            >
              <Button
                variant="primary"
                type="submit"
                className="w-100"
                style={{ padding: "14px 12px" }}
              >
                Login
              </Button>
            </Stack>
            <Stack>
              <Form.Text className="text-dark text-center">
                Not registered?{"  "}
                <Link to="/register" className="link-primary">
                  Signup
                </Link>
              </Form.Text>
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
