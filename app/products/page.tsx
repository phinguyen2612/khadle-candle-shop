import type { Metadata } from "next";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "San pham | City Memory Candles",
  description: "Danh sach nen thom handmade lay tu Google Sheet CSV."
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">Collection</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-cocoa sm:text-5xl">
          Tat ca san pham
        </h1>
        <p className="mt-4 text-sm leading-6 text-cocoa/68">
          Loc theo thanh pho, trang thai hang va tim nhanh theo ten hoac mui huong.
        </p>
      </div>
      <ProductGrid products={products} showFilters />
    </section>
  );
}
