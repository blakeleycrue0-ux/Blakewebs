import Reveal from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Contacto y briefing",
    text: "Me cuentas tu proyecto, tus objetivos y a quién quieres llegar.",
  },
  {
    n: "02",
    title: "Propuesta y diseño",
    text: "Diseño el concepto visual y te lo presento antes de escribir una línea de código.",
  },
  {
    n: "03",
    title: "Desarrollo",
    text: "Construyo la web a medida: código limpio, rápido y probado en todos los dispositivos.",
  },
  {
    n: "04",
    title: "Entrega y ajustes",
    text: "Revisamos juntos el resultado y afinamos hasta que quede exactamente como querías.",
  },
];

export default function Process() {
  return (
    <section id="proceso" className="mt-16 md:mt-24 max-w-[1400px] mx-auto px-2">
      <Reveal>
        <p className="font-display text-[13px] font-semibold tracking-wide uppercase text-slate-400">
          Proceso
        </p>
        <h2 className="mt-3 font-display text-[28px] md:text-[38px] font-medium tracking-tight text-[#0a1b33] max-w-xl">
          Cómo trabajamos
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08}>
            <div className="h-full bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm">
              <span className="font-display text-[13px] font-semibold text-slate-400">
                {s.n}
              </span>
              <h3 className="mt-3 font-display text-[16px] font-medium text-[#0a1b33]">
                {s.title}
              </h3>
              <p className="mt-2 text-[13.5px] text-[#64748b] leading-relaxed">
                {s.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
