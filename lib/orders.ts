import type { Order } from "@/types/order";
import { isValidPhone } from "./utils";

export function calculateTotalAmount(items: Order["items"]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function validateOrder(order: Partial<Order>) {
  if (!order.customer) return "Missing customer information.";
  if (!order.customer.fullName?.trim()) return "Full name is required.";
  if (!order.customer.phone?.trim()) return "Phone number is required.";
  if (!isValidPhone(order.customer.phone)) return "Phone number is invalid.";
  if (!order.customer.address?.trim()) return "Address is required.";
  if (!Array.isArray(order.items) || order.items.length === 0) return "Cart is empty.";
  if (order.items.some((item) => !item.productId || item.quantity < 1 || item.price < 0)) {
    return "Order items are invalid.";
  }
  if (typeof order.totalAmount !== "number" || order.totalAmount <= 0) {
    return "Total amount is invalid.";
  }
  return null;
}

export function createOrderId() {
  return `ORDER-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 7)
    .toUpperCase()}`;
}
