export default function LoadingState({ label = "Dang tai du lieu..." }: { label?: string }) {
  return (
    <div className="rounded-md border border-cocoa/10 bg-white/70 p-8 text-center text-sm text-cocoa/70">
      {label}
    </div>
  );
}
