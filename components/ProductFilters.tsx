"use client";

import { Search } from "lucide-react";

export type ProductFilterState = {
  query: string;
  city: string;
  status: string;
};

export default function ProductFilters({
  cities,
  filters,
  onChange
}: {
  cities: string[];
  filters: ProductFilterState;
  onChange: (filters: ProductFilterState) => void;
}) {
  return (
    <div className="grid gap-3 rounded-md border border-cocoa/10 bg-white/75 p-4 shadow-sm md:grid-cols-[1fr_180px_180px]">
      <label className="relative block">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-cocoa/45" size={18} />
        <input
          className="focus-ring h-11 w-full rounded-full border border-cocoa/15 bg-white pl-10 pr-4 text-sm text-cocoa placeholder:text-cocoa/40"
          placeholder="Tim theo ten hoac mui huong"
          value={filters.query}
          onChange={(event) => onChange({ ...filters, query: event.target.value })}
        />
      </label>
      <select
        className="focus-ring h-11 rounded-full border border-cocoa/15 bg-white px-4 text-sm text-cocoa"
        value={filters.city}
        onChange={(event) => onChange({ ...filters, city: event.target.value })}
      >
        <option value="">Tat ca thanh pho</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <select
        className="focus-ring h-11 rounded-full border border-cocoa/15 bg-white px-4 text-sm text-cocoa"
        value={filters.status}
        onChange={(event) => onChange({ ...filters, status: event.target.value })}
      >
        <option value="">Tat ca trang thai</option>
        <option value="in_stock">Con hang</option>
        <option value="out_of_stock">Het hang</option>
      </select>
    </div>
  );
}
