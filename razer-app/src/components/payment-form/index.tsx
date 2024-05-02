import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import "./payment-form.scss"; // Importa el archivo Sass para aplicar estilos

const CreditCardForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState("");
  const [errors, setErrors] = useState({});

  const handleCardNumberChange = (e) => {
    let value = e.target.value;

    // Permitir solo números en el campo de número de tarjeta
    value = value.replace(/\D/g, "");

    // Limitar la longitud máxima según el tipo de tarjeta
    if (value.startsWith("4")) {
      value = value.slice(0, 16); // Visa tiene un máximo de 16 números
    } else if (value.startsWith("5")) {
      value = value.slice(0, 16); // Mastercard tiene un máximo de 16 números
    } else if (value.startsWith("3")) {
      value = value.slice(0, 15); // Amex tiene un máximo de 15 números
    }

    // Eliminar espacios en blanco para calcular la longitud real del número de tarjeta
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

  const handleCardHolderNameChange = (e) => {
    const value = e.target.value;
    // Permitir solo letras y espacios en blanco en el nombre del titular de la tarjeta
    setCardHolderName(value.replace(/[^A-Za-z\s]/g, ""));
  };

  const handleExpirationDateChange = (e) => {
    const value = e.target.value;
    setExpirationDate(value);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value;
    // Limitar la longitud del CVV según el tipo de tarjeta
    const cvvLengths = {
      visa: 3,
      mastercard: 3,
      amex: 4,
    };
    const length = cvvLengths[cardType] || 3;
    setCvv(value.slice(0, length).replace(/\D/g, ""));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar la información antes de enviarla
    const today = new Date();
    const [expMonth, expYear] = expirationDate.split("/");
    const expiration = new Date(
      parseInt("20" + expYear),
      parseInt(expMonth) - 1
    );
    const newErrors = {};
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
      // Lógica para enviar la información de la tarjeta de crédito
      alert("Form submitted successfully");
      setErrors({}); // Reinicia el estado de errores a un objeto vacío
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="credit-card-form">
      <Form.Group controlId="formCardNumber">
        <Form.Label>Card Number *</Form.Label>
        {cardType && (
          <img
            src={`/images/cards/${cardType}.png`}
            alt={`${cardType} card`}
            style={{ maxWidth: "100px" }}
          />
        )}
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
        <Form.Text className="error-message">{errors.cardHolderName}</Form.Text>
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
      <Button variant="primary" type="button" onClick={handleSubmit}>
        SUBMIT
      </Button>
    </div>
  );
};

export default CreditCardForm;
