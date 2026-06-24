"use client";

import CartSummary from "@/components/CartSummary";
import CheckoutForm from "@/components/CheckoutForm";
import EmptyState from "@/components/EmptyState";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items } = useCart();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">Checkout</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-cocoa">Thanh toan</h1>
      </div>
      {items.length ? (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <CheckoutForm />
          <CartSummary checkout />
        </div>
      ) : (
        <EmptyState
          title="Ban chua co san pham trong gio"
          description="Them san pham vao gio hang truoc khi tien hanh thanh toan."
          actionHref="/products"
          actionLabel="Xem san pham"
        />
      )}
    </section>
  );
}
