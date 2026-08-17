import { motion } from "motion/react";
import Reveal from "./Reveal";
import { cn } from "../lib/cn";
import { useLanguage } from "../lib/i18n";

export default function Packs() {
  const { t } = useLanguage();

  return (
    <section id="packs" className="mt-16 md:mt-24 max-w-[1400px] mx-auto px-2">
      <Reveal>
        <p className="font-display text-[13px] font-semibold tracking-wide uppercase text-slate-400">
          {t.packs.eyebrow}
        </p>
        <h2 className="mt-3 font-display text-[28px] md:text-[38px] font-medium tracking-tight text-[#0a1b33] max-w-xl">
          {t.packs.title}
        </h2>
        <p className="mt-4 max-w-xl text-[14px] md:text-[15px] text-[#64748b] leading-relaxed">
          {t.packs.lede}
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {t.packs.items.map((pack, i) => {
          const featured = i === 1;
          return (
            <Reveal key={pack.name} delay={i * 0.08}>
              <div
                className={cn(
                  "h-full flex flex-col rounded-3xl p-7 border shadow-sm",
                  featured
                    ? "bg-[#0a152d] border-[#0a152d] text-white"
                    : "bg-white border-slate-200/60 text-[#0a1b33]"
                )}
              >
                {featured && (
                  <span className="self-start mb-3 text-[11px] font-semibold uppercase tracking-wide bg-white/15 text-white rounded-full px-3 py-1">
                    {t.packs.featured}
                  </span>
                )}
                <h3 className="font-display text-[20px] font-medium">
                  {pack.name}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-[13.5px] leading-relaxed",
                    featured ? "text-white/70" : "text-[#64748b]"
                  )}
                >
                  {pack.desc}
                </p>
                <p className="mt-6 font-display text-[30px] font-medium">
                  {pack.price}
                </p>
                <ul className="mt-6 flex flex-col gap-3 flex-1">
                  {pack.features.map((f) => (
                    <li
                      key={f}
                      className={cn(
                        "text-[13.5px] pl-4 relative",
                        featured ? "text-white/80" : "text-[#64748b]"
                      )}
                    >
                      <span
                        className={cn(
                          "absolute left-0 top-[9px] w-2.5 h-px",
                          featured ? "bg-white/60" : "bg-slate-400"
                        )}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <motion.a
                  href="#contacto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-[13.5px] font-semibold transition-colors",
                    featured
                      ? "bg-white text-[#0a152d]"
                      : "bg-[#0a152d] text-white"
                  )}
                >
                  {t.packs.cta}
                </motion.a>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
