import React, { useState } from "react";
import { Form, Button, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PaymentData } from "../../models/payment";
import "./payment-form.scss";

interface PaymentFormProps {
  onNext: (data: PaymentData) => void;
}

interface Errors {
  cardNumber?: string;
  cardHolderName?: string;
  expirationDate?: string;
  cvv?: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onNext }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Permitir solo números en el campo de número de tarjeta
    value = value.replace(/\D/g, "");

    // Limitar la longitud máxima según el tipo de tarjeta
    if (value.startsWith("4")) {
      value = value.slice(0, 16);
    } else if (value.startsWith("5")) {
      value = value.slice(0, 16);
    } else if (value.startsWith("3")) {
      value = value.slice(0, 15);
    }

    // Eliminar espacios en blanco para calcular la longitud del número de tarjeta
    const cardNumberWithoutSpaces = value.replace(/\s/g, "");
    const cardRegex = {
      visa: /^4\d{3}(| |-)(?:\d{4}\1){2}\d{4}$/,
      mastercard: /^5[1-5]\d{2}(| |-)(?:\d{4}\1){2}\d{4}$/,
      amex: /^3[47]\d{1,2}(| |-)\d{6}\1\d{6}$/,
    };
    let type = "";
    if (cardRegex.visa.test(cardNumberWithoutSpaces)) {
      type = "visa";
    } else if (cardRegex.mastercard.test(cardNumberWithoutSpaces)) {
      type = "mastercard";
    } else if (cardRegex.amex.test(cardNumberWithoutSpaces)) {
      type = "amex";
    }
    setCardType(type);

    // Formatear el número de tarjeta según el tipo
    let formattedNumber = cardNumberWithoutSpaces;
    if (type === "amex" && cardNumberWithoutSpaces.length > 4) {
      // Insertar espacios después de 4, 10 y 15 caracteres
      formattedNumber = cardNumberWithoutSpaces
        .replace(/\s+/g, "")
        .replace(/(\d{4})(\d{6})(\d{5})/, "$1 $2 $3 ")
        .trim();
    } else {
      // Insertar espacios después de cada grupo de 4 dígitos
      formattedNumber = cardNumberWithoutSpaces
        .replace(/\s+/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
    }
    setCardNumber(formattedNumber);
  };

  const handleCardHolderNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    // Permitir solo letras y espacios en blanco en el nombre del titular
    setCardHolderName(value.replace(/[^A-Za-z\s]/g, ""));
  };

  const handleExpirationDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    const dateFormat = /^(0[1-9]|1[0-2])\/\d{2}$/;

    // Validar el formato de la fecha
    if (!dateFormat.test(value)) {
      setExpirationDate(value);
      setErrors({
        expirationDate: "Please enter a valid expiration date (MM/YY).",
      });
      return;
    }

    const [expMonth, expYear] = value.split("/");

    // Validar el mes
    const month = parseInt(expMonth);
    if (month < 1 || month > 12) {
      setExpirationDate(value);
      setErrors({ expirationDate: "Please enter a valid month (1-12)." });
      return;
    }

    // Obtener el año actual para validar el año de vencimiento
    const currentYear = new Date().getFullYear().toString().substr(-2);
    const year = parseInt(expYear);

    // Validar el año
    if (year < parseInt(currentYear) || year >= parseInt(currentYear) + 100) {
      setExpirationDate(value);
      setErrors({ expirationDate: "Please enter a valid year." });
      return;
    }

    setExpirationDate(value);
    setErrors({});
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cvvLengths = {
      visa: 3,
      mastercard: 3,
      amex: 4,
    };
    const length = (cvvLengths as Record<string, number>)[cardType] || 3;
    setCvv(value.slice(0, length).replace(/\D/g, ""));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const today = new Date();
    const [expMonth, expYear] = expirationDate.split("/");
    const expiration = new Date(
      parseInt("20" + expYear),
      parseInt(expMonth) - 1
    );
    const newErrors: Errors = {};
    if (!cardNumber) {
      newErrors.cardNumber = "Please enter a card number.";
    }
    if (!cardHolderName) {
      newErrors.cardHolderName = "Please enter a card holder name.";
    }
    if (!expirationDate) {
      newErrors.expirationDate = "Please enter an expiration date.";
    } else if (expiration <= today) {
      newErrors.expirationDate = "Please enter a valid expiration date.";
    }
    if (!cvv) {
      newErrors.cvv = "Please enter a CVV.";
    } else if (cvv.length !== (cardType === "amex" ? 4 : 3)) {
      newErrors.cvv = `Please enter a valid CVV.`;
    }
    if (!cardType && !newErrors.cardNumber) {
      newErrors.cardNumber =
        "Please enter a valid card type (Visa, Mastercard, Amex).";
    }

    if (Object.keys(newErrors).length === 0) {
      const paymentData: PaymentData = {
        cardNumber,
        cardHolderName,
        expirationDate,
        cvv,
      };
      onNext(paymentData);
      setErrors({});
      setShowModal(true);
    } else {
      setErrors(newErrors);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="credit-card-form">
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header>
            <Modal.Title className="modal-bg">Payment Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-bg">
            <p>Your purchase has been successfully completed.</p>
          </Modal.Body>
          <Modal.Footer className="modal-bg">
            <Button variant="primary" onClick={handleCloseModal}>
              GO TO HOME PAGE
            </Button>
          </Modal.Footer>
        </Modal>
        <Form.Group controlId="formCardNumber">
          <div className="number-logo-container">
            <Form.Label>Card Number *</Form.Label>
            {cardType && (
              <img
                className="card-logo"
                src={`/images/cards/${cardType}.png`}
                alt={`${cardType} card`}
              />
            )}
          </div>
          <Form.Control
            type="text"
            placeholder="Enter card number"
            value={cardNumber}
            onChange={handleCardNumberChange}
            className={errors.cardNumber ? "error" : ""}
          />
          <Form.Text className="error-message">{errors.cardNumber}</Form.Text>
        </Form.Group>
        <Form.Group controlId="formCardHolderName">
          <Form.Label>Card Holder Name *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter card holder name"
            value={cardHolderName}
            onChange={handleCardHolderNameChange}
            className={errors.cardHolderName ? "error" : ""}
          />
          <Form.Text className="error-message">
            {errors.cardHolderName}
          </Form.Text>
        </Form.Group>
        <Form>
          <Form.Group as={Col} controlId="formExpirationDate">
            <Form.Label>Expiration Date *</Form.Label>
            <Form.Control
              type="text"
              placeholder="MM/YY"
              value={expirationDate}
              onChange={handleExpirationDateChange}
              className={errors.expirationDate ? "error" : ""}
            />
            <Form.Text className="error-message">
              {errors.expirationDate}
            </Form.Text>
          </Form.Group>
          <Form.Group as={Col} controlId="formCvv">
            <Form.Label>CVV *</Form.Label>
            <Form.Control
              type="text"
              placeholder="CVV"
              value={cvv}
              onChange={handleCvvChange}
              className={errors.cvv ? "error" : ""}
            />
            <Form.Text className="error-message">{errors.cvv}</Form.Text>
          </Form.Group>
        </Form>
        <Button variant="primary" type="submit">
          SUBMIT
        </Button>
      </div>
    </Form>
  );
};

export default PaymentForm;
