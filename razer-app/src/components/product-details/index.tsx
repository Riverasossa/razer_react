import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ProductService } from "../../services/product-service";
import { Product } from "../../models/product";
import { useCart } from "../../services/cart-service";
import "./details.scss";

const ProductDetailsPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const navigate = useNavigate();

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

    addToCart(product);
    alert("Product added to cart!");
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
    </div>
  );
};

export default ProductDetailsPage;
