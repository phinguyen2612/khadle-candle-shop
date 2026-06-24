"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrencyVND } from "@/lib/products";
import type { CartItem } from "@/types/cart";
import SafeImage from "./SafeImage";

export default function CartItemCard({ item }: { item: CartItem }) {
  const { increaseItem, decreaseItem, removeItem } = useCart();

  return (
    <div className="grid gap-4 rounded-md border border-cocoa/10 bg-white p-4 shadow-sm sm:grid-cols-[96px_1fr_auto]">
      <SafeImage src={item.imageUrl} alt={item.name} className="h-24 w-24 rounded-md object-cover" />
      <div>
        <h3 className="font-display text-xl font-semibold text-cocoa">{item.name}</h3>
        <p className="mt-1 text-sm text-cocoa/65">
          {item.city} | {item.scent}
        </p>
        <p className="mt-2 text-sm font-semibold text-cocoa">{formatCurrencyVND(item.price)}</p>
      </div>
      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        <div className="flex h-10 items-center overflow-hidden rounded-full border border-cocoa/15">
          <button
            className="focus-ring grid h-10 w-10 place-items-center text-cocoa"
            onClick={() => decreaseItem(item.productId)}
            aria-label="Giam so luong"
          >
            <Minus size={16} />
          </button>
          <span className="w-9 text-center text-sm font-semibold">{item.quantity}</span>
          <button
            className="focus-ring grid h-10 w-10 place-items-center text-cocoa"
            onClick={() => increaseItem(item.productId)}
            aria-label="Tang so luong"
          >
            <Plus size={16} />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm font-bold text-cocoa">{formatCurrencyVND(item.price * item.quantity)}</p>
          <button
            className="focus-ring grid h-9 w-9 place-items-center rounded-full border border-cocoa/15 text-cocoa transition hover:border-red-300 hover:text-red-600"
            onClick={() => removeItem(item.productId)}
            aria-label="Xoa san pham"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
