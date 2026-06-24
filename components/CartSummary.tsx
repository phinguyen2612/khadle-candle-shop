"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatCurrencyVND } from "@/lib/products";

export default function CartSummary({ checkout = false }: { checkout?: boolean }) {
  const { totalAmount, totalItems, clearCart } = useCart();

  return (
    <aside className="rounded-md border border-cocoa/10 bg-white p-5 shadow-sm">
      <h2 className="font-display text-2xl font-semibold text-cocoa">Tóm tắt đơn hàng</h2>
      <div className="mt-5 space-y-3 text-sm text-cocoa/70">
        <div className="flex justify-between">
          <span>Số lượng</span>
          <span className="font-semibold text-cocoa">{totalItems}</span>
        </div>
        <div className="flex justify-between">
          <span>Tạm tính</span>
          <span className="font-semibold text-cocoa">{formatCurrencyVND(totalAmount)}</span>
        </div>
        <div className="border-t border-cocoa/10 pt-3">
          <div className="flex justify-between text-base">
            <span>Tổng tiền</span>
            <span className="font-bold text-cocoa">{formatCurrencyVND(totalAmount)}</span>
          </div>
        </div>
      </div>
      {!checkout ? (
        <div className="mt-6 grid gap-3">
          <Link
            href="/checkout"
            className="focus-ring inline-flex h-11 items-center justify-center rounded-full bg-cocoa px-5 text-sm font-semibold text-white transition hover:bg-ink"
          >
            Thanh toán
          </Link>
          <button
            className="focus-ring h-11 rounded-full border border-cocoa/20 text-sm font-semibold text-cocoa transition hover:border-cocoa"
            onClick={clearCart}
          >
            Xóa giỏ hàng
          </button>
        </div>
      ) : null}
    </aside>
  );
}
