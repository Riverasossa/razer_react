import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../../models/product";
import { useCart } from "../../services/cart-service";
import { useAuth } from "../../services/auth-service";
import { useWishlist } from "../../services/wishlist-service";
import { useRecoilState } from "recoil";
import { wishlistState, WishlistItem } from "../../states/wishlist-state";

import "./card-list.scss";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart, cart } = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlist] = useRecoilState(wishlistState);
  const { addToWishlist, removeFromWishlist, fetchWishlist } = useWishlist();

  useEffect(() => {
    // revisa si existe el producto en la wishlist
    const item: WishlistItem | undefined = Object.values(wishlist).find(
      (item) => item.product.productId === product.productId
    );
    setIsWishlisted(!!item); // fillea el corazon o lo vacia
  }, [wishlist, product.productId]);

  const handleWishlistToggle = async () => {
    if (isWishlisted) {
      await removeFromWishlist(product.productId);
    } else {
      await addToWishlist(product.productId);
    }
    // actualiza la lista de wishlist
    fetchWishlist();
  };
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
      <div className="image-container">
        <Card.Img alt="product-image" variant="top" src={`${product.image}`} />
        <i
          className={`bi ${
            isWishlisted ? "bi-bookmark-heart-fill" : "bi-bookmark-heart"
          } heart-icon`}
          onClick={handleWishlistToggle}
        ></i>
      </div>
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
