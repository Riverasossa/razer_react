import React from "react";
import { Button, Alert } from "react-bootstrap";
import { useCart } from "../../services/cart-service";
import CartItem from "../cart-item";
import "./cart.scss";
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
  const { cart, clearCart } = useCart();

  const totalPrice = Object.values(cart)
    .reduce((total, item) => {
      const price = parseFloat(item.product.price.replace(/[^0-9.]/g, ""));
      return total + price * item.quantity;
    }, 0)
    .toFixed(2);

  if (Object.keys(cart).length === 0) {
    return <Alert variant="info">Your cart is empty.</Alert>;
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {Object.values(cart).map((item) => (
          <CartItem key={item.product.id} product={item.product} />
        ))}
      </div>
      <div className="total-price">
        <h4>Total Price: ${totalPrice}</h4>
      </div>
      <div className="actions">
        <Button variant="danger" onClick={clearCart}>
          Clear Cart
        </Button>
        <Link to="/checkout">
          {" "}
          <Button variant="primary">Checkout</Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
