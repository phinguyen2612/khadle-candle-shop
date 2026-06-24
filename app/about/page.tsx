import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới thiệu | City Memory Candles",
  description: "Câu truyện thương hiệu nến thơm handmade theo concept ký ức thành phố."
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">About</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-cocoa sm:text-5xl">
        Mui huong nhu mot tam buu thiep nho
      </h1>
      <div className="mt-8 grid gap-6 text-base leading-8 text-cocoa/72 md:grid-cols-2">
        <p>
          City Memory Candles la concept nen thom handmade lay cam hung tu nhung thanh pho
          da tung di qua doi song cua moi nguoi. Moi san pham gom lai mot mau ky uc:
          mui gio song, quan ca phe sau mua, lop suong som tren hang thong.
        </p>
        <p>
          Nen duoc thiet ke nhu mot mon qua lifestyle nhe nha, phu hop de tang ban be,
          nguoi than hoac giu rieng cho nhung buoi toi cham lai. MVP nay uu tien trai
          nghiem mua hang ro rang, de cap nhat san pham tu Google Sheet va san sang mo rong.
        </p>
      </div>
    </section>
  );
}
