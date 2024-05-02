import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { ProductService } from "../../services/product-service";
import { Product } from "../../models/product";
import { useCart } from "../../services/cart-service";
import { useAuth } from "../../services/auth-service"; // Importa el servicio de autenticación
import "./details.scss";

const ProductDetailsPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams<{ id: string }>();
  const { addToCart, cart } = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;

        const products = await ProductService.getProducts();
        const foundProduct = products.find(
          (product) => product.id === parseInt(id)
        );

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.log("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product: ", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) {
      console.log("Product is empty");
      return;
    }

    if (!auth.isAuthenticated) {
      // Verifica si el usuario está autenticado
      navigate("/login"); // Redirige al usuario al inicio de sesión si no está autenticado
      return;
    }

    const isInCart = cart[product.id] !== undefined;

    if (isInCart) {
      setModalMessage("The product is already in the cart.");
    } else {
      addToCart(product);
      setModalMessage("Product added to cart!");
    }

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/cart");
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details-container">
      <div className="img-details-container">
        <img
          src={`/${product.image}`}
          alt="Product Image"
          className="img-fluid"
        />
      </div>

      <div className="info-details-container">
        <h2 id="product-name-details">{product.name}</h2>
        <p>{product.summary}</p>
        <p>
          <strong>Category:</strong> {product.category}
        </p>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>

        <Button id="card-btn" variant="primary" onClick={handleAddToCart}>
          ADD TO CART
        </Button>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMessage}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalMessage === "The product is already in the cart." ? (
            <p>{product.name} is already in your cart.</p>
          ) : (
            <p>{product.name} has been added to your cart.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductDetailsPage;
