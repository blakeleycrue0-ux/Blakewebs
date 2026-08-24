import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import Sheet from "./Sheet";
import { useStore } from "../lib/store";
import type { GoalEmoji, SavingsGoal } from "../lib/types";

const EMOJIS: GoalEmoji[] = ["✈️", "🏖️", "🎁", "🏠", "🚗", "💍", "🎓", "💻", "🏥", "🐣"];

export default function GoalSheet({
  open,
  onClose,
  goal,
}: {
  open: boolean;
  onClose: () => void;
  goal?: SavingsGoal;
}) {
  const { addGoal, editGoal, deleteGoal } = useStore();
  const isEditing = Boolean(goal);

  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState<GoalEmoji>("✈️");
  const [target, setTarget] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (!open) return;
    if (goal) {
      setName(goal.name);
      setEmoji(goal.emoji);
      setTarget(String(goal.targetAmount));
      setDate(goal.targetDate ? goal.targetDate.slice(0, 10) : "");
    } else {
      setName("");
      setEmoji("✈️");
      setTarget("");
      setDate("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, goal?.id]);

  const numericTarget = parseFloat(target.replace(",", "."));
  const canSubmit = name.trim().length > 0 && !Number.isNaN(numericTarget) && numericTarget > 0;

  function handleSubmit() {
    if (!canSubmit) return;
    const payload = {
      name: name.trim(),
      emoji,
      targetAmount: numericTarget,
      targetDate: date ? new Date(date).toISOString() : undefined,
    };
    if (isEditing && goal) {
      editGoal({ ...payload, id: goal.id });
    } else {
      addGoal(payload);
    }
    onClose();
  }

  function handleDelete() {
    if (goal) deleteGoal(goal.id);
    onClose();
  }

  return (
    <Sheet open={open} onClose={onClose} title={isEditing ? "Edit goal" : "New savings goal"}>
      <div className="flex flex-col gap-5">
        <div>
          <label className="text-[12.5px] font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
            What are you saving for?
          </label>
          <input
            type="text"
            placeholder="e.g. Trip to Lisbon"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            className="w-full rounded-xl px-3.5 py-2.5 text-[15px] outline-none border"
            style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--text)" }}
          />
        </div>

        <div>
          <label className="text-[12.5px] font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
            Icon
          </label>
          <div className="grid grid-cols-5 gap-2.5">
            {EMOJIS.map((e) => {
              const selected = emoji === e;
              return (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className="aspect-square rounded-2xl flex items-center justify-center border text-[19px]"
                  style={{
                    borderColor: selected ? "var(--accent)" : "var(--border)",
                    background: selected ? "var(--accent-soft)" : "var(--bg)",
                  }}
                >
                  {e}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="text-[12.5px] font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
            Target amount
          </label>
          <div
            className="flex items-center gap-1 rounded-xl px-3.5 py-2.5 border"
            style={{ borderColor: "var(--border)", background: "var(--bg)" }}
          >
            <span className="text-[15px] font-medium" style={{ color: "var(--text-tertiary)" }}>€</span>
            <input
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[15px] tabular"
              style={{ color: "var(--text)" }}
            />
          </div>
        </div>

        <div>
          <label className="text-[12.5px] font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
            Target date (optional)
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
          {isEditing ? "Save changes" : "Create goal"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            className="w-full flex items-center justify-center gap-1.5 py-2 text-[13.5px] font-medium"
            style={{ color: "var(--danger)" }}
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete goal
          </button>
        )}
      </div>
    </Sheet>
  );
}
