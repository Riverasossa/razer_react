import React, { useState, ChangeEvent } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../services/auth-service";
import { useNavigate } from "react-router-dom";
import "./signup.scss";

const Signup: React.FC = () => {
  const { signup, login } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const hasNumber = /\d/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLength = password.length >= 8;

    return hasNumber && hasLowercase && hasUppercase && hasLength;
  };

  const handleSignup = async () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError(
        "Password must contain at least one number, one lowercase and one uppercase letter, and be at least 8 characters long"
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    try {
      await signup(formData);
      await login({
        email: formData.email,
        fullName: formData.fullName,
        password: formData.password,
      });
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(
          error.message || "Error signing up or logging in. Please try again."
        );
      } else {
        setError("Error signing up or logging in. Please try again.");
      }
    }
  };

  return (
    <div className="login-background">
      <div className="login-card">
        <h2 className="login-card__title">Sign Up</h2>
        <Form>
          <Form.Group controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
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

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          {error && <Alert variant="danger">{error}</Alert>}

          <Button id="login-card-btn" variant="primary" onClick={handleSignup}>
            Sign Up
          </Button>
        </Form>
        <p className="login-card__text">
          Already have an account?{" "}
          <span className="login-card__link" onClick={() => navigate("/login")}>
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
