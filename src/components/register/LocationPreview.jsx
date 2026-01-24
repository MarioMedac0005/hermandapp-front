export default function LocationPreview() {
  return (
    <div className="relative h-36 rounded-2xl border border-primary/10 overflow-hidden bg-gradient-to-br from-base-200 to-base-100">
      <div className="absolute inset-0">
        <div className="absolute -top-10 -left-10 h-44 w-44 rounded-full bg-primary/15 blur-2xl" />
        <div className="absolute top-2 right-2 h-44 w-44 rounded-full bg-secondary/15 blur-2xl" />
      </div>

      <div className="absolute bottom-3 left-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-base-100/80 backdrop-blur border border-primary/15 px-3 py-2 text-[11px] font-extrabold text-primary">
          <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
          UBICACIÓN DETECTADA
        </div>
      </div>
    </div>
  );
}
