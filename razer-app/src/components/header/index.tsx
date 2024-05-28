import {
  Navbar,
  Nav,
  Container,
  Dropdown,
  DropdownDivider,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "../../states/auth-state";
import { userState } from "../../states/user-state";
import { useCart } from "../../services/cart-service";
import "./header.scss";

const Header = () => {
  const { isAuthenticated } = useRecoilValue(authState);
  const [, setAuth] = useRecoilState(authState);
  const user = useRecoilValue(userState);
  const { clearCart } = useCart();
  const [, setUser] = useRecoilState(userState);

  const logout = () => {
    setAuth({ isAuthenticated: false, token: null });
    setUser({
      fullName: "",
      email: "",
      role: "",
    });
    clearCart();
  };

  console.log("User Role:", user.role);

  return (
    <Navbar expand="lg" variant="light" className="navbar-custom">
      <Container fluid>
        <Link to={"/"} className="navbar-brand">
          <img src="../images/logo/razer-ths-logo.svg" alt="Razer Logo" />
        </Link>
        {isAuthenticated && (
          <div className="shopping-cart-container">
            <Link to="/cart" className="btn p-0" aria-label="cart">
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
                  <i className="bi bi-person-fill"></i> {user.fullName}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {user.role.name === "SUPER_ADMIN" && (
                    <Nav.Link
                      as={Link}
                      to={"/backoffice/products"}
                      className="navbar-custom__link"
                    >
                      Backoffice
                    </Nav.Link>
                  )}
                  {user.role.name === "USER" && (
                    <Nav.Link
                      as={Link}
                      to={"/user-orders"}
                      className="navbar-custom__link"
                    >
                      Orders
                    </Nav.Link>
                  )}
                  {user.role.name === "USER" && (
                    <Nav.Link
                      as={Link}
                      to={"/wishlist"}
                      className="navbar-custom__link"
                    >
                      Wishlist
                    </Nav.Link>
                  )}
                  <DropdownDivider />
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
