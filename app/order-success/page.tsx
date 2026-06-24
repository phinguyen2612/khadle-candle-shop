import Link from "next/link";

export default function OrderSuccessPage({
  searchParams
}: {
  searchParams: { orderId?: string };
}) {
  return (
    <section className="mx-auto grid min-h-[60vh] max-w-3xl place-items-center px-4 py-12 text-center sm:px-6 lg:px-8">
      <div className="rounded-md border border-cocoa/10 bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">Cảm ơn</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-cocoa">Đặt hàng thành công</h1>
        {searchParams.orderId ? (
          <p className="mt-4 text-sm text-cocoa/70">
            Mã đơn hàng: <span className="font-bold text-cocoa">{searchParams.orderId}</span>
          </p>
        ) : null}
        <p className="mx-auto mt-4 max-w-xl leading-7 text-cocoa/72">
          Cảm ơn bạn đã đặt hàng. Shop sẽ liên hệ xác nhận đơn sớm qua số điện thoại bạn đã cung cấp.
        </p>
        <Link
          href="/products"
          className="focus-ring mt-7 inline-flex h-11 items-center justify-center rounded-full bg-cocoa px-6 text-sm font-semibold text-white transition hover:bg-ink"
        >
          Quay về trang sản phẩm
        </Link>
      </div>
    </section>
  );
}
