const STACK = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "React",
  "Figma",
  "Vite",
  "Tailwind",
  "GitHub",
];

function MarqueeCard({ label }: { label: string }) {
  return (
    <div className="group relative h-24 w-40 shrink-0 flex items-center justify-center rounded-full bg-white border border-slate-200/60 shadow-sm hover:border-slate-300 transition-all overflow-hidden">
      <span className="font-display text-[15px] font-medium text-slate-500 group-hover:text-[#0a1b33] transition-colors">
        {label}
      </span>
    </div>
  );
}

export default function MarqueeScroller() {
  const items = [...STACK, ...STACK];

  return (
    <div
      className="mt-10 w-full max-w-[1400px] mx-auto overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="flex items-center gap-4 w-max animate-[marquee-scroll_26s_linear_infinite] hover:[animation-play-state:paused]"
      >
        {items.map((label, i) => (
          <MarqueeCard key={`${label}-${i}`} label={label} />
        ))}
      </div>
    </div>
  );
}
