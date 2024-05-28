import React, { useEffect } from "react";
import { useCart } from "../../services/cart-service";
import "./cart-summary.scss";

const CartSummary = () => {
  const { cart, fetchCart } = useCart();
  const shippingCost = 9.99;

  useEffect(() => {
    fetchCart();
  }, []);

  const calculateSubtotal = (quantity: number, price: number) => {
    return quantity * price;
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (acc, item) => acc + calculateSubtotal(item.quantity, item.product.price),
      0
    );
    const iva = subtotal * 0.13;
    const total = subtotal + iva + shippingCost;
    return {
      subtotal: subtotal.toFixed(2),
      iva: iva.toFixed(2),
      shipping: shippingCost.toFixed(2),
      total: total.toFixed(2),
    };
  };

  const { subtotal, iva, shipping, total } = calculateTotal();

  return (
    <div className="cart-summary">
      <h3>Cart Summary</h3>
      <div className="product-list">
        {cart.map((item) => (
          <div key={item.shoppingCartProductId} className="product-item">
            <div className="product-info">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="cart-image"
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
      <div className="totals">
        <div className="subtotal">Subtotal: ${subtotal}</div>
        <div className="iva">IVA (13%): ${iva}</div>
        <div className="iva">Shipping: ${shipping}</div>
        <div className="total">Total: ${total}</div>
      </div>
    </div>
  );
};

export default CartSummary;
