import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-cocoa/10 bg-cocoa text-cream">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr] lg:px-8">
        <div>
          <p className="font-display text-2xl font-semibold">City Memory Candles</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-cream/78">
            Nến thơm handmade lưu giữ những ký ức thân quen của thành phố qua mùi hương,
            chất liệu và những khoảnh khắc chậm.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-cream/78 md:items-end">
          <Link href="/products" className="hover:text-white">
            Sản phẩm
          </Link>
          <span>Facebook: Khadlé Aterlier</span>
          <span>Instagram: @citymemorycandles</span>
          <span>Email: Khadlé.Aterlier@gmail.com</span>
        </div>
      </div>
    </footer>
  );
}
