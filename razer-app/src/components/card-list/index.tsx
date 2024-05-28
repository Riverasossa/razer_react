import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../../models/product";
import { useCart } from "../../services/cart-service";
import { useAuth } from "../../services/auth-service";

import "./card-list.scss";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart, cart } = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleAddToCart = () => {
    if (!product) {
      console.log("Product is empty");
      return;
    }

    if (!auth.isAuthenticated) {
      navigate("/login");
      return;
    }

    const isInCart = cart[product.productId] !== undefined;

    if (isInCart) {
      setModalMessage("The product is already in the cart.");
    } else {
      addToCart(product.productId);
      setModalMessage("Product added to cart!");
    }

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Card id="list-card" className="product-card">
      <Card.Img
        id="list-card-img"
        variant="top"
        src={product.image}
        className="product-image"
        alt="product-image"
      />
      <Card.Body id="list-card-body" className="d-flex flex-column">
        <div>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>${product.price}</Card.Text>
        </div>
        <div className="card-btn-container">
          <Link to={`/product-details/${product.productId}`}>
            <Button variant="primary">VIEW DETAILS</Button>
          </Link>
          <Button id="card-btn" variant="primary" onClick={handleAddToCart}>
            ADD TO CART
          </Button>
        </div>
      </Card.Body>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
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
            CLOSE
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default ProductCard;
