import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import BuyNowButton from "@/components/BuyNowButton";
import SafeImage from "@/components/SafeImage";
import { formatCurrencyVND, getProductById, getProducts } from "@/lib/products";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  return {
    title: product ? `${product.name} | City Memory Candles` : "Sản phẩm",
    description: product?.description
  };
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  if (!product) notFound();

  const isOutOfStock = product.status === "out_of_stock";

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="overflow-hidden rounded-md border border-cocoa/10 bg-cream shadow-soft">
          <SafeImage
            src={product.imageUrl || "/images/z7963231937978_859c7a6eafbeec266f9969dea9a5e661.jpg"}
            alt={product.name}
            className="aspect-[4/3] h-full w-full object-cover"
          />
        </div>
        <div className="self-center">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-cocoa shadow-sm">
              {product.city}
            </span>
            <span className="rounded-full bg-moss/10 px-3 py-1 text-xs font-semibold text-moss">
              {isOutOfStock ? "Hết hàng" : "Còn hàng"}
            </span>
          </div>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-cocoa sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-lg font-bold text-cocoa">{formatCurrencyVND(product.price)}</p>
          <dl className="mt-6 grid gap-3 text-sm text-cocoa/72 sm:grid-cols-2">
            <div className="rounded-md bg-white/75 p-4">
              <dt className="font-semibold text-cocoa">Mùi hương</dt>
              <dd className="mt-1">{product.scent}</dd>
            </div>
            <div className="rounded-md bg-white/75 p-4">
              <dt className="font-semibold text-cocoa">Dung tích</dt>
              <dd className="mt-1">{product.volume}</dd>
            </div>
          </dl>
          <p className="mt-6 leading-8 text-cocoa/72">{product.detail}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <AddToCartButton product={product} label="Thêm vào giỏ hàng" />
            <BuyNowButton product={product} />
          </div>
        </div>
      </div>
    </section>
  );
}
