export interface IUserOrder {
  _id: string;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  cartItems: {
    _id: string;
    count: number;
    price: number;
    product: {
      title: string;
      category?: { name: string };
      subcategory?: { name: string };
    };
  }[];
}
