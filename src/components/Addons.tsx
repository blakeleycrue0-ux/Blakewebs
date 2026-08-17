import Reveal from "./Reveal";
import { useLanguage } from "../lib/i18n";

export default function Addons() {
  const { t } = useLanguage();

  return (
    <section id="addons" className="mt-16 md:mt-24 max-w-[1400px] mx-auto px-2">
      <Reveal>
        <p className="font-display text-[13px] font-semibold tracking-wide uppercase text-slate-400">
          {t.addons.eyebrow}
        </p>
        <h2 className="mt-3 font-display text-[28px] md:text-[38px] font-medium tracking-tight text-[#0a1b33] max-w-xl">
          {t.addons.title}
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-8 bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
        <ul className="divide-y divide-slate-100">
          {t.addons.items.map((a) => (
            <li
              key={a.name}
              className="flex items-center justify-between gap-4 px-6 py-4"
            >
              <span className="font-display text-[15px] font-medium text-[#0a1b33]">
                {a.name}
              </span>
              <span className="text-[13.5px] text-[#64748b] whitespace-nowrap">
                {a.price}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
