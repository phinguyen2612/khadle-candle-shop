import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getProducts();
  const featuredProducts = products.filter((product) => product.isFeatured).slice(0, 3);

  return (
    <>
      <Hero />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="featured">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">Nổi bật</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-cocoa">Sản phẩm nổi bật</h2>
          <p className="mt-3 text-sm leading-6 text-cocoa/68">
            Những mùi hương đầu tiên cho hành trình gom nhặt ký ức thành phố vào một ngọn nến.
          </p>
        </div>
        <ProductGrid products={featuredProducts.length ? featuredProducts : products.slice(0, 3)} />
      </section>
    </>
  );
}
