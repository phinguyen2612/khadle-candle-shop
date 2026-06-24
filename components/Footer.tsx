import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-cocoa/10 bg-cocoa text-cream">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr] lg:px-8">
        <div>
          <p className="font-display text-2xl font-semibold">City Memory Candles</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-cream/78">
            Nen thom handmade luu giu nhung ky uc than quen cua thanh pho qua mui huong,
            chat lieu va nhung khoanh khac cham.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-cream/78 md:items-end">
          <Link href="/products" className="hover:text-white">
            San pham
          </Link>
          <span>Facebook: citymemorycandles</span>
          <span>Instagram: @citymemorycandles</span>
          <span>Email: hello@citymemory.example</span>
        </div>
      </div>
    </footer>
  );
}
