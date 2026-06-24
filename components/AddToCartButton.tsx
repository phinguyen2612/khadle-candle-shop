"use client";

import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

export default function AddToCartButton({
  product,
  className,
  label = "Thêm vào giỏ hàng"
}: {
  product: Product;
  className?: string;
  label?: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const disabled = product.status === "out_of_stock";

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-full bg-cocoa px-5 text-sm font-semibold text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:bg-cocoa/35",
        className
      )}
      onClick={() => {
        addItem({
          productId: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          scent: product.scent,
          city: product.city
        });
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
      }}
    >
      <ShoppingBag size={18} />
      {disabled ? "Hết hàng" : added ? "Đã thêm" : label}
    </button>
  );
}
