import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Dashboard</h2>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/backoffice/products">
          Products
        </Nav.Link>
        <Nav.Link as={Link} to="/backoffice/orders">
          Orders
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
