import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import Sheet from "./Sheet";
import { ICONS } from "../lib/icons";
import { useStore } from "../lib/store";
import type { Expense } from "../lib/types";
import { cn } from "../lib/cn";

export default function AddExpenseSheet({
  open,
  onClose,
  expense,
}: {
  open: boolean;
  onClose: () => void;
  expense?: Expense;
}) {
  const { state, addExpense, editExpense, deleteExpense } = useStore();
  const isEditing = Boolean(expense);

  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState(state.categories[0]?.id ?? "");
  const [merchant, setMerchant] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!open) return;
    if (expense) {
      setAmount(String(expense.amount));
      setCategoryId(expense.categoryId);
      setMerchant(expense.merchant);
      setNote(expense.note ?? "");
    } else {
      setAmount("");
      setCategoryId(state.categories[0]?.id ?? "");
      setMerchant("");
      setNote("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, expense?.id]);

  const numericAmount = parseFloat(amount.replace(",", "."));
  const canSubmit =
    !Number.isNaN(numericAmount) && numericAmount > 0 && categoryId && merchant.trim().length > 0;

  function handleSubmit() {
    if (!canSubmit) return;
    if (isEditing && expense) {
      editExpense({
        ...expense,
        amount: numericAmount,
        categoryId,
        merchant: merchant.trim(),
        note: note.trim() || undefined,
      });
    } else {
      addExpense({
        amount: numericAmount,
        categoryId,
        merchant: merchant.trim(),
        note: note.trim() || undefined,
        date: new Date().toISOString(),
      });
    }
    onClose();
  }

  function handleDelete() {
    if (expense) deleteExpense(expense.id);
    onClose();
  }

  return (
    <Sheet open={open} onClose={onClose} title={isEditing ? "Edit expense" : "Add expense"}>
      <div className="flex flex-col gap-5">
        <div>
          <label className="text-[12.5px] font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
            Amount
          </label>
          <div
            className="flex items-center gap-1 rounded-2xl px-4 py-4 border"
            style={{ borderColor: "var(--border)", background: "var(--bg)" }}
          >
            <span className="text-[28px] font-semibold" style={{ color: "var(--text-tertiary)" }}>
              €
            </span>
            <input
              type="text"
              inputMode="decimal"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoFocus={!isEditing}
              className="flex-1 bg-transparent outline-none text-[28px] font-semibold tabular"
              style={{ color: "var(--text)" }}
            />
          </div>
        </div>

        <div>
          <label className="text-[12.5px] font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {state.categories.map((c) => {
              const Icon = ICONS[c.icon];
              const selected = categoryId === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategoryId(c.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full pl-2.5 pr-3.5 py-2 border text-[13.5px] font-medium transition-colors"
                  )}
                  style={{
                    borderColor: selected ? "var(--accent)" : "var(--border)",
                    background: selected ? "var(--accent-soft)" : "var(--bg)",
                    color: selected ? "var(--accent)" : "var(--text-secondary)",
                  }}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="text-[12.5px] font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
            Merchant
          </label>
          <input
            type="text"
            placeholder="Mercadona"
            value={merchant}
            onChange={(e) => setMerchant(e.target.value)}
            className="w-full rounded-xl px-3.5 py-2.5 text-[15px] outline-none border"
            style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--text)" }}
          />
        </div>

        <div>
          <label className="text-[12.5px] font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
            Note (optional)
          </label>
          <input
            type="text"
            placeholder="Add a note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-xl px-3.5 py-2.5 text-[15px] outline-none border"
            style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--text)" }}
          />
        </div>

        <button
          type="button"
          disabled={!canSubmit}
          onClick={handleSubmit}
          className="w-full rounded-full py-3.5 text-[15px] font-semibold transition-opacity disabled:opacity-40"
          style={{ background: "var(--text)", color: "var(--bg)" }}
        >
          {isEditing ? "Save changes" : "Add expense"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            className="w-full flex items-center justify-center gap-1.5 py-2 text-[13.5px] font-medium"
            style={{ color: "var(--danger)" }}
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete expense
          </button>
        )}
      </div>
    </Sheet>
  );
}
