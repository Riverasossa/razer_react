import React, { useState, ChangeEvent } from "react";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import { useAuth } from "../../services/auth-service";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { User } from "../../models/user";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState<User>({
    email: "",
    fullName: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      await login(formData);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "Error logging in. Please try again.");
      } else {
        setError("Error logging in. Please try again.");
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-background">
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title className="modal-bg">Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-bg">
          <p>Welcome Back, {formData.email}!</p>
        </Modal.Body>
        <Modal.Footer className="modal-bg">
          <Button variant="primary" onClick={handleCloseModal}>
            GO TO HOME PAGE
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="login-card">
        <h2 className="login-card__title">Login</h2>
        <Form>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <div className="password-input-container">
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <i
                className={`bi ${
                  showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"
                } password-toggle-icon`}
                onClick={togglePasswordVisibility}
              />
            </div>
          </Form.Group>
          {error && <Alert variant="danger">{error}</Alert>}

          <Button id="login-card-btn" variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Form>
        <p className="login-card__text">
          Don't have an account?{" "}
          <span
            className="login-card__link"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
