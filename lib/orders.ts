import type { Order } from "@/types/order";
import { isValidPhone } from "./utils";

export function calculateTotalAmount(items: Order["items"]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function validateOrder(order: Partial<Order>) {
  if (!order.customer) return "Thiếu thông tin khách hàng.";
  if (!order.customer.fullName?.trim()) return "Vui lòng nhập họ và tên.";
  if (!order.customer.phone?.trim()) return "Vui lòng nhập số điện thoại.";
  if (!isValidPhone(order.customer.phone)) return "Số điện thoại chưa hợp lệ.";
  if (!order.customer.address?.trim()) return "Vui lòng nhập địa chỉ nhận hàng.";
  if (!Array.isArray(order.items) || order.items.length === 0) return "Giỏ hàng đang trống.";
  if (order.items.some((item) => !item.productId || item.quantity < 1 || item.price < 0)) {
    return "Sản phẩm trong đơn hàng chưa hợp lệ.";
  }
  if (typeof order.totalAmount !== "number" || order.totalAmount <= 0) {
    return "Tổng tiền chưa hợp lệ.";
  }
  return null;
}

export function createOrderId() {
  return `ORDER-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 7)
    .toUpperCase()}`;
}
