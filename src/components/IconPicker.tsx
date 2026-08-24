import { ICONS, ICON_OPTIONS } from "../lib/icons";
import type { IconKey } from "../lib/types";
import { cn } from "../lib/cn";

export default function IconPicker({
  value,
  onChange,
}: {
  value: IconKey;
  onChange: (icon: IconKey) => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-2.5">
      {ICON_OPTIONS.map(({ key, label }) => {
        const Icon = ICONS[key];
        const selected = value === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            aria-label={label}
            aria-pressed={selected}
            className={cn(
              "aspect-square rounded-2xl flex items-center justify-center border transition-colors"
            )}
            style={{
              borderColor: selected ? "var(--accent)" : "var(--border)",
              background: selected ? "var(--accent-soft)" : "var(--bg)",
            }}
          >
            <Icon
              className="w-5 h-5"
              strokeWidth={1.8}
              style={{ color: selected ? "var(--accent)" : "var(--text-secondary)" }}
            />
          </button>
        );
      })}
    </div>
  );
}
