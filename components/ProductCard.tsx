"use client";

import Link from "next/link";
import type { Product } from "@/types/product";
import { formatCurrencyVND, ORIGINAL_PRODUCT_PRICE } from "@/lib/products";
import AddToCartButton from "./AddToCartButton";
import SafeImage from "./SafeImage";

export default function ProductCard({ product }: { product: Product }) {
  const isOutOfStock = product.status === "out_of_stock";

  return (
    <article className="group overflow-hidden rounded-md border border-cocoa/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <Link href={`/products/${product.id}`} className="block">
        <div className="aspect-[4/3] overflow-hidden bg-cream">
          <SafeImage
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="space-y-4 p-5">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-cocoa">
            {product.city}
          </span>
          <span className="rounded-full bg-moss/10 px-3 py-1 text-xs font-semibold text-moss">
            {isOutOfStock ? "Hết hàng" : "Còn hàng"}
          </span>
        </div>
        <div>
          <Link href={`/products/${product.id}`}>
            <h3 className="font-display text-xl font-semibold text-cocoa transition hover:text-clay">
              {product.name}
            </h3>
          </Link>
          <p className="mt-2 min-h-12 text-sm leading-6 text-cocoa/68">{product.description}</p>
        </div>
        <div className="text-sm text-cocoa/70">
          <span className="font-semibold text-cocoa">Mùi hương:</span> {product.scent}
        </div>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-cocoa/45 line-through">
              {formatCurrencyVND(ORIGINAL_PRODUCT_PRICE)}
            </p>
            <p className="text-lg font-bold text-cocoa">{formatCurrencyVND(product.price)}</p>
          </div>
          <span className="text-xs font-medium text-cocoa/55">{product.volume}</span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <Link
            href={`/products/${product.id}`}
            className="focus-ring inline-flex h-11 items-center justify-center rounded-full border border-cocoa/20 px-4 text-sm font-semibold text-cocoa transition hover:border-cocoa"
          >
            Xem chi tiết
          </Link>
          <AddToCartButton product={product} className="px-4" label="Thêm giỏ" />
        </div>
      </div>
    </article>
  );
}
