import { useLanguage } from "../lib/i18n";
import { cn } from "../lib/cn";

export default function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={cn(
        "flex items-center gap-0.5 bg-slate-100 rounded-full p-0.5",
        className
      )}
      role="group"
      aria-label="Idioma / Language"
    >
      {(["es", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={cn(
            "px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide transition-colors",
            lang === code
              ? "bg-white text-[#0a1b33] shadow-sm"
              : "text-slate-400 hover:text-slate-600"
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
