import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { PHONE_WHATSAPP } from "../lib/contact";

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={PHONE_WHATSAPP}
      target="_blank"
      rel="noopener"
      aria-label="Escribir por WhatsApp"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-24 md:bottom-8 right-5 md:right-8 z-40 w-14 h-14 rounded-full bg-[#0a152d] text-white flex items-center justify-center shadow-[0_12px_30px_rgba(10,21,45,0.35)]"
    >
      <MessageCircle className="w-6 h-6" strokeWidth={1.8} />
    </motion.a>
  );
}
