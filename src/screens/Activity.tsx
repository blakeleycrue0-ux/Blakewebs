import { useMemo } from "react";
import { useStore } from "../lib/store";
import { dayLabel } from "../lib/format";
import TransactionRow from "../components/TransactionRow";
import EmptyState from "../components/EmptyState";
import type { Expense } from "../lib/types";

export default function Activity({
  onEditExpense,
  onAddExpense,
}: {
  onEditExpense: (expense: Expense) => void;
  onAddExpense: () => void;
}) {
  const { state } = useStore();

  const groups = useMemo(() => {
    const sorted = [...state.expenses].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const map = new Map<string, Expense[]>();
    for (const e of sorted) {
      const label = dayLabel(e.date);
      if (!map.has(label)) map.set(label, []);
      map.get(label)!.push(e);
    }
    return Array.from(map.entries());
  }, [state.expenses]);

  const categoryById = useMemo(() => {
    const map = new Map(state.categories.map((c) => [c.id, c]));
    return map;
  }, [state.categories]);

  return (
    <div className="px-5 pt-6 pb-28 max-w-md mx-auto">
      <h1 className="text-[22px] font-semibold mb-5" style={{ color: "var(--text)" }}>
        Activity
      </h1>

      {groups.length === 0 ? (
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
        groups.map(([label, expenses]) => (
          <div key={label} className="mb-6">
            <p
              className="text-[12.5px] font-semibold uppercase tracking-wide mb-1"
              style={{ color: "var(--text-tertiary)" }}
            >
              {label}
            </p>
            <div className="divide-y divide-[var(--border)]">
              {expenses.map((e) => (
                <TransactionRow
                  key={e.id}
                  expense={e}
                  category={categoryById.get(e.categoryId)}
                  onClick={() => onEditExpense(e)}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
