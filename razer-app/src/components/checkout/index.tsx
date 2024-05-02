import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import ShippingForm from "../shipping-form";
import PaymentForm from "../payment-form";
import CartSummary from "../cart-summary";
import "./checkout.scss";

const Checkout = () => {
  const [key, setKey] = useState("shipping");

  const handleNext = () => {
    setKey("payment");
  };

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <Tabs id="checkout-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
          <Tab eventKey="shipping" title="Shipping">
            <ShippingForm onNext={handleNext} />
          </Tab>
          <Tab eventKey="payment" title="Payment" disabled={key !== "payment"}>
            <PaymentForm />
          </Tab>
        </Tabs>
      </div>
      <div className="cart-summary-container">
        <CartSummary />
      </div>
    </div>
  );
};

export default Checkout;
