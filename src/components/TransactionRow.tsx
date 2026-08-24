import { ICONS } from "../lib/icons";
import { formatEUR } from "../lib/format";
import type { Expense, Category } from "../lib/types";

export default function TransactionRow({
  expense,
  category,
  onClick,
}: {
  expense: Expense;
  category: Category | undefined;
  onClick?: () => void;
}) {
  const Icon = category ? ICONS[category.icon] : ICONS.other;

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 py-3 text-left active:opacity-60 transition-opacity"
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
        style={{ background: "var(--bg)" }}
      >
        <Icon className="w-4 h-4" style={{ color: "var(--text-secondary)" }} strokeWidth={1.8} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14.5px] font-medium truncate" style={{ color: "var(--text)" }}>
          {expense.merchant}
        </p>
        <p className="text-[12.5px] truncate" style={{ color: "var(--text-tertiary)" }}>
          {category?.name ?? "Uncategorized"}
          {expense.note ? ` · ${expense.note}` : ""}
        </p>
      </div>
      <span className="text-[14.5px] font-semibold tabular shrink-0" style={{ color: "var(--text)" }}>
        -{formatEUR(expense.amount)}
      </span>
    </button>
  );
}
