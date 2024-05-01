import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Product } from "../../models/product"; // Importa el modelo Product
import "./card.scss";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Card className="m-2">
      <Card.Img variant="top" src={`/${product.image}`} />
      <Card.Body>
        <Card.Title id="product-name">{product.name}</Card.Title>
        <Card.Text>{product.summary}</Card.Text>
        <Link to={`/product-details/${product.id}`}>
          <Button variant="primary">VIEW DETAILS</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
