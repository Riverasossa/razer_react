import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Product } from "../../models/product";

import "./card-list.scss";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
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
          <Link to={`/product/${product.id}`}>
            <Button id="card-btn" variant="primary">
              ADD TO CART
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
