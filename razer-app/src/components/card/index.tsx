import React from "react";
import { Card, Button } from "react-bootstrap";
import { Product } from "../../models/product"; // Importa el modelo Product
import "./card.scss";

// Usa el modelo Product como tipo para el prop product
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Card className="m-2">
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Card.Title id="product-name">{product.name}</Card.Title>
        <Card.Text>{product.summary}</Card.Text>
        <Button id="carousel-btn">VIEW DETAILS</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
