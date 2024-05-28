import { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { authState } from "../../states/auth-state";
import { ProductService } from "../../services/product-service";
import { Product } from "../../models/product";
import "./admin-products.scss";

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await ProductService.getProducts();
      setProducts(products);
    };

    fetchProducts();
  }, []);

  const handleDelete = (id: number) => {
    setSelectedProductId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (selectedProductId !== null) {
      await ProductService.deleteProduct(selectedProductId, auth.token);
      setProducts(
        products.filter((product) => product.productId !== selectedProductId)
      );
      setShowModal(false);
      setSelectedProductId(null);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectedProductId(null);
  };

  return (
    <div>
      <div className="table-header">
        <h1 className="table-title">Products</h1>
        <Button
          id="header-btn"
          variant="primary"
          className="mb-3"
          onClick={() => navigate("/backoffice/products/add")}
        >
          + Add Product
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>
                <a
                  className="product-name"
                  onClick={() =>
                    navigate(`/product-details/${product.productId}`)
                  }
                >
                  {product.name}
                </a>
              </td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>
                <i
                  className="bi bi-pencil-fill me-2"
                  onClick={() =>
                    navigate(`/backoffice/products/edit/${product.productId}`)
                  }
                ></i>
                <i
                  className="bi bi-trash-fill"
                  onClick={() => handleDelete(product.productId)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminProducts;
