import { useMemo } from "react";
import { Plus } from "lucide-react";
import { useStore } from "../lib/store";
import { expensesForMonth, categoryProgress } from "../lib/selectors";
import CategoryRow from "../components/CategoryRow";
import type { Category } from "../lib/types";

export default function Categories({
  onEditCategory,
  onAddCategory,
}: {
  onEditCategory: (category: Category) => void;
  onAddCategory: () => void;
}) {
  const { state } = useStore();

  const categories = useMemo(() => {
    const monthExpenses = expensesForMonth(state, new Date());
    return categoryProgress(state.categories, monthExpenses);
  }, [state]);

  return (
    <div className="px-5 pt-6 pb-28 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-[22px] font-semibold" style={{ color: "var(--text)" }}>
          Categories
        </h1>
        <button
          type="button"
          onClick={onAddCategory}
          aria-label="Add category"
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "var(--bg)" }}
        >
          <Plus className="w-4 h-4" style={{ color: "var(--text)" }} />
        </button>
      </div>

      <div className="divide-y divide-[var(--border)]">
        {categories.map((c) => (
          <CategoryRow key={c.id} category={c} onClick={() => onEditCategory(c)} />
        ))}
      </div>
    </div>
  );
}
