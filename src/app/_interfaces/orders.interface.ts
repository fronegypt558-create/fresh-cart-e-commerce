// interfaces/orders.interface.ts

export interface Iorders {
  _id: string;
  user?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  cartItems?: ICartItem[];
}

export interface ICartItem {
  _id: string;
  count: number;
  price: number;
  product?: {
    title?: string;
    category?: {
      name?: string;
    };
    subcategory?: {
      name?: string;
    };
  };
}
