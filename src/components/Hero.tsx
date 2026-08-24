import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { PHONE_WHATSAPP } from "../lib/contact";
import { useLanguage } from "../lib/i18n";
import LanguageToggle from "./LanguageToggle";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full max-w-[1400px] mx-auto rounded-[32px] sm:rounded-[40px] md:rounded-[48px] bg-white border border-slate-200/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] overflow-hidden h-[560px] sm:h-[580px] md:h-[600px] flex flex-col">
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 transition-transform duration-1000"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260505_101331_74f9b798-3f00-4e86-8a01-377aa16ffeaa.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 flex-1 px-6 sm:px-8 md:px-16 pt-12 md:pt-16 flex flex-col items-start"
      >
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="inline-flex items-center bg-white/90 backdrop-blur-md border border-slate-200/60 rounded-full px-4 py-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            {t.hero.badge1}
          </span>
          <span className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-slate-200/60 rounded-full px-4 py-1.5 text-[10px] sm:text-[11px] font-medium text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0a152d]" />
            {t.hero.badge2}
          </span>
        </div>
        <h1 className="font-serif text-[32px] sm:text-[44px] md:text-[58px] font-medium leading-[1.08] tracking-tight text-[#0a1b33]">
          {t.hero.line1}
          <br />
          <em className="italic">{t.hero.line2}</em>
        </h1>
        <p className="mt-5 max-w-[420px] font-sans text-[14px] md:text-[15px] text-[#64748b] leading-relaxed">
          {t.hero.sub}
        </p>
        <motion.a
          href="#contacto"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 inline-flex items-center gap-2 bg-[#0a152d] text-white text-[14px] font-semibold rounded-full px-7 py-3"
        >
          {t.hero.cta}
        </motion.a>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 w-full px-4 flex justify-center">
        <motion.nav
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="flex items-center bg-white/90 backdrop-blur-2xl px-1.5 py-1.5 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-slate-200/40 max-w-full"
        >
          <div className="w-9 h-9 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0">
            <span className="font-display text-[14px] font-semibold text-[#0a1b33]">
              B
            </span>
          </div>
          <a
            href="#packs"
            className="hidden md:inline-block ml-2 px-3 py-2 text-[12px] font-semibold text-slate-500 hover:text-[#0a1b33] transition-colors"
          >
            {t.nav.packs}
          </a>
          <a
            href="#proceso"
            className="hidden md:inline-block px-3 py-2 text-[12px] font-semibold text-slate-500 hover:text-[#0a1b33] transition-colors"
          >
            {t.nav.proceso}
          </a>
          <LanguageToggle className="mx-1 md:mx-1 ml-2" />
          <a
            href={PHONE_WHATSAPP}
            target="_blank"
            rel="noopener"
            className="ml-1 inline-flex items-center gap-1 bg-white px-4 sm:px-5 py-2 rounded-full text-[12px] font-semibold text-[#0a1b33] border border-slate-200/60 shadow-sm hover:border-slate-300 transition-all whitespace-nowrap"
          >
            {t.nav.contact}
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </motion.nav>
      </div>
    </section>
  );
}
