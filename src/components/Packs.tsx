import { motion } from "motion/react";
import Reveal from "./Reveal";
import { cn } from "../lib/cn";

const PACKS = [
  {
    name: "Básico",
    desc: "Ideal para presentarte online con una página sólida y directa.",
    price: "250–350€",
    features: [
      "Landing de una página",
      "Diseño a medida",
      "Totalmente responsive",
      "Formulario de contacto",
      "Hosting básico incluido",
    ],
    featured: false,
  },
  {
    name: "Pro",
    desc: "Una web completa, con presencia real y lista para captar clientes.",
    price: "500–700€",
    features: [
      "Web multipágina (hasta 5 secciones)",
      "Animaciones e interacciones",
      "SEO básico",
      "Integración con redes sociales",
      "Todo lo del pack Básico",
    ],
    featured: true,
  },
  {
    name: "Premium",
    desc: "Para proyectos con e-commerce o necesidades a medida sin límites.",
    price: "Desde 900€",
    features: [
      "E-commerce o sistema a medida",
      "Animaciones avanzadas",
      "Dominio y hosting 1er año incluidos",
      "Todo lo del pack Pro",
    ],
    featured: false,
  },
];

export default function Packs() {
  return (
    <section id="packs" className="mt-16 md:mt-24 max-w-[1400px] mx-auto px-2">
      <Reveal>
        <p className="font-display text-[13px] font-semibold tracking-wide uppercase text-slate-400">
          Packs
        </p>
        <h2 className="mt-3 font-display text-[28px] md:text-[38px] font-medium tracking-tight text-[#0a1b33] max-w-xl">
          Elige tu punto de partida
        </h2>
        <p className="mt-4 max-w-xl text-[14px] md:text-[15px] text-[#64748b] leading-relaxed">
          Tres formas de empezar. Todas con el mismo cuidado por el detalle.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {PACKS.map((pack, i) => (
          <Reveal key={pack.name} delay={i * 0.08}>
            <div
              className={cn(
                "h-full flex flex-col rounded-3xl p-7 border shadow-sm",
                pack.featured
                  ? "bg-[#0a152d] border-[#0a152d] text-white"
                  : "bg-white border-slate-200/60 text-[#0a1b33]"
              )}
            >
              {pack.featured && (
                <span className="self-start mb-3 text-[11px] font-semibold uppercase tracking-wide bg-white/15 text-white rounded-full px-3 py-1">
                  Más popular
                </span>
              )}
              <h3 className="font-display text-[20px] font-medium">
                {pack.name}
              </h3>
              <p
                className={cn(
                  "mt-2 text-[13.5px] leading-relaxed",
                  pack.featured ? "text-white/70" : "text-[#64748b]"
                )}
              >
                {pack.desc}
              </p>
              <p className="mt-6 font-display text-[30px] font-medium">
                {pack.price}
              </p>
              <ul className="mt-6 flex flex-col gap-3 flex-1">
                {pack.features.map((f) => (
                  <li
                    key={f}
                    className={cn(
                      "text-[13.5px] pl-4 relative",
                      pack.featured ? "text-white/80" : "text-[#64748b]"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute left-0 top-[9px] w-2.5 h-px",
                        pack.featured ? "bg-white/60" : "bg-slate-400"
                      )}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <motion.a
                href="#contacto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-[13.5px] font-semibold transition-colors",
                  pack.featured
                    ? "bg-white text-[#0a152d]"
                    : "bg-[#0a152d] text-white"
                )}
              >
                Quiero este pack
              </motion.a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
