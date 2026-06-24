"use client";

import Link from "next/link";
import CartItemCard from "@/components/CartItemCard";
import CartSummary from "@/components/CartSummary";
import EmptyState from "@/components/EmptyState";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items } = useCart();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">Giỏ hàng</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-cocoa">Giỏ hàng</h1>
      </div>
      {items.length ? (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItemCard key={item.productId} item={item} />
            ))}
            <Link
              href="/products"
              className="focus-ring inline-flex h-11 items-center justify-center rounded-full border border-cocoa/20 px-5 text-sm font-semibold text-cocoa transition hover:border-cocoa"
            >
              Tiếp tục mua hàng
            </Link>
          </div>
          <CartSummary />
        </div>
      ) : (
        <EmptyState
          title="Giỏ hàng đang trống"
          description="Hãy chọn một mùi hương thành phố để bắt đầu đơn hàng đầu tiên."
          actionHref="/products"
          actionLabel="Xem sản phẩm"
        />
      )}
    </section>
  );
}
