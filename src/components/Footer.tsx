import { PHONE_DISPLAY, PHONE_TEL } from "../lib/contact";

export default function Footer() {
  return (
    <footer className="mt-10 max-w-[1400px] mx-auto px-2 py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[13px] text-slate-400">
        <p>Blakewebs © 2026</p>
        <a href={PHONE_TEL} className="hover:text-[#0a1b33] transition-colors">
          {PHONE_DISPLAY}
        </a>
      </div>
    </footer>
  );
}
