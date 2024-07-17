import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Row, Col, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FormValues } from "../utils/types";
import { authApi } from "../utils/helpers";
import { setLocalUser, setTokens } from "../utils/constants";

const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
      confirmpassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      delete data.confirmpassword;
      const loginResp = await authApi.register(data);
      if (loginResp?.data?.user) {
        setLocalUser(loginResp?.data?.user);
        setTokens(loginResp?.data?.tokens);
        navigate("/todos");
      }
    } catch (error) {
      console.log("Login error", error);
    }
  };

  return (
    <Container
      className="p-4 border shadow p-3 mb-5 bg-body-tertiary rounded"
      style={{ backgroundColor: "white", minWidth: "400px", maxWidth: "60%" }}
    >
      <Row>
        <Row>
          <Col>
            <p className="text-dark text-center mb-3 fs-4">Signup to Todos</p>
          </Col>
        </Row>
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
                  minLength: { value: 4, message: "Username too short" },
                  pattern: {
                    value: /^[a-zA-Z0-9]{5,}$/,
                    message: "Inavlid username"
                  }
                })}
                style={{ padding: "14px 12px", marginBottom: "4px" }}
              />
              {errors.username && (
                <Form.Text className="text-danger text-start">
                  {errors?.username.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^])[A-Za-z\d@$!%*#?&^]{6,}$/,
                      message: "Invalid password",
                    },
                })}
                style={{ padding: "14px 12px" }}
              />
              {errors.password && (
                <Form.Text className="text-danger text-start">
                  {errors.password.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="formConfirmPassword" className="mb-4">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                {...register("confirmpassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match.",
                })}
                style={{ padding: "14px 12px" }}
              />
              {errors.confirmpassword && (
                <Form.Text className="text-danger text-start">
                  {errors.confirmpassword.message}
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
                Register
              </Button>
            </Stack>
            <Stack>
              <Form.Text className="text-dark text-center">
                Already have an account?{"  "}
                <Link to="/login" className="link-primary">
                  Signin
                </Link>
              </Form.Text>
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
