import { NextResponse } from "next/server";
import { calculateTotalAmount, createOrderId, validateOrder } from "@/lib/orders";
import type { Order } from "@/types/order";

export async function POST(request: Request) {
  try {
    const order = (await request.json()) as Order;
    const validationMessage = validateOrder(order);
    if (validationMessage) {
      return NextResponse.json({ success: false, message: validationMessage }, { status: 400 });
    }

    const serverTotal = calculateTotalAmount(order.items);
    if (serverTotal !== order.totalAmount) {
      return NextResponse.json(
        { success: false, message: "Tổng tiền không khớp với giỏ hàng." },
        { status: 400 }
      );
    }

    const orderId = createOrderId();
    console.info("New MVP order", { ...order, orderId });

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error("Order API error:", error);
    return NextResponse.json(
      { success: false, message: "Hiện chưa thể xử lý đơn hàng." },
      { status: 500 }
    );
  }
}
