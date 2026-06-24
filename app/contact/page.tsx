import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lien he | City Memory Candles",
  description: "Thong tin lien he placeholder cua shop nen thom."
};

const contacts = [
  ["Facebook", "facebook.com/citymemorycandles"],
  ["Instagram", "@citymemorycandles"],
  ["Zalo", "0900 000 000"],
  ["Email", "hello@citymemory.example"]
];

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">Contact</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-cocoa sm:text-5xl">
        Lien he dat nen
      </h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {contacts.map(([label, value]) => (
          <div key={label} className="rounded-md border border-cocoa/10 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-clay">{label}</p>
            <p className="mt-2 text-cocoa">{value}</p>
          </div>
        ))}
      </div>
      <Link
        href="/products"
        className="focus-ring mt-8 inline-flex h-11 items-center justify-center rounded-full bg-cocoa px-6 text-sm font-semibold text-white transition hover:bg-ink"
      >
        Dat hang ngay
      </Link>
    </section>
  );
}
