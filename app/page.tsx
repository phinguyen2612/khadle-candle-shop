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
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">Featured</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-cocoa">San pham noi bat</h2>
          <p className="mt-3 text-sm leading-6 text-cocoa/68">
            Nhung mui huong dau tien cho hanh trinh gom nhat ky uc thanh pho vao mot ngon nen.
          </p>
        </div>
        <ProductGrid products={featuredProducts.length ? featuredProducts : products.slice(0, 3)} />
      </section>
    </>
  );
}
