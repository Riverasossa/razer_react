import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Product } from "../../models/product";
import { useCart } from "../../services/cart-service";
import "./card-list.scss";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!product) {
      console.log("Product is empty");
      return;
    }

    addToCart(product);
    alert("Product added to cart!");
    navigate("/cart");
  };

  return (
    <Card id="list-card" className="product-card">
      <Card.Img
        id="list-card-img"
        variant="top"
        src={product.image}
        className="product-image"
      />
      <Card.Body id="list-card-body" className="d-flex flex-column">
        <div>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.summary}</Card.Text>
          <Card.Text>${product.price}</Card.Text>
        </div>
        <div className="card-btn-container">
          <Link to={`/product-details/${product.id}`}>
            <Button variant="primary">VIEW DETAILS</Button>
          </Link>
          <Button id="card-btn" variant="primary" onClick={handleAddToCart}>
            ADD TO CART
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
