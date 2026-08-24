import { ICONS } from "../lib/icons";
import { formatEUR } from "../lib/format";
import ProgressBar from "./ProgressBar";
import type { CategoryProgress } from "../lib/selectors";
import { cn } from "../lib/cn";

export default function CategoryRow({
  category,
  onClick,
  className,
}: {
  category: CategoryProgress;
  onClick?: () => void;
  className?: string;
}) {
  const Icon = ICONS[category.icon];
  const Comp = onClick ? "button" : "div";

  return (
    <Comp
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 py-3 text-left",
        onClick && "active:opacity-60 transition-opacity",
        className
      )}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
        style={{ background: "var(--bg)" }}
      >
        <Icon className="w-4 h-4" style={{ color: "var(--text-secondary)" }} strokeWidth={1.8} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[14.5px] font-medium truncate" style={{ color: "var(--text)" }}>
            {category.name}
          </span>
          <span
            className="text-[14.5px] font-semibold tabular shrink-0"
            style={{ color: category.isOver ? "var(--danger)" : "var(--text)" }}
          >
            {category.isOver
              ? `${formatEUR(Math.abs(category.remaining))} over`
              : `${formatEUR(category.remaining)} left`}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5 mb-1.5">
          <span className="text-[12.5px]" style={{ color: "var(--text-tertiary)" }}>
            of {formatEUR(category.budget)}
          </span>
        </div>
        <ProgressBar ratio={category.ratio} isOver={category.isOver} />
      </div>
    </Comp>
  );
}
