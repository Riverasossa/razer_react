import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Product } from "../../models/product";
import "./card.scss";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Card className="m-2 product-card">
      <div className="image-container">
        <Card.Img alt="product-image" variant="top" src={`/${product.image}`} />
        <i
          className={`bi ${
            isWishlisted ? "bi-bookmark-heart-fill" : "bi-bookmark-heart"
          } heart-icon`}
          onClick={handleWishlistToggle}
        ></i>
      </div>
      <Card.Body>
        <Card.Title id="product-name">{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Link to={`/product-details/${product.productId}`}>
          <Button id="carousel-btn" variant="primary">
            VIEW DETAILS
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
