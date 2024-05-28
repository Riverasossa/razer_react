export type Status = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

export interface Order {
    orderId: number;
    user: {
      fullName: string;
      email: string;
    };
    orderDate: string;
    status: string;
    subtotal: number;
    shippingCoast: number;
    taxes: number;
    total: number;
    address: string;
    address2: string;
    province: string;
    canton: string;
    district: string;
    zipCode: number;
    card: string;
    orderProducts: {
      orderProductId: number;
      product: {
        productId: number;
        name: string;
        price: number;
      };
      quantity: number;
    }[];
  }