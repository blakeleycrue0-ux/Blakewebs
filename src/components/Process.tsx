import Reveal from "./Reveal";
import Timeline from "./Timeline";

const STEPS = [
  {
    index: "01",
    title: "Contacto y briefing",
    text: "Me cuentas tu proyecto, tus objetivos y a quién quieres llegar.",
  },
  {
    index: "02",
    title: "Propuesta y diseño",
    text: "Diseño el concepto visual y te lo presento antes de escribir una línea de código.",
  },
  {
    index: "03",
    title: "Desarrollo",
    text: "Construyo la web a medida: código limpio, rápido y probado en todos los dispositivos.",
  },
  {
    index: "04",
    title: "Entrega y ajustes",
    text: "Revisamos juntos el resultado y afinamos hasta que quede exactamente como querías.",
  },
];

export default function Process() {
  return (
    <section id="proceso" className="mt-16 md:mt-24 max-w-[1400px] mx-auto px-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <Reveal>
          <p className="font-display text-[13px] font-semibold tracking-wide uppercase text-slate-400">
            Proceso
          </p>
          <h2 className="mt-3 font-serif italic text-[30px] md:text-[40px] font-medium tracking-tight text-[#0a1b33] max-w-md">
            Cómo trabajamos
          </h2>
          <p className="mt-4 max-w-md text-[14px] md:text-[15px] text-[#64748b] leading-relaxed">
            Cuatro pasos, sin sorpresas, del primer mensaje a la web
            publicada.
          </p>
        </Reveal>

        <Timeline items={STEPS} />
      </div>
    </section>
  );
}
