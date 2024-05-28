export interface Checkout {
    address: string;
    address2: string;
    province: string;
    canton: string;
    district: string;
    zipCode: number;
    creditCard: {
      cardNumber: string;
      cardHolderName: string;
      expirationDate: string;
      cvv: string;
    };
  }