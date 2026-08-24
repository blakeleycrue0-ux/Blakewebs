import { useState } from "react";
import {
  Check,
  ChevronLeft,
  Plus,
  Sparkle,
  Wallet,
  LayoutGrid,
  PiggyBank,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useStore } from "../lib/store";
import { ICONS, ICON_OPTIONS } from "../lib/icons";
import type { Category, GoalEmoji, IconKey } from "../lib/types";
import { cn } from "../lib/cn";

const TOTAL_STEPS = 10;

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

const GOAL_EMOJIS: GoalEmoji[] = ["✈️", "🏖️", "🎁", "🏠", "🚗", "💻"];

type InfoStep = { icon: LucideIcon; title: string; body: string };

const INFO_STEPS: InfoStep[] = [
  {
    icon: Sparkle,
    title: "Meet Pace",
    body: "The simplest way to know exactly how much you have left to spend, every single day.",
  },
  {
    icon: Wallet,
    title: "Always know what's left",
    body: "Your remaining balance is always front and center — no digging through statements.",
  },
  {
    icon: LayoutGrid,
    title: "Organized by category",
    body: "Groceries, transport, eating out — see exactly where your money goes.",
  },
  {
    icon: PiggyBank,
    title: "Save for anything",
    body: "Set up goals for trips, gifts, or a rainy day, and watch your progress grow.",
  },
  {
    icon: ShieldCheck,
    title: "Your data stays with you",
    body: "Pace runs entirely on this device. Nothing is uploaded, sold, or shared.",
  },
];

type DraftCategory = { id: string; name: string; icon: IconKey; budget: string };

export default function Onboarding() {
  const { completeOnboarding } = useStore();
  const [step, setStep] = useState(1);

  const [monthlyBudget, setMonthlyBudget] = useState("2000");
  const [selected, setSelected] = useState<Set<IconKey>>(
    new Set(ICON_OPTIONS.map((o) => o.key))
  );
  const [customCategories, setCustomCategories] = useState<{ name: string }[]>([]);
  const [customName, setCustomName] = useState("");
  const [drafts, setDrafts] = useState<DraftCategory[]>([]);

  const [wantsGoal, setWantsGoal] = useState(true);
  const [goalName, setGoalName] = useState("");
  const [goalEmoji, setGoalEmoji] = useState<GoalEmoji>("✈️");
  const [goalTarget, setGoalTarget] = useState("");

  const [name, setName] = useState("");

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
    setCustomCategories((prev) => [...prev, { name: trimmed }]);
    setCustomName("");
  }

  function goToBudgetStep() {
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
      icon: "other",
      budget: "50",
    }));
    setDrafts([...defaultDrafts, ...customDrafts]);
    setStep(8);
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

    const numericGoalTarget = parseFloat(goalTarget.replace(",", "."));
    const goal =
      wantsGoal && goalName.trim() && !Number.isNaN(numericGoalTarget) && numericGoalTarget > 0
        ? { name: goalName.trim(), emoji: goalEmoji, targetAmount: numericGoalTarget }
        : undefined;

    completeOnboarding({
      monthlyBudget: parseFloat(monthlyBudget.replace(",", ".")) || 0,
      categories,
      userName: name.trim() || "there",
      goal,
    });
  }

  const showBack = step > 1;

  return (
    <div className="min-h-dvh flex flex-col max-w-md mx-auto px-6">
      <div className="pt-6 pb-2">
        <div className="flex items-center justify-between mb-3">
          {showBack ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s === 8 ? 7 : s - 1))}
              aria-label="Back"
              className="w-8 h-8 flex items-center justify-center -ml-2"
            >
              <ChevronLeft className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
            </button>
          ) : (
            <div className="w-8 h-8" />
          )}
          <span className="text-[12px] font-medium" style={{ color: "var(--text-tertiary)" }}>
            {step} / {TOTAL_STEPS}
          </span>
        </div>
        <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
          <div
            className="h-full rounded-full transition-[width] duration-300"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%`, background: "var(--accent)" }}
          />
        </div>
      </div>

      {step <= 5 && (
        <InfoStepView
          info={INFO_STEPS[step - 1]}
          onNext={() => setStep(step + 1)}
          isFirst={step === 1}
        />
      )}

      {step === 6 && (
        <div className="flex-1 flex flex-col justify-center pb-20">
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
            onClick={() => setStep(7)}
            disabled={!monthlyBudget || parseFloat(monthlyBudget) <= 0}
            className="w-full rounded-full py-3.5 text-[15px] font-semibold disabled:opacity-40"
            style={{ background: "var(--text)", color: "var(--bg)" }}
          >
            Continue
          </button>
        </div>
      )}

      {step === 7 && (
        <div className="flex-1 flex flex-col pb-20">
          <h1 className="text-[24px] font-semibold leading-snug mb-6 mt-2" style={{ color: "var(--text)" }}>
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
            onClick={goToBudgetStep}
            disabled={selected.size === 0 && customCategories.length === 0}
            className="w-full rounded-full py-3.5 text-[15px] font-semibold disabled:opacity-40"
            style={{ background: "var(--text)", color: "var(--bg)" }}
          >
            Continue
          </button>
        </div>
      )}

      {step === 8 && (
        <div className="flex-1 flex flex-col pb-20">
          <h1 className="text-[24px] font-semibold leading-snug mb-6 mt-2" style={{ color: "var(--text)" }}>
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

          <button
            type="button"
            onClick={() => setStep(9)}
            className="w-full rounded-full py-3.5 text-[15px] font-semibold"
            style={{ background: "var(--text)", color: "var(--bg)" }}
          >
            Continue
          </button>
        </div>
      )}

      {step === 9 && (
        <div className="flex-1 flex flex-col pb-20">
          <h1 className="text-[24px] font-semibold leading-snug mb-2 mt-2" style={{ color: "var(--text)" }}>
            Want to start a savings goal?
          </h1>
          <p className="text-[14px] mb-6" style={{ color: "var(--text-secondary)" }}>
            A trip, a gift, an emergency fund — anything. You can always add more later.
          </p>

          <div className="flex items-center gap-2 mb-3">
            <button
              type="button"
              onClick={() => setWantsGoal(true)}
              className="flex-1 rounded-full py-2.5 text-[13.5px] font-semibold border"
              style={{
                borderColor: wantsGoal ? "var(--accent)" : "var(--border)",
                background: wantsGoal ? "var(--accent-soft)" : "var(--surface)",
                color: wantsGoal ? "var(--accent)" : "var(--text-secondary)",
              }}
            >
              Yes, let's set one up
            </button>
            <button
              type="button"
              onClick={() => setWantsGoal(false)}
              className="flex-1 rounded-full py-2.5 text-[13.5px] font-semibold border"
              style={{
                borderColor: !wantsGoal ? "var(--accent)" : "var(--border)",
                background: !wantsGoal ? "var(--accent-soft)" : "var(--surface)",
                color: !wantsGoal ? "var(--accent)" : "var(--text-secondary)",
              }}
            >
              Skip for now
            </button>
          </div>

          {wantsGoal && (
            <div className="flex flex-col gap-4 mt-3 mb-4">
              <div>
                <label className="text-[12.5px] font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
                  What are you saving for?
                </label>
                <input
                  type="text"
                  placeholder="e.g. Trip to Lisbon"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  className="w-full rounded-xl px-3.5 py-2.5 text-[14.5px] outline-none border"
                  style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}
                />
              </div>
              <div className="flex gap-2">
                {GOAL_EMOJIS.map((e) => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setGoalEmoji(e)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center border text-[17px]"
                    style={{
                      borderColor: goalEmoji === e ? "var(--accent)" : "var(--border)",
                      background: goalEmoji === e ? "var(--accent-soft)" : "var(--surface)",
                    }}
                  >
                    {e}
                  </button>
                ))}
              </div>
              <div>
                <label className="text-[12.5px] font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
                  Target amount
                </label>
                <div
                  className="flex items-center gap-1 rounded-xl px-3.5 py-2.5 border"
                  style={{ borderColor: "var(--border)", background: "var(--surface)" }}
                >
                  <span className="text-[15px]" style={{ color: "var(--text-tertiary)" }}>€</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0"
                    value={goalTarget}
                    onChange={(e) => setGoalTarget(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-[14.5px] tabular"
                    style={{ color: "var(--text)" }}
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setStep(10)}
            className={cn("w-full rounded-full py-3.5 text-[15px] font-semibold", wantsGoal ? "mt-2" : "mt-6")}
            style={{ background: "var(--text)", color: "var(--bg)" }}
          >
            Continue
          </button>
        </div>
      )}

      {step === 10 && (
        <div className="flex-1 flex flex-col justify-center pb-20">
          <h1 className="text-[24px] font-semibold leading-snug mb-6" style={{ color: "var(--text)" }}>
            What should we call you?
          </h1>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            className="w-full rounded-xl px-4 py-3.5 text-[16px] outline-none border mb-10"
            style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}
          />
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

function InfoStepView({
  info,
  onNext,
  isFirst,
}: {
  info: InfoStep;
  onNext: () => void;
  isFirst: boolean;
}) {
  const Icon = info.icon;
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center pb-20">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
        style={{ background: "var(--accent-soft)" }}
      >
        <Icon className="w-7 h-7" strokeWidth={1.6} style={{ color: "var(--accent)" }} />
      </div>
      <h1 className="text-[24px] font-semibold leading-snug mb-3 max-w-xs" style={{ color: "var(--text)" }}>
        {info.title}
      </h1>
      <p className="text-[14.5px] leading-relaxed max-w-xs mb-10" style={{ color: "var(--text-secondary)" }}>
        {info.body}
      </p>
      <button
        type="button"
        onClick={onNext}
        className="w-full rounded-full py-3.5 text-[15px] font-semibold"
        style={{ background: "var(--text)", color: "var(--bg)" }}
      >
        {isFirst ? "Get started" : "Continue"}
      </button>
    </div>
  );
}
