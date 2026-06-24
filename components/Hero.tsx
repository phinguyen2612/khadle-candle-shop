import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/z7963231937978_859c7a6eafbeec266f9969dea9a5e661.jpg"
          alt="Nen thom handmade tren mat vai am ap"
          fill
          priority
          sizes="100vw"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-porcelain via-porcelain/82 to-porcelain/10" />
      </div>
      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl content-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">
            Handmade scented candles
          </p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-tight text-cocoa sm:text-6xl">
            Nen thom luu giu ky uc thanh pho
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-cocoa/72">
            Moi mui huong la mot canh cua nho: ben song Can Tho, dem Sai Gon sau mua,
            hay sang Da Lat co suong mong tren vai ao.
          </p>
          <Link
            href="/products"
            className="focus-ring mt-8 inline-flex rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-ink"
          >
            Xem san pham
          </Link>
        </div>
      </div>
    </section>
  );
}
