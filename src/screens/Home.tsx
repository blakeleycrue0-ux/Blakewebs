import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useStore } from "../lib/store";
import { expensesForMonth, totalSpent, categoryProgress } from "../lib/selectors";
import { formatEUR, monthLabel, greeting } from "../lib/format";
import AnimatedNumber from "../components/AnimatedNumber";
import ProgressBar from "../components/ProgressBar";
import CategoryRow from "../components/CategoryRow";
import EmptyState from "../components/EmptyState";

export default function Home({ onAddExpense }: { onAddExpense: () => void }) {
  const { state } = useStore();
  const [viewedMonth, setViewedMonth] = useState(() => new Date());

  const now = new Date();
  const isCurrentMonth =
    viewedMonth.getFullYear() === now.getFullYear() &&
    viewedMonth.getMonth() === now.getMonth();

  const monthExpenses = useMemo(
    () => expensesForMonth(state, viewedMonth),
    [state, viewedMonth]
  );
  const spent = totalSpent(monthExpenses);
  const remaining = state.monthlyBudget - spent;
  const ratio = state.monthlyBudget > 0 ? Math.min(spent / state.monthlyBudget, 1) : 0;
  const categories = useMemo(
    () => categoryProgress(state.categories, monthExpenses),
    [state.categories, monthExpenses]
  );

  function changeMonth(delta: number) {
    setViewedMonth((prev) => {
      const next = new Date(prev.getFullYear(), prev.getMonth() + delta, 1);
      if (next > now) return prev;
      return next;
    });
  }

  return (
    <div className="px-5 pt-6 pb-28 max-w-md mx-auto">
      <p className="text-[14px] font-medium mb-6" style={{ color: "var(--text-secondary)" }}>
        {greeting()}, {state.userName || "there"}
      </p>

      <div className="flex items-center gap-2 mb-1.5">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          aria-label="Previous month"
          className="w-6 h-6 flex items-center justify-center -ml-1.5"
        >
          <ChevronLeft className="w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
        </button>
        <span className="text-[13px] font-semibold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
          {monthLabel(viewedMonth)}
        </span>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          disabled={isCurrentMonth}
          aria-label="Next month"
          className="w-6 h-6 flex items-center justify-center disabled:opacity-30"
        >
          <ChevronRight className="w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
        </button>
      </div>

      <h1
        className="text-[42px] font-semibold tracking-tight leading-none mb-2"
        style={{ color: remaining < 0 ? "var(--danger)" : "var(--text)" }}
      >
        <AnimatedNumber value={remaining} format={formatEUR} />
        <span className="text-[42px]">{remaining < 0 ? " over" : " left"}</span>
      </h1>
      <p className="text-[13.5px] mb-5" style={{ color: "var(--text-secondary)" }}>
        {formatEUR(spent)} spent of {formatEUR(state.monthlyBudget)}
      </p>

      <ProgressBar ratio={ratio} isOver={remaining < 0} height="h-1.5" className="mb-9" />

      {monthExpenses.length === 0 ? (
        <EmptyState
          title="Nothing spent yet"
          subtitle="Your month starts here."
          action={
            <button
              type="button"
              onClick={onAddExpense}
              className="rounded-full px-6 py-3 text-[14px] font-semibold"
              style={{ background: "var(--text)", color: "var(--bg)" }}
            >
              Add your first expense
            </button>
          }
        />
      ) : (
        <div>
          <p
            className="text-[12.5px] font-semibold uppercase tracking-wide mb-1"
            style={{ color: "var(--text-tertiary)" }}
          >
            Categories
          </p>
          <div className="divide-y divide-[var(--border)]">
            {categories.map((c) => (
              <CategoryRow key={c.id} category={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
