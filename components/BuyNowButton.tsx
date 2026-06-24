"use client";

import { useRouter } from "next/navigation";
import { CreditCard } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

export default function BuyNowButton({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const disabled = product.status === "out_of_stock";

  return (
    <button
      type="button"
      disabled={disabled}
      className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-full border border-cocoa/20 bg-white px-5 text-sm font-semibold text-cocoa transition hover:border-cocoa disabled:pointer-events-none disabled:opacity-40"
      onClick={() => {
        addItem({
          productId: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          scent: product.scent,
          city: product.city
        });
        router.push("/checkout");
      }}
    >
      <CreditCard size={18} />
      Mua ngay
    </button>
  );
}
