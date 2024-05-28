import React from "react";
import { Button, Form } from "react-bootstrap";
import { useCart } from "../../services/cart-service";
import "./cart-item.scss";
import { Product } from "../../models/product";

interface CartItemProps {
  product: Product;
  quantity: number;
  subtotal: number;
}

const CartItem: React.FC<CartItemProps> = ({ product, quantity, subtotal }) => {
  const { addToCart, decreaseProductQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      // Implementa la lógica de actualización del carrito aquí
    }
  };

  const incrementQuantity = () => {
    addToCart(product.productId);
  };

  const decrementQuantity = () => {
    decreaseProductQuantity(product.productId);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.productId);
  };

  return (
    <div className="cart-item">
      <img
        src={`/${product.image}`}
        alt="Product Image"
        className="cart-item__image"
      />
      <div className="cart-item__info">
        <h5>{product.name}</h5>
        <p>Price: ${product.price.toFixed(2)}</p>
      </div>
      <div className="cart-item__quantity-controls">
        <Form.Group>
          <Form.Label>Quantity:</Form.Label>
          <div className="quantity-controls">
            <Button
              variant="outline-success"
              onClick={decrementQuantity}
              className="quantity-control"
              disabled={quantity <= 1}
            >
              -
            </Button>
            <input
              aria-label="quantity"
              disabled
              type="text"
              value={quantity}
              onChange={handleQuantityChange}
              className="quantity-input"
            />
            <Button
              variant="outline-success"
              onClick={incrementQuantity}
              className="quantity-control"
            >
              +
            </Button>
          </div>
        </Form.Group>
      </div>
      <div className="cart-item__subtotal">
        Subtotal: ${subtotal.toFixed(2)}
      </div>

      <i
        onClick={handleRemoveFromCart}
        id="cart-icon"
        className="bi bi-trash"
      ></i>
    </div>
  );
};

export default CartItem;
