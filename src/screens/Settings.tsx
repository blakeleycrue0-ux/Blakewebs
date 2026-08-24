import { useState } from "react";
import { useStore } from "../lib/store";
import type { Theme } from "../lib/types";
import { cn } from "../lib/cn";

const THEMES: { key: Theme; label: string }[] = [
  { key: "light", label: "Light" },
  { key: "dark", label: "Dark" },
  { key: "system", label: "System" },
];

export default function Settings() {
  const { state, setUserName, setMonthlyBudget, setTheme, reset } = useStore();
  const [name, setName] = useState(state.userName);
  const [budget, setBudget] = useState(String(state.monthlyBudget));

  function commitName() {
    setUserName(name.trim() || "there");
  }

  function commitBudget() {
    const n = parseFloat(budget.replace(",", "."));
    if (!Number.isNaN(n) && n >= 0) setMonthlyBudget(n);
    else setBudget(String(state.monthlyBudget));
  }

  function handleReset() {
    if (window.confirm("This will erase all your Pace data on this device. Continue?")) {
      reset();
    }
  }

  return (
    <div className="px-5 pt-6 pb-28 max-w-md mx-auto">
      <h1 className="text-[22px] font-semibold mb-6" style={{ color: "var(--text)" }}>
        Settings
      </h1>

      <p className="text-[12.5px] font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--text-tertiary)" }}>
        Profile
      </p>
      <div className="rounded-2xl border mb-7 divide-y divide-[var(--border)]" style={{ borderColor: "var(--border)" }}>
        <Row label="Name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={commitName}
            className="bg-transparent outline-none text-right text-[14.5px] font-medium w-32"
            style={{ color: "var(--text)" }}
          />
        </Row>
        <Row label="Monthly budget">
          <div className="flex items-center gap-1">
            <span className="text-[14.5px]" style={{ color: "var(--text-tertiary)" }}>€</span>
            <input
              value={budget}
              inputMode="decimal"
              onChange={(e) => setBudget(e.target.value)}
              onBlur={commitBudget}
              className="bg-transparent outline-none text-right text-[14.5px] font-medium w-20 tabular"
              style={{ color: "var(--text)" }}
            />
          </div>
        </Row>
        <Row label="Currency">
          <span className="text-[14.5px]" style={{ color: "var(--text-tertiary)" }}>EUR (€)</span>
        </Row>
      </div>

      <p className="text-[12.5px] font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--text-tertiary)" }}>
        Appearance
      </p>
      <div
        className="flex rounded-full p-1 mb-7 border"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        {THEMES.map(({ key, label }) => {
          const active = state.theme === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setTheme(key)}
              className={cn("flex-1 rounded-full py-2 text-[13px] font-medium transition-colors")}
              style={{
                background: active ? "var(--bg)" : "transparent",
                color: active ? "var(--text)" : "var(--text-tertiary)",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleReset}
        className="w-full text-center py-3 text-[13.5px] font-medium"
        style={{ color: "var(--danger)" }}
      >
        Reset app
      </button>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5">
      <span className="text-[14.5px]" style={{ color: "var(--text)" }}>
        {label}
      </span>
      {children}
    </div>
  );
}
