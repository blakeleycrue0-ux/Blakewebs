import { Home, Activity, LayoutGrid, Settings } from "lucide-react";
import type { Screen } from "../lib/nav";

const TABS: { key: Screen; label: string; icon: typeof Home }[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "activity", label: "Activity", icon: Activity },
  { key: "categories", label: "Categories", icon: LayoutGrid },
  { key: "settings", label: "Settings", icon: Settings },
];

export default function BottomNav({
  active,
  onChange,
}: {
  active: Screen;
  onChange: (screen: Screen) => void;
}) {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-30 border-t"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
      aria-label="Primary"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 h-16">
        {TABS.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              className="flex flex-col items-center justify-center gap-1"
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className="w-5 h-5"
                strokeWidth={isActive ? 2.2 : 1.8}
                style={{ color: isActive ? "var(--text)" : "var(--text-tertiary)" }}
              />
              <span
                className="text-[10.5px] font-medium"
                style={{ color: isActive ? "var(--text)" : "var(--text-tertiary)" }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
