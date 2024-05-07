import React from "react";
import { Button, Form } from "react-bootstrap";
import { useCart } from "../../services/cart-service";
import "./cart-item.scss";
import { Product } from "../../models/product";

const CartItem: React.FC<{ product: Product }> = ({ product }) => {
  const { updateCartItem, removeFromCart } = useCart();
  const { cart } = useCart();
  const item = cart[product.id];
  const quantity = item?.quantity || 0;
  const subtotal =
    (item?.quantity || 0) * parseFloat(product.price.replace(",", ""));

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      updateCartItem(product.id, value);
    }
  };

  const incrementQuantity = () => {
    updateCartItem(product.id, quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      updateCartItem(product.id, quantity - 1);
    }
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
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
        <p>Price: ${product.price}</p>
      </div>
      <div className="cart-item__quantity-controls">
        <Form.Group>
          <Form.Label>Quantity:</Form.Label>
          <div className="quantity-controls">
            <Button
              variant="outline-success"
              onClick={decrementQuantity}
              className="quantity-control"
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
