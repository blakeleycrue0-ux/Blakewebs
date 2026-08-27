import { PHONE_DISPLAY, PHONE_TEL } from "../lib/contact";
import { useLanguage } from "../lib/i18n";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-10 max-w-[1400px] mx-auto px-2 py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-slate-400">
        <p>{t.footer.rights}</p>
        <div className="flex items-center gap-4">
          <a href="/privacy-policy" className="hover:text-[#0a1b33] transition-colors">
            {t.footer.privacy}
          </a>
          <a href={PHONE_TEL} className="hover:text-[#0a1b33] transition-colors">
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </footer>
  );
}
