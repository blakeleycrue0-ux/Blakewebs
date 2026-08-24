import { useState } from "react";
import { Check, ChevronLeft, Plus } from "lucide-react";
import { useStore } from "../lib/store";
import { ICONS, ICON_OPTIONS } from "../lib/icons";
import type { Category, IconKey } from "../lib/types";
import Logo from "../components/Logo";
import { cn } from "../lib/cn";

const SUGGESTED_BUDGETS: Record<IconKey, number> = {
  groceries: 300,
  eatingOut: 150,
  transport: 100,
  shopping: 150,
  entertainment: 80,
  bills: 150,
  health: 60,
  other: 50,
};

type DraftCategory = { id: string; name: string; icon: IconKey; budget: string };

export default function Onboarding() {
  const { completeOnboarding } = useStore();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [monthlyBudget, setMonthlyBudget] = useState("2000");
  const [selected, setSelected] = useState<Set<IconKey>>(
    new Set(ICON_OPTIONS.map((o) => o.key))
  );
  const [customCategories, setCustomCategories] = useState<
    { icon: IconKey; name: string }[]
  >([]);
  const [customName, setCustomName] = useState("");
  const [drafts, setDrafts] = useState<DraftCategory[]>([]);

  function toggleDefault(key: IconKey) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function addCustom() {
    const trimmed = customName.trim();
    if (!trimmed) return;
    setCustomCategories((prev) => [...prev, { icon: "other", name: trimmed }]);
    setCustomName("");
  }

  function goToStep3() {
    const defaultDrafts: DraftCategory[] = ICON_OPTIONS.filter((o) =>
      selected.has(o.key)
    ).map((o) => ({
      id: `default-${o.key}`,
      name: o.label,
      icon: o.key,
      budget: String(SUGGESTED_BUDGETS[o.key]),
    }));
    const customDrafts: DraftCategory[] = customCategories.map((c, i) => ({
      id: `custom-${i}`,
      name: c.name,
      icon: c.icon,
      budget: "50",
    }));
    setDrafts([...defaultDrafts, ...customDrafts]);
    setStep(3);
  }

  function updateDraftBudget(id: string, value: string) {
    setDrafts((prev) => prev.map((d) => (d.id === id ? { ...d, budget: value } : d)));
  }

  function finish() {
    const categories: Category[] = drafts.map((d, i) => ({
      id: `cat-${i}-${d.icon}`,
      name: d.name,
      icon: d.icon,
      budget: parseFloat(d.budget.replace(",", ".")) || 0,
    }));
    completeOnboarding({
      monthlyBudget: parseFloat(monthlyBudget.replace(",", ".")) || 0,
      categories,
      userName: name.trim() || "there",
    });
  }

  return (
    <div className="min-h-dvh flex flex-col max-w-md mx-auto px-6">
      <div className="flex items-center justify-between pt-6 pb-4">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            aria-label="Back"
            className="w-8 h-8 flex items-center justify-center -ml-2"
          >
            <ChevronLeft className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
          </button>
        ) : (
          <Logo size={26} />
        )}
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((s) => (
            <span
              key={s}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: s === step ? 18 : 6,
                background: s <= step ? "var(--accent)" : "var(--border)",
              }}
            />
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="flex-1 flex flex-col justify-center pb-20">
          <p className="text-[13px] font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--text-tertiary)" }}>
            Step 1 of 3
          </p>
          <h1 className="text-[24px] font-semibold leading-snug mb-8" style={{ color: "var(--text)" }}>
            How much do you want to spend this month?
          </h1>
          <div
            className="flex items-center justify-center gap-1 rounded-2xl px-4 py-6 border mb-3"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <span className="text-[34px] font-semibold" style={{ color: "var(--text-tertiary)" }}>€</span>
            <input
              type="text"
              inputMode="decimal"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              autoFocus
              className="bg-transparent outline-none text-[34px] font-semibold text-center tabular w-40"
              style={{ color: "var(--text)" }}
            />
          </div>
          <p className="text-[13px] text-center mb-10" style={{ color: "var(--text-tertiary)" }}>
            You can change this anytime in Settings.
          </p>
          <button
            type="button"
            onClick={() => setStep(2)}
            disabled={!monthlyBudget || parseFloat(monthlyBudget) <= 0}
            className="w-full rounded-full py-3.5 text-[15px] font-semibold disabled:opacity-40"
            style={{ background: "var(--text)", color: "var(--bg)" }}
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex-1 flex flex-col pb-20">
          <p className="text-[13px] font-semibold uppercase tracking-wide mb-3 mt-2" style={{ color: "var(--text-tertiary)" }}>
            Step 2 of 3
          </p>
          <h1 className="text-[24px] font-semibold leading-snug mb-6" style={{ color: "var(--text)" }}>
            Choose your spending categories
          </h1>

          <div className="flex flex-col gap-2 mb-4">
            {ICON_OPTIONS.map(({ key, label }) => {
              const Icon = ICONS[key];
              const checked = selected.has(key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleDefault(key)}
                  className="w-full flex items-center gap-3 rounded-xl px-3.5 py-3 border"
                  style={{
                    borderColor: checked ? "var(--accent)" : "var(--border)",
                    background: checked ? "var(--accent-soft)" : "var(--surface)",
                  }}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.8} style={{ color: checked ? "var(--accent)" : "var(--text-secondary)" }} />
                  <span className="flex-1 text-left text-[14.5px] font-medium" style={{ color: "var(--text)" }}>
                    {label}
                  </span>
                  {checked && <Check className="w-4 h-4" style={{ color: "var(--accent)" }} />}
                </button>
              );
            })}

            {customCategories.map((c, i) => (
              <div
                key={`custom-${i}`}
                className="w-full flex items-center gap-3 rounded-xl px-3.5 py-3 border"
                style={{ borderColor: "var(--accent)", background: "var(--accent-soft)" }}
              >
                <span className="flex-1 text-left text-[14.5px] font-medium" style={{ color: "var(--text)" }}>
                  {c.name}
                </span>
                <Check className="w-4 h-4" style={{ color: "var(--accent)" }} />
              </div>
            ))}
          </div>

          <div className="flex gap-2 mb-8">
            <input
              type="text"
              placeholder="Add a custom category"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCustom()}
              className="flex-1 rounded-xl px-3.5 py-2.5 text-[14.5px] outline-none border"
              style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}
            />
            <button
              type="button"
              onClick={addCustom}
              aria-label="Add category"
              className="w-11 h-11 rounded-xl flex items-center justify-center border shrink-0"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              <Plus className="w-4 h-4" style={{ color: "var(--text)" }} />
            </button>
          </div>

          <button
            type="button"
            onClick={goToStep3}
            disabled={selected.size === 0 && customCategories.length === 0}
            className="w-full rounded-full py-3.5 text-[15px] font-semibold disabled:opacity-40"
            style={{ background: "var(--text)", color: "var(--bg)" }}
          >
            Continue
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="flex-1 flex flex-col pb-20">
          <p className="text-[13px] font-semibold uppercase tracking-wide mb-3 mt-2" style={{ color: "var(--text-tertiary)" }}>
            Step 3 of 3
          </p>
          <h1 className="text-[24px] font-semibold leading-snug mb-6" style={{ color: "var(--text)" }}>
            Assign a budget to each category
          </h1>

          <div className="flex flex-col gap-2 mb-8">
            {drafts.map((d) => {
              const Icon = ICONS[d.icon];
              return (
                <div
                  key={d.id}
                  className="w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 border"
                  style={{ borderColor: "var(--border)", background: "var(--surface)" }}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.8} style={{ color: "var(--text-secondary)" }} />
                  <span className="flex-1 text-[14.5px] font-medium" style={{ color: "var(--text)" }}>
                    {d.name}
                  </span>
                  <span className="text-[14.5px]" style={{ color: "var(--text-tertiary)" }}>€</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={d.budget}
                    onChange={(e) => updateDraftBudget(d.id, e.target.value)}
                    className="w-16 bg-transparent outline-none text-[14.5px] font-semibold text-right tabular"
                    style={{ color: "var(--text)" }}
                  />
                </div>
              );
            })}
          </div>

          <div className="mb-6">
            <label className="text-[12.5px] font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
              What should we call you?
            </label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={cn("w-full rounded-xl px-3.5 py-2.5 text-[14.5px] outline-none border")}
              style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}
            />
          </div>

          <button
            type="button"
            onClick={finish}
            className="w-full rounded-full py-3.5 text-[15px] font-semibold"
            style={{ background: "var(--text)", color: "var(--bg)" }}
          >
            Get started
          </button>
        </div>
      )}
    </div>
  );
}
