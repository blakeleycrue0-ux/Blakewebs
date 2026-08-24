import { cn } from "../lib/cn";

export default function ProgressBar({
  ratio,
  isOver,
  className,
  height = "h-1",
}: {
  ratio: number;
  isOver?: boolean;
  className?: string;
  height?: string;
}) {
  const pct = Math.max(0, Math.min(ratio, 1)) * 100;
  return (
    <div
      className={cn(
        "w-full rounded-full overflow-hidden",
        height,
        className
      )}
      style={{ background: "var(--border)" }}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full transition-[width] duration-500 ease-out"
        style={{
          width: `${pct}%`,
          background: isOver ? "var(--danger)" : "var(--accent)",
        }}
      />
    </div>
  );
}
