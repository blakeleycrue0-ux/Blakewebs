import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import Sheet from "./Sheet";
import IconPicker from "./IconPicker";
import { useStore } from "../lib/store";
import type { Category, IconKey } from "../lib/types";

export default function CategorySheet({
  open,
  onClose,
  category,
}: {
  open: boolean;
  onClose: () => void;
  category?: Category;
}) {
  const { addCategory, editCategory, deleteCategory } = useStore();
  const isEditing = Boolean(category);

  const [name, setName] = useState("");
  const [icon, setIcon] = useState<IconKey>("other");
  const [budget, setBudget] = useState("");

  useEffect(() => {
    if (!open) return;
    if (category) {
      setName(category.name);
      setIcon(category.icon);
      setBudget(String(category.budget));
    } else {
      setName("");
      setIcon("other");
      setBudget("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, category?.id]);

  const numericBudget = parseFloat(budget.replace(",", "."));
  const canSubmit = name.trim().length > 0 && !Number.isNaN(numericBudget) && numericBudget >= 0;

  function handleSubmit() {
    if (!canSubmit) return;
    if (isEditing && category) {
      editCategory({ ...category, name: name.trim(), icon, budget: numericBudget });
    } else {
      addCategory({ name: name.trim(), icon, budget: numericBudget });
    }
    onClose();
  }

  function handleDelete() {
    if (category) deleteCategory(category.id);
    onClose();
  }

  return (
    <Sheet open={open} onClose={onClose} title={isEditing ? "Edit category" : "New category"}>
      <div className="flex flex-col gap-5">
        <div>
          <label className="text-[12.5px] font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
            Name
          </label>
          <input
            type="text"
            placeholder="e.g. Subscriptions"
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
          <IconPicker value={icon} onChange={setIcon} />
        </div>

        <div>
          <label className="text-[12.5px] font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
            Monthly budget
          </label>
          <div
            className="flex items-center gap-1 rounded-xl px-3.5 py-2.5 border"
            style={{ borderColor: "var(--border)", background: "var(--bg)" }}
          >
            <span className="text-[15px] font-medium" style={{ color: "var(--text-tertiary)" }}>
              €
            </span>
            <input
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[15px] tabular"
              style={{ color: "var(--text)" }}
            />
            <span className="text-[13px]" style={{ color: "var(--text-tertiary)" }}>
              / month
            </span>
          </div>
        </div>

        <button
          type="button"
          disabled={!canSubmit}
          onClick={handleSubmit}
          className="w-full rounded-full py-3.5 text-[15px] font-semibold transition-opacity disabled:opacity-40"
          style={{ background: "var(--text)", color: "var(--bg)" }}
        >
          {isEditing ? "Save changes" : "Add category"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            className="w-full flex items-center justify-center gap-1.5 py-2 text-[13.5px] font-medium"
            style={{ color: "var(--danger)" }}
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete category
          </button>
        )}
      </div>
    </Sheet>
  );
}
