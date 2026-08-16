import Reveal from "./Reveal";

const FEATURES = [
  {
    title: "Código limpio",
    text: "Marcado semántico, sin dependencias innecesarias. Fácil de mantener y de escalar cuando tu negocio crezca.",
  },
  {
    title: "Carga rápida",
    text: "Rendimiento cuidado al detalle. Una web lenta pierde clientes antes de que lean la primera línea.",
  },
  {
    title: "Diseño a medida",
    text: "Cada sección pensada para tu marca y tu cliente ideal. Cero plantillas, cero copiar y pegar.",
  },
];

export default function WhatWeDo() {
  return (
    <section id="que-hago" className="mt-16 md:mt-24 max-w-[1400px] mx-auto px-2">
      <Reveal>
        <p className="font-display text-[13px] font-semibold tracking-wide uppercase text-slate-400">
          Qué hago
        </p>
        <h2 className="mt-3 font-display text-[28px] md:text-[38px] font-medium tracking-tight text-[#0a1b33] max-w-xl">
          Diseño y desarrollo web a medida
        </h2>
        <p className="mt-4 max-w-xl text-[14px] md:text-[15px] text-[#64748b] leading-relaxed">
          Nada de plantillas genéricas ni plugins acumulados. Cada proyecto
          se diseña y se programa desde cero.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.08}>
            <div className="h-full bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm">
              <h3 className="font-display text-[16px] font-medium text-[#0a1b33]">
                {f.title}
              </h3>
              <p className="mt-2 text-[13.5px] text-[#64748b] leading-relaxed">
                {f.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
