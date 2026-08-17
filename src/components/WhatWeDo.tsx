import Reveal from "./Reveal";
import Timeline from "./Timeline";

const FEATURES = [
  {
    index: "i.",
    title: "Código limpio",
    text: "Marcado semántico, sin dependencias innecesarias. Fácil de mantener y de escalar cuando tu negocio crezca.",
  },
  {
    index: "ii.",
    title: "Carga rápida",
    text: "Rendimiento cuidado al detalle. Una web lenta pierde clientes antes de que lean la primera línea.",
  },
  {
    index: "iii.",
    title: "Diseño a medida",
    text: "Cada sección pensada para tu marca y tu cliente ideal. Cero plantillas, cero copiar y pegar.",
  },
];

export default function WhatWeDo() {
  return (
    <section id="que-hago" className="mt-16 md:mt-24 max-w-[1400px] mx-auto px-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <Reveal>
          <p className="font-display text-[13px] font-semibold tracking-wide uppercase text-slate-400">
            Qué hago
          </p>
          <h2 className="mt-3 font-serif italic text-[30px] md:text-[40px] font-medium tracking-tight text-[#0a1b33] max-w-md">
            Diseño y desarrollo web a medida
          </h2>
          <p className="mt-4 max-w-md text-[14px] md:text-[15px] text-[#64748b] leading-relaxed">
            Nada de plantillas genéricas ni plugins acumulados. Cada proyecto
            se diseña y se programa desde cero, pensado para tu marca y tu
            cliente ideal.
          </p>
        </Reveal>

        <Timeline items={FEATURES} />
      </div>
    </section>
  );
}
