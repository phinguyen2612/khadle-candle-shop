import type { Metadata } from "next";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Sản phẩm | City Memory Candles",
  description: "Danh sách nến thơm handmade lấy từ Google Sheet CSV."
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">Bộ sưu tập</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-cocoa sm:text-5xl">
          Tất cả sản phẩm
        </h1>
        <p className="mt-4 text-sm leading-6 text-cocoa/68">
          Lọc theo thành phố, trạng thái hàng và tìm nhanh theo tên hoặc mùi hương.
        </p>
      </div>
      <ProductGrid products={products} showFilters />
    </section>
  );
}
