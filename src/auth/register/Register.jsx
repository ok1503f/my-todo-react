import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Corrected hook name

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/register", {
        name,
        email,
        password,
      });
      navigate(-1);
      Swal.fire({
        title: "success",
        text: "Register successful",
        icon: "success",
        showCloseButton: true,
        timer: 2000,
      });
    } catch (error) {
      console.error("Register error:", error);
      Swal.fire({
        title: "error",
        text: "Register failed",
        icon: "error",
        showCloseButton: true,
      });
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="card p-4">
            <h2 className="mb-4 text-center">Register</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
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
              <Button variant="primary" type="submit" className="rounded w-100">
                Register
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
