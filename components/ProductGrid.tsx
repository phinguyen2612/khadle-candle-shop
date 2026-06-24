"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import EmptyState from "./EmptyState";
import ProductCard from "./ProductCard";
import ProductFilters, { type ProductFilterState } from "./ProductFilters";

export default function ProductGrid({
  products,
  showFilters = false
}: {
  products: Product[];
  showFilters?: boolean;
}) {
  const [filters, setFilters] = useState<ProductFilterState>({ query: "", city: "", status: "" });

  const cities = useMemo(
    () => Array.from(new Set(products.map((product) => product.city))).filter(Boolean),
    [products]
  );

  const filteredProducts = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.scent.toLowerCase().includes(query);
      const matchesCity = !filters.city || product.city === filters.city;
      const matchesStatus = !filters.status || product.status === filters.status;
      return matchesQuery && matchesCity && matchesStatus;
    });
  }, [filters, products]);

  return (
    <div className="space-y-6">
      {showFilters ? <ProductFilters cities={cities} filters={filters} onChange={setFilters} /> : null}
      {filteredProducts.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Khong tim thay san pham"
          description="Thu doi tu khoa, thanh pho hoac trang thai san pham de xem them lua chon."
        />
      )}
    </div>
  );
}
