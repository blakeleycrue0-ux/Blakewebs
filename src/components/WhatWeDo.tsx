import Reveal from "./Reveal";
import Timeline from "./Timeline";
import { useLanguage } from "../lib/i18n";

export default function WhatWeDo() {
  const { t } = useLanguage();

  return (
    <section id="que-hago" className="mt-16 md:mt-24 max-w-[1400px] mx-auto px-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <Reveal>
          <p className="font-display text-[13px] font-semibold tracking-wide uppercase text-slate-400">
            {t.whatWeDo.eyebrow}
          </p>
          <h2 className="mt-3 font-serif italic text-[30px] md:text-[40px] font-medium tracking-tight text-[#0a1b33] max-w-md">
            {t.whatWeDo.title}
          </h2>
          <p className="mt-4 max-w-md text-[14px] md:text-[15px] text-[#64748b] leading-relaxed">
            {t.whatWeDo.lede}
          </p>
        </Reveal>

        <Timeline items={t.whatWeDo.items} />
      </div>
    </section>
  );
}
