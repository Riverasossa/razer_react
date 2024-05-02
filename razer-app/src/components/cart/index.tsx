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
    return (
      <Alert variant="info" className="cart-empty">
        Your cart is empty.
      </Alert>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-container__title">Shopping Cart</h2>
      <div className="cart-container__items">
        {Object.values(cart).map((item) => (
          <CartItem key={item.product.id} product={item.product} />
        ))}
      </div>
      <div className="cart-container__total-price">
        <h4>Total Price: ${totalPrice}</h4>
      </div>
      <div className="cart-container__actions">
        <Button variant="danger" onClick={clearCart}>
          CLEAR CART
        </Button>
        <Link to="/checkout">
          {" "}
          <Button variant="primary">CHECKOUT</Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
