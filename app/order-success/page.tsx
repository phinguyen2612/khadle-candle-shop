import Link from "next/link";

export default function OrderSuccessPage({
  searchParams
}: {
  searchParams: { orderId?: string };
}) {
  return (
    <section className="mx-auto grid min-h-[60vh] max-w-3xl place-items-center px-4 py-12 text-center sm:px-6 lg:px-8">
      <div className="rounded-md border border-cocoa/10 bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">Thank you</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-cocoa">Dat hang thanh cong</h1>
        {searchParams.orderId ? (
          <p className="mt-4 text-sm text-cocoa/70">
            Ma don hang: <span className="font-bold text-cocoa">{searchParams.orderId}</span>
          </p>
        ) : null}
        <p className="mx-auto mt-4 max-w-xl leading-7 text-cocoa/72">
          Cam on ban da dat hang. Shop se lien he xac nhan don som qua so dien thoai ban da cung cap.
        </p>
        <Link
          href="/products"
          className="focus-ring mt-7 inline-flex h-11 items-center justify-center rounded-full bg-cocoa px-6 text-sm font-semibold text-white transition hover:bg-ink"
        >
          Quay ve trang san pham
        </Link>
      </div>
    </section>
  );
}
