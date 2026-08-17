import { Home, Layers, Route, Phone } from "lucide-react";
import { PHONE_TEL } from "../lib/contact";

const ITEMS = [
  { href: "#top", label: "Inicio", icon: Home },
  { href: "#packs", label: "Packs", icon: Layers },
  { href: "#proceso", label: "Proceso", icon: Route },
];

export default function MobileTabBar() {
  return (
    <nav
      aria-label="Navegación inferior"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/70"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-4 h-16">
        {ITEMS.map(({ href, label, icon: Icon }) => (
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
          <span className="text-[10px] font-medium">Llamar</span>
        </a>
      </div>
    </nav>
  );
}
