import React from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "../../states/auth-state";
import { useCart } from "../../services/cart-service";
import "./header.scss";

const Header = () => {
  const { isAuthenticated, user } = useRecoilValue(authState);
  const [, setAuth] = useRecoilState(authState);
  const { clearCart } = useCart();

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null });
    clearCart();
  };

  return (
    <Navbar expand="lg" variant="light" className="navbar-custom">
      <Container fluid>
        <Link to={"/"} className="navbar-brand">
          <img src="../images/logo/razer-ths-logo.svg" alt="Razer Logo" />
        </Link>
        {isAuthenticated && (
          <div className="shopping-cart-container">
            <Link to="/cart" className="btn p-0">
              <i id="cart-icon" className="bi bi-cart3"></i>
            </Link>
          </div>
        )}
        <Navbar.Toggle aria-controls="navbarTogglerDemo03">
          <img src="../images/icons/mobile-menu.svg" alt="Mobile Menu" />
        </Navbar.Toggle>

        <Navbar.Collapse id="navbarTogglerDemo03">
          <Nav className="me-auto mb-2 mb-lg-0">
            <Nav.Link as={Link} to={""} className="navbar-custom__link">
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/products-list"}
              className="navbar-custom__link"
            >
              Products
            </Nav.Link>
          </Nav>
          <Nav>
            {!isAuthenticated ? (
              <Nav.Link
                id="login-link"
                as={Link}
                to={"/login"}
                className="navbar-custom__link"
              >
                Log In
              </Nav.Link>
            ) : (
              <Dropdown>
                <Dropdown.Toggle
                  className="dropdown-btn"
                  variant="dark"
                  id="dropdown-basic"
                >
                  <i className="bi bi-person-fill"></i> {user.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to={"/"} onClick={logout}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
