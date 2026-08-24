import { formatEUR } from "../lib/format";
import GoalRing from "./GoalRing";
import type { GoalProgress } from "../lib/selectors";

export default function GoalCard({
  goal,
  onClick,
}: {
  goal: GoalProgress;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3.5 rounded-2xl border p-4 text-left active:opacity-70 transition-opacity"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <GoalRing ratio={goal.ratio} size={52}>
        <span className="text-[18px]">{goal.emoji}</span>
      </GoalRing>

      <div className="flex-1 min-w-0">
        <p className="text-[14.5px] font-medium truncate" style={{ color: "var(--text)" }}>
          {goal.name}
        </p>
        <p className="text-[12.5px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>
          {formatEUR(goal.saved)} of {formatEUR(goal.targetAmount)}
        </p>
        {goal.isComplete ? (
          <p className="text-[12px] font-semibold mt-0.5" style={{ color: "var(--accent)" }}>
            Goal reached 🎉
          </p>
        ) : goal.daysLeft !== null ? (
          <p className="text-[12px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>
            {goal.daysLeft > 0 ? `${goal.daysLeft} days left` : "Target date passed"}
          </p>
        ) : null}
      </div>

      <span className="text-[14.5px] font-semibold tabular shrink-0" style={{ color: "var(--text)" }}>
        {Math.round(goal.ratio * 100)}%
      </span>
    </button>
  );
}
