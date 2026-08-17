import { Home, Layers, Route, Phone } from "lucide-react";
import { PHONE_TEL } from "../lib/contact";
import { useLanguage } from "../lib/i18n";

export default function MobileTabBar() {
  const { t } = useLanguage();

  const items = [
    { href: "#top", label: t.tabbar.inicio, icon: Home },
    { href: "#packs", label: t.tabbar.packs, icon: Layers },
    { href: "#proceso", label: t.tabbar.proceso, icon: Route },
  ];

  return (
    <nav
      aria-label="Navegación inferior"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/70"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-4 h-16">
        {items.map(({ href, label, icon: Icon }) => (
          <a
            key={label}
            href={href}
            className="flex flex-col items-center justify-center gap-1 text-slate-400 active:text-[#0a1b33] transition-colors"
          >
            <Icon className="w-5 h-5" strokeWidth={1.8} />
            <span className="text-[10px] font-medium">{label}</span>
          </a>
        ))}
        <a
          href={PHONE_TEL}
          className="flex flex-col items-center justify-center gap-1 text-slate-400 active:text-[#0a1b33] transition-colors"
        >
          <Phone className="w-5 h-5" strokeWidth={1.8} />
          <span className="text-[10px] font-medium">{t.tabbar.llamar}</span>
        </a>
      </div>
    </nav>
  );
}
