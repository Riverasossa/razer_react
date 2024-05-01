import React from "react";
import { Button, Form } from "react-bootstrap";
import { useCart } from "../../services/cart-service";
import "./cart-item.scss";
import { Product } from "../../models/product";

const CartItem: React.FC<{ product: Product }> = ({ product }) => {
  const { updateCartItem, removeFromCart } = useCart();
  const { cart } = useCart();
  const quantity = cart[product.id]?.quantity || 0;

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

  const removeProduct = () => {
    removeFromCart(product.id); // Agrega la función para eliminar el producto del carrito
  };

  return (
    <div className="cart-item">
      <div>
        <h5>{product.name}</h5>
        <p>Price: ${product.price}</p>
      </div>
      <div>
        <Form.Group>
          <Form.Label>Quantity:</Form.Label>
          <div className="quantity-controls">
            <Button
              variant="outline-primary"
              onClick={decrementQuantity}
              className="quantity-control"
            >
              -
            </Button>
            <input
              disabled
              type="text"
              value={quantity}
              onChange={handleQuantityChange}
              className="quantity-input"
            />
            <Button
              variant="outline-primary"
              onClick={incrementQuantity}
              className="quantity-control"
            >
              +
            </Button>

            <i
              onClick={removeProduct}
              id="cart-icon"
              className="bi bi-trash"
            ></i>
          </div>
        </Form.Group>
      </div>
    </div>
  );
};

export default CartItem;
