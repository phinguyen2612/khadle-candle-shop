import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-porcelain">
      <div className="absolute inset-0">
        <Image
          src="/images/z7963231937978_859c7a6eafbeec266f9969dea9a5e661.jpg"
          alt="Nến thơm handmade trên mặt vải ấm áp"
          fill
          priority
          sizes="100vw"
          className="h-full w-full object-contain object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-porcelain/88 via-porcelain/58 to-porcelain/12" />
      </div>
      <div className="relative mx-auto grid min-h-[min(760px,calc(100vh-4rem))] max-w-7xl content-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">
            Nến thơm thủ công
          </p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-tight text-cocoa sm:text-6xl">
            Nến thơm lưu giữ ký ức thành phố
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-cocoa/72">
            Mỗi mùi hương là một cánh cửa nhỏ: bến sông Cần Thơ, đêm Sài Gòn sau mưa,
            hay sáng Đà Lạt có sương mỏng trên vai áo.
          </p>
          <Link
            href="/products"
            className="focus-ring mt-8 inline-flex rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-ink"
          >
            Xem sản phẩm
          </Link>
        </div>
      </div>
    </section>
  );
}
