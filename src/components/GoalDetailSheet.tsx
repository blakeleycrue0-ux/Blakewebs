import { useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import Sheet from "./Sheet";
import GoalRing from "./GoalRing";
import { useStore } from "../lib/store";
import { formatEUR, dayLabel } from "../lib/format";
import { goalProgress } from "../lib/selectors";

export default function GoalDetailSheet({
  open,
  onClose,
  goalId,
  onEdit,
}: {
  open: boolean;
  onClose: () => void;
  goalId: string | undefined;
  onEdit: () => void;
}) {
  const { state, addContribution, deleteContribution, deleteGoal } = useStore();
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const goal = state.goals.find((g) => g.id === goalId);
  const progress = goal ? goalProgress([goal], state.contributions)[0] : undefined;
  const contributions = state.contributions
    .filter((c) => c.goalId === goalId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const numericAmount = parseFloat(amount.replace(",", "."));
  const canAdd = !Number.isNaN(numericAmount) && numericAmount > 0;

  function handleAdd() {
    if (!canAdd || !goalId) return;
    addContribution({
      goalId,
      amount: numericAmount,
      note: note.trim() || undefined,
      date: new Date().toISOString(),
    });
    setAmount("");
    setNote("");
  }

  function handleDeleteGoal() {
    if (!goalId) return;
    if (window.confirm("Delete this goal and its contribution history?")) {
      deleteGoal(goalId);
      onClose();
    }
  }

  if (!goal || !progress) return null;

  return (
    <Sheet open={open} onClose={onClose} title={goal.name}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center">
          <GoalRing ratio={progress.ratio} size={104} strokeWidth={7}>
            <span className="text-[34px]">{goal.emoji}</span>
          </GoalRing>
          <p className="mt-3 text-[22px] font-semibold tabular" style={{ color: "var(--text)" }}>
            {formatEUR(progress.saved)}
          </p>
          <p className="text-[13px]" style={{ color: "var(--text-tertiary)" }}>
            of {formatEUR(goal.targetAmount)} goal
          </p>
        </div>

        <div className="flex gap-2">
          <div
            className="flex-1 flex items-center gap-1 rounded-xl px-3.5 py-2.5 border"
            style={{ borderColor: "var(--border)", background: "var(--bg)" }}
          >
            <span className="text-[15px] font-medium" style={{ color: "var(--text-tertiary)" }}>€</span>
            <input
              type="text"
              inputMode="decimal"
              placeholder="Add money"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[15px] tabular"
              style={{ color: "var(--text)" }}
            />
          </div>
          <button
            type="button"
            disabled={!canAdd}
            onClick={handleAdd}
            className="rounded-xl px-5 text-[14px] font-semibold disabled:opacity-40"
            style={{ background: "var(--text)", color: "var(--bg)" }}
          >
            Add
          </button>
        </div>
        <input
          type="text"
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="-mt-3 w-full rounded-xl px-3.5 py-2 text-[13.5px] outline-none border"
          style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--text)" }}
        />

        {contributions.length > 0 && (
          <div>
            <p
              className="text-[12.5px] font-semibold uppercase tracking-wide mb-1"
              style={{ color: "var(--text-tertiary)" }}
            >
              History
            </p>
            <div className="flex flex-col divide-y divide-[var(--border)]">
              {contributions.map((c) => (
                <div key={c.id} className="flex items-center justify-between gap-3 py-2.5">
                  <div className="min-w-0">
                    <p className="text-[13.5px] font-medium" style={{ color: "var(--text)" }}>
                      {formatEUR(c.amount)}
                    </p>
                    <p className="text-[12px] truncate" style={{ color: "var(--text-tertiary)" }}>
                      {dayLabel(c.date)}
                      {c.note ? ` · ${c.note}` : ""}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteContribution(c.id)}
                    aria-label="Remove contribution"
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "var(--bg)" }}
                  >
                    <X className="w-3.5 h-3.5" style={{ color: "var(--text-tertiary)" }} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-full py-2.5 text-[13.5px] font-medium border"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit goal
          </button>
          <button
            type="button"
            onClick={handleDeleteGoal}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-full py-2.5 text-[13.5px] font-medium border"
            style={{ borderColor: "var(--border)", color: "var(--danger)" }}
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete goal
          </button>
        </div>
      </div>
    </Sheet>
  );
}
