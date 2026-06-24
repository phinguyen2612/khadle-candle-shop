"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { isValidPhone } from "@/lib/utils";
import ErrorState from "./ErrorState";

type FormState = {
  fullName: string;
  phone: string;
  address: string;
  note: string;
};

const initialState: FormState = {
  fullName: "",
  phone: "",
  address: "",
  note: ""
};

export default function CheckoutForm() {
  const router = useRouter();
  const { items, totalAmount, clearCart } = useCart();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.fullName.trim()) return setError("Vui long nhap ho va ten.");
    if (!form.phone.trim()) return setError("Vui long nhap so dien thoai.");
    if (!isValidPhone(form.phone)) return setError("So dien thoai chua hop le.");
    if (!form.address.trim()) return setError("Vui long nhap dia chi nhan hang.");

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items,
          totalAmount,
          createdAt: new Date().toISOString()
        })
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Khong the dat hang.");
      clearCart();
      router.push(`/order-success?orderId=${encodeURIComponent(data.orderId)}`);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Khong the dat hang.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-md border border-cocoa/10 bg-white p-5 shadow-sm">
      <h2 className="font-display text-2xl font-semibold text-cocoa">Thong tin nhan hang</h2>
      <div className="mt-5 grid gap-4">
        {error ? <ErrorState message={error} /> : null}
        <label className="grid gap-2 text-sm font-semibold text-cocoa">
          Ho va ten
          <input
            className="focus-ring h-11 rounded-md border border-cocoa/15 px-4 font-normal"
            value={form.fullName}
            onChange={(event) => setForm({ ...form, fullName: event.target.value })}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-cocoa">
          So dien thoai
          <input
            className="focus-ring h-11 rounded-md border border-cocoa/15 px-4 font-normal"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-cocoa">
          Dia chi nhan hang
          <textarea
            className="focus-ring min-h-24 rounded-md border border-cocoa/15 px-4 py-3 font-normal"
            value={form.address}
            onChange={(event) => setForm({ ...form, address: event.target.value })}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-cocoa">
          Ghi chu
          <textarea
            className="focus-ring min-h-20 rounded-md border border-cocoa/15 px-4 py-3 font-normal"
            value={form.note}
            onChange={(event) => setForm({ ...form, note: event.target.value })}
          />
        </label>
        <button
          disabled={isSubmitting}
          className="focus-ring h-12 rounded-full bg-cocoa px-6 text-sm font-bold text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:bg-cocoa/45"
        >
          {isSubmitting ? "Dang dat hang..." : "Dat hang"}
        </button>
      </div>
    </form>
  );
}
