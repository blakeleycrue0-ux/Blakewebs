import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { useStore } from "./lib/store";
import type { Screen } from "./lib/nav";
import type { Expense, Category } from "./lib/types";
import BottomNav from "./components/BottomNav";
import AddExpenseSheet from "./components/AddExpenseSheet";
import CategorySheet from "./components/CategorySheet";
import Onboarding from "./screens/Onboarding";
import Home from "./screens/Home";
import Activity from "./screens/Activity";
import Categories from "./screens/Categories";
import Settings from "./screens/Settings";

export default function App() {
  const { state } = useStore();
  const [screen, setScreen] = useState<Screen>("home");

  const [expenseSheetOpen, setExpenseSheetOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | undefined>();

  const [categorySheetOpen, setCategorySheetOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();

  const wasInitialized = useRef(state.initialized);
  useEffect(() => {
    if (!wasInitialized.current && state.initialized) {
      setScreen("home");
    }
    wasInitialized.current = state.initialized;
  }, [state.initialized]);

  if (!state.initialized) {
    return <Onboarding />;
  }

  function openAddExpense() {
    setEditingExpense(undefined);
    setExpenseSheetOpen(true);
  }

  function openEditExpense(expense: Expense) {
    setEditingExpense(expense);
    setExpenseSheetOpen(true);
  }

  function openAddCategory() {
    setEditingCategory(undefined);
    setCategorySheetOpen(true);
  }

  function openEditCategory(category: Category) {
    setEditingCategory(category);
    setCategorySheetOpen(true);
  }

  return (
    <div className="min-h-dvh" style={{ background: "var(--bg)" }}>
      {screen === "home" && <Home onAddExpense={openAddExpense} />}
      {screen === "activity" && (
        <Activity onEditExpense={openEditExpense} onAddExpense={openAddExpense} />
      )}
      {screen === "categories" && (
        <Categories onEditCategory={openEditCategory} onAddCategory={openAddCategory} />
      )}
      {screen === "settings" && <Settings />}

      <div
        className="fixed inset-x-0 z-40 flex justify-center pointer-events-none"
        style={{ bottom: "calc(64px + env(safe-area-inset-bottom) + 16px)" }}
      >
        <div className="w-full max-w-md relative px-5">
          <button
            type="button"
            onClick={openAddExpense}
            aria-label="Add expense"
            className="absolute right-5 w-14 h-14 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform pointer-events-auto"
            style={{ background: "var(--accent)" }}
          >
            <Plus className="w-6 h-6 text-white" strokeWidth={2.2} />
          </button>
        </div>
      </div>

      <BottomNav active={screen} onChange={setScreen} />

      <AddExpenseSheet
        open={expenseSheetOpen}
        onClose={() => setExpenseSheetOpen(false)}
        expense={editingExpense}
      />
      <CategorySheet
        open={categorySheetOpen}
        onClose={() => setCategorySheetOpen(false)}
        category={editingCategory}
      />
    </div>
  );
}
