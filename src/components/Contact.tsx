import { motion } from "motion/react";
import Reveal from "./Reveal";
import { PHONE_DISPLAY, PHONE_TEL, PHONE_WHATSAPP } from "../lib/contact";

export default function Contact() {
  return (
    <section
      id="contacto"
      className="mt-16 md:mt-24 max-w-[1400px] mx-auto px-2"
    >
      <Reveal className="bg-[#0a152d] rounded-[40px] px-6 md:px-16 py-16 md:py-24 text-center">
        <p className="font-display text-[13px] font-semibold tracking-wide uppercase text-white/40">
          Contacto
        </p>
        <h2 className="mt-3 font-display text-[28px] md:text-[42px] font-medium tracking-tight text-white">
          Hablemos de tu proyecto
        </h2>
        <p className="mt-4 max-w-md mx-auto text-[14px] md:text-[15px] text-white/60 leading-relaxed">
          Sin formularios eternos ni esperas. Un mensaje y en marcha.
        </p>

        <p className="mt-10 font-display text-[40px] md:text-[64px] font-medium tracking-tight text-white">
          {PHONE_DISPLAY}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.a
            href={PHONE_WHATSAPP}
            target="_blank"
            rel="noopener"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center bg-white text-[#0a152d] text-[14px] font-semibold rounded-full px-7 py-3 w-full sm:w-auto"
          >
            Escribir por WhatsApp
          </motion.a>
          <motion.a
            href={PHONE_TEL}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center border border-white/25 text-white text-[14px] font-semibold rounded-full px-7 py-3 w-full sm:w-auto"
          >
            Llamar ahora
          </motion.a>
        </div>
      </Reveal>
    </section>
  );
}
