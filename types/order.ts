import type { CartItem } from "./cart";

export type CustomerInfo = {
  fullName: string;
  phone: string;
  address: string;
  note?: string;
};

export type Order = {
  customer: CustomerInfo;
  items: CartItem[];
  totalAmount: number;
  createdAt: string;
};
