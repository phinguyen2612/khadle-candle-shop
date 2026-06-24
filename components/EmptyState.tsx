import Link from "next/link";

export default function EmptyState({
  title,
  description,
  actionHref,
  actionLabel
}: {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="rounded-md border border-dashed border-cocoa/20 bg-white/70 p-8 text-center">
      <h2 className="font-display text-2xl font-semibold text-cocoa">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-cocoa/68">{description}</p>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="focus-ring mt-5 inline-flex rounded-full bg-cocoa px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
