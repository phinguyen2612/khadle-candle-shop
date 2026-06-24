import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-porcelain">
      <Image
        src="/images/about-story.png"
        alt="Nến thơm Khadlé Atelier trong không gian ấm áp"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-porcelain/96 via-porcelain/58 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-cocoa/10 via-transparent to-transparent" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-[35rem]">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-clay">
            Nến thơm thủ công
          </p>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.08] text-cocoa sm:text-6xl lg:text-7xl">
            Nến thơm lưu giữ ký ức thành phố
          </h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-cocoa/78 sm:text-lg">
            Mỗi mùi hương là một cánh cửa nhỏ: bến sông Cần Thơ, đêm Sài Gòn sau mưa
            hay sáng Đà Lạt có sương mỏng trên vai áo.
          </p>
          <Link
            href="/products"
            className="focus-ring mt-9 inline-flex h-14 items-center gap-4 rounded-full bg-cocoa px-7 text-base font-semibold text-white shadow-soft transition hover:bg-ink"
          >
            Xem sản phẩm
            <ArrowRight size={20} className="text-clay" />
          </Link>
        </div>
      </div>
    </section>
  );
}
