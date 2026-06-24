import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới thiệu | City Memory Candles",
  description: "Câu chuyện thương hiệu nến thơm handmade theo concept ký ức thành phố."
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">Giới thiệu</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-cocoa sm:text-5xl">
        Mùi hương như một tấm bưu thiếp nhỏ
      </h1>
      <div className="mt-8 grid gap-6 text-base leading-8 text-cocoa/72 md:grid-cols-2">
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
    </section>
  );
}
