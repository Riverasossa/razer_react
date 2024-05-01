import React, { useState } from "react";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import { useAuth } from "../../services/auth-service";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { User } from "../../models/user";

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState<User>({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      await login(formData);
      // Si el login tiene éxito, mostramos el modal
      setShowModal(true);
    } catch (error) {
      setError(error.message || "Error logging in. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="login-background">
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Welcome Back, {formData.username}!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            GO TO HOME PAGE
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="login-card">
        <h2 className="login-card__title">Login</h2>
        <Form>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          {error && <Alert variant="danger">{error}</Alert>}

          <Button id="login-card-btn" variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
