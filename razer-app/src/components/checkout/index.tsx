import { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import ShippingForm from "../shipping-form";
import PaymentForm from "../payment-form";
import CartSummary from "../cart-summary";
import { useOrderService } from "../../services/order-service";
import { ShippingData } from "../../models/shipping";
import { PaymentData } from "../../models/payment";
import "./checkout.scss";

const Checkout = () => {
  const [key, setKey] = useState<string>("shipping");
  const [shippingData, setShippingData] = useState<ShippingData | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const { createOrder } = useOrderService();

  const handleShippingNext = (data: ShippingData) => {
    setShippingData(data);
    setKey("payment");
  };

  const handlePaymentNext = (data: PaymentData) => {
    if (!shippingData) {
      console.error("Shipping data is missing");
      return;
    }

    setPaymentData(data);

    const orderData = {
      address: shippingData.address,
      address2: shippingData.address2,
      province: shippingData.province,
      canton: shippingData.canton,
      district: shippingData.district,
      zipCode: shippingData.zipCode,
      creditCard: {
        cardNumber: data.cardNumber,
        cardHolderName: data.cardHolderName,
        expirationDate: data.expirationDate,
        cvv: data.cvv,
      },
    };

    createOrder(orderData)
      .then(() => {})
      .catch((error) => {});
  };

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <Tabs
          id="checkout-tabs"
          activeKey={key}
          onSelect={(k) => setKey(k as string)}
        >
          <Tab eventKey="shipping" title="Shipping">
            <ShippingForm onNext={handleShippingNext} />
          </Tab>
          <Tab eventKey="payment" title="Payment" disabled={!shippingData}>
            <PaymentForm onNext={handlePaymentNext} />
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
