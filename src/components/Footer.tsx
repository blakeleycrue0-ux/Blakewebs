import { PHONE_DISPLAY, PHONE_TEL } from "../lib/contact";
import { useLanguage } from "../lib/i18n";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-10 max-w-[1400px] mx-auto px-2 py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[13px] text-slate-400">
        <p>{t.footer.rights}</p>
        <a href={PHONE_TEL} className="hover:text-[#0a1b33] transition-colors">
          {PHONE_DISPLAY}
        </a>
      </div>
    </footer>
  );
}
