export default function SegmentedToggle({
  leftLabel,
  rightLabel,
  active = "left",
  onLeft,
  onRight,
}) {
  const leftActive = active === "left";
  const rightActive = active === "right";

  return (
    <div className="bg-base-200 rounded-xl p-1 grid grid-cols-2 gap-1">
      <button
        type="button"
        onClick={onLeft}
        className={[
          "rounded-lg px-3 py-2 text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer transition",
          leftActive
            ? "bg-base-100 text-primary shadow"
            : "text-base-content/60 hover:bg-base-100/60",
        ].join(" ")}
      >
        <span aria-hidden="true">🏛️</span>
        {leftLabel}
      </button>

      <button
        type="button"
        onClick={onRight}
        className={[
          "rounded-lg px-3 py-2 text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer transition",
          rightActive
            ? "bg-base-100 text-primary shadow"
            : "text-base-content/60 hover:bg-base-100/60",
        ].join(" ")}
      >
        <span aria-hidden="true">🎵</span>
        {rightLabel}
      </button>
    </div>
  );
}
