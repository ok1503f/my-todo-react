import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/api/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      navigate("home"); // Redirect to home page
      Swal.fire({
        title: "Success",
        text: "Login successful",
        icon: "success",
        showCloseButton: true,
        timer: 2000,
      });
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        title: "Error",
        text: "invlaid email or password",
        icon: "error",
        showCloseButton: true,
      });
    }
  };

  const handleRegisterClick = () => {
    // Redirect to register page
    navigate("register");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="card p-4">
            <h2 className="mb-4 text-center">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <ButtonGroup className="d-sm-flex gap-2">
                <Button variant="primary" type="submit" className="rounded">
                  Login
                </Button>
                <Button
                  variant="primary"
                  type="button"
                  className="rounded"
                  onClick={handleRegisterClick}
                >
                  Register
                </Button>
              </ButtonGroup>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
