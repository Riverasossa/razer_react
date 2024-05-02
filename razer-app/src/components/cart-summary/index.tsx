import React from "react";
import { useCart } from "../../services/cart-service";
import "./cart-summary.scss";

const CartSummary = () => {
  const { cart } = useCart();

  // Función para calcular el subtotal de un producto
  const calculateSubtotal = (quantity, price) => {
    return quantity * parseFloat(price.replace(/[^0-9.]/g, ""));
  };

  // Calcular el total general del carrito
  const total = Object.values(cart)
    .reduce(
      (acc, item) => acc + calculateSubtotal(item.quantity, item.product.price),
      0
    )
    .toFixed(2);

  return (
    <div className="cart-summary">
      <h3>Cart Summary</h3>
      <div className="product-list">
        {Object.values(cart).map((item) => (
          <div key={item.product.id} className="product-item">
            <div className="product-info">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="product-image"
              />
              <div>
                <h5>{item.product.name}</h5>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
            <div className="product-subtotal">
              ${calculateSubtotal(item.quantity, item.product.price).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      <div className="total">
        <h5>Total: ${total}</h5>
      </div>
    </div>
  );
};

export default CartSummary;
