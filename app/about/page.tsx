import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới thiệu | City Memory Candles",
  description: "Câu chuyện thương hiệu nến thơm handmade theo concept ký ức thành phố."
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">
            Giới thiệu
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-cocoa sm:text-5xl">
            Mùi hương như một tấm bưu thiếp nhỏ
          </h1>
          <div className="mt-8 space-y-5 text-base leading-8 text-cocoa/72">
            <p>
              City Memory Candles là concept nến thơm handmade lấy cảm hứng từ những thành phố
              đã từng đi qua đời sống của mỗi người. Mỗi sản phẩm gom lại một mẩu ký ức:
              mùi gió sông, quán cà phê sau mưa, lớp sương sớm trên hàng thông.
            </p>
            <p>
              Nến được thiết kế như một món quà lifestyle nhẹ nhàng, phù hợp để tặng bạn bè,
              người thân hoặc giữ riêng cho những buổi tối chậm lại. MVP này ưu tiên trải
              nghiệm mua hàng rõ ràng, dễ cập nhật sản phẩm từ Google Sheet và sẵn sàng mở rộng.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-md border border-cocoa/10 bg-cream shadow-soft">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src="/images/about-story.png"
              alt="Không gian nến thơm thủ công của City Memory Candles"
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
