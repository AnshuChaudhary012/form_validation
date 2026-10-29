export default function Loader({ label = "Loading" }) {
  return (
    <div
      className="flex min-h-40 items-center justify-center gap-3 text-sm text-slate-300"
      role="status"
    >
      <span className="size-5 animate-spin rounded-full border-2 border-white/20 border-t-cyan-300" />
      {label}
    </div>
  );
}
