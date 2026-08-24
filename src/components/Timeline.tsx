import Reveal from "./Reveal";

export type TimelineItem = {
  index: string;
  title: string;
  text: string;
};

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative flex flex-col">
      <div
        className="absolute left-[19px] top-2 bottom-2 w-px bg-slate-200"
        aria-hidden="true"
      />
      {items.map((item, i) => (
        <Reveal key={item.index} delay={i * 0.08} className="relative flex gap-6 pb-10 last:pb-0">
          <span className="relative z-10 shrink-0 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center font-serif italic text-[15px] text-[#0a1b33]">
            {item.index}
          </span>
          <div className="pt-1.5">
            <h3 className="font-display text-[17px] font-medium text-[#0a1b33]">
              {item.title}
            </h3>
            <p className="mt-1.5 text-[13.5px] text-[#64748b] leading-relaxed max-w-md">
              {item.text}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
