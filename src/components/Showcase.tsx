import { Fragment } from "react";
import Reveal from "./Reveal";
import { useLanguage } from "../lib/i18n";

export default function Showcase() {
  const { t } = useLanguage();

  return (
    <section className="mt-16 md:mt-24 max-w-[1400px] mx-auto px-2">
      <Reveal>
        <div className="relative rounded-[28px] md:rounded-[32px] bg-[#f1f2f4] border border-slate-200/60 p-5 md:p-12 overflow-hidden">
          <div className="mx-auto max-w-3xl rounded-2xl overflow-hidden border border-slate-200 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] bg-white">
            <div className="flex items-center gap-1.5 px-4 py-3 bg-[#0a0f1a]">
              <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
              <span className="ml-3 text-[11px] text-white/40 font-mono">
                blakewebs.com
              </span>
            </div>
            <img src="/showcase.png" alt="" className="w-full block" />
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] md:text-[12px] font-semibold uppercase tracking-wide text-slate-400">
          {t.showcase.tags.map((tag, i) => (
            <Fragment key={tag}>
              {i > 0 && (
                <span className="w-1 h-1 rounded-full bg-slate-300" aria-hidden="true" />
              )}
              <span>{tag}</span>
            </Fragment>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
