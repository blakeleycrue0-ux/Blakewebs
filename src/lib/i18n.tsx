import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "es" | "en";

const es = {
  nav: { packs: "Packs", proceso: "Proceso", contact: "Contactar" },
  tabbar: { inicio: "Inicio", packs: "Packs", proceso: "Proceso", llamar: "Llamar" },
  hero: {
    badge1: "Diseño & desarrollo web",
    badge2: "Sin permanencia · Respuesta en 24h",
    line1: "El punto de partida",
    line2: "de tu presencia online",
    sub: "Diseño y desarrollo de páginas web a medida: código limpio, rápido y sin plantillas genéricas, pensado para que tu negocio destaque.",
    cta: "Contactar",
  },
  showcase: {
    tags: ["Diseño web", "SEO", "Responsive", "Rendimiento"],
  },
  whatWeDo: {
    eyebrow: "Qué hago",
    title: "Diseño y desarrollo web a medida",
    lede: "Nada de plantillas genéricas ni plugins acumulados. Cada proyecto se diseña y se programa desde cero, pensado para tu marca y tu cliente ideal.",
    items: [
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
    ],
  },
  packs: {
    eyebrow: "Packs",
    title: "Elige tu punto de partida",
    lede: "Tres formas de empezar. Todas con el mismo cuidado por el detalle.",
    featured: "Más popular",
    cta: "Quiero este pack",
    items: [
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
      },
    ],
  },
  addons: {
    eyebrow: "Add-ons",
    title: "Súmale lo que necesites",
    items: [
      { name: "Mantenimiento mensual", price: "Desde 30€/mes" },
      { name: "SEO avanzado", price: "Desde 100€" },
      { name: "Copywriting", price: "Desde 80€" },
      { name: "Logo / identidad visual", price: "Desde 60€" },
      { name: "Página adicional", price: "40€ / página" },
      { name: "Gestión de redes sociales", price: "A consultar" },
      { name: "Dominio + hosting anual", price: "Desde 40€/año" },
    ],
  },
  process: {
    eyebrow: "Proceso",
    title: "Cómo trabajamos",
    lede: "Cuatro pasos, sin sorpresas, del primer mensaje a la web publicada.",
    items: [
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
    ],
  },
  contact: {
    eyebrow: "Contacto",
    title: "Hablemos de tu proyecto",
    lede: "Sin formularios eternos ni esperas. Un mensaje y en marcha.",
    whatsapp: "Escribir por WhatsApp",
    call: "Llamar ahora",
  },
  footer: {
    rights: "Blakewebs © 2026",
  },
};

const en: typeof es = {
  nav: { packs: "Packages", proceso: "Process", contact: "Contact" },
  tabbar: { inicio: "Home", packs: "Packages", proceso: "Process", llamar: "Call" },
  hero: {
    badge1: "Web design & development",
    badge2: "No contracts · Reply within 24h",
    line1: "The starting point",
    line2: "of your online presence",
    sub: "Custom web design and development: clean code, fast, no generic templates — built to make your business stand out.",
    cta: "Get in touch",
  },
  showcase: {
    tags: ["Web design", "SEO", "Responsive", "Performance"],
  },
  whatWeDo: {
    eyebrow: "What I do",
    title: "Custom web design & development",
    lede: "No generic templates or piled-up plugins. Every project is designed and coded from scratch, built around your brand and your ideal customer.",
    items: [
      {
        index: "i.",
        title: "Clean code",
        text: "Semantic markup, no unnecessary dependencies. Easy to maintain and scale as your business grows.",
      },
      {
        index: "ii.",
        title: "Fast loading",
        text: "Performance cared for down to the detail. A slow site loses customers before they read the first line.",
      },
      {
        index: "iii.",
        title: "Custom design",
        text: "Every section designed around your brand and your ideal customer. No templates, no copy-paste.",
      },
    ],
  },
  packs: {
    eyebrow: "Packages",
    title: "Choose your starting point",
    lede: "Three ways to get started. All with the same care for detail.",
    featured: "Most popular",
    cta: "I want this package",
    items: [
      {
        name: "Basic",
        desc: "Perfect for a solid, straightforward online presence.",
        price: "€250–350",
        features: [
          "One-page landing site",
          "Custom design",
          "Fully responsive",
          "Contact form",
          "Basic hosting included",
        ],
      },
      {
        name: "Pro",
        desc: "A complete site with real presence, ready to capture clients.",
        price: "€500–700",
        features: [
          "Multi-page site (up to 5 sections)",
          "Animations & interactions",
          "Basic SEO",
          "Social media integration",
          "Everything in Basic",
        ],
      },
      {
        name: "Premium",
        desc: "For e-commerce projects or custom needs with no limits.",
        price: "From €900",
        features: [
          "E-commerce or custom system",
          "Advanced animations",
          "Domain & 1st year hosting included",
          "Everything in Pro",
        ],
      },
    ],
  },
  addons: {
    eyebrow: "Add-ons",
    title: "Add whatever you need",
    items: [
      { name: "Monthly maintenance", price: "From €30/mo" },
      { name: "Advanced SEO", price: "From €100" },
      { name: "Copywriting", price: "From €80" },
      { name: "Logo / visual identity", price: "From €60" },
      { name: "Extra page", price: "€40 / page" },
      { name: "Social media management", price: "On request" },
      { name: "Domain + annual hosting", price: "From €40/yr" },
    ],
  },
  process: {
    eyebrow: "Process",
    title: "How I work",
    lede: "Four steps, no surprises, from the first message to your site going live.",
    items: [
      {
        index: "01",
        title: "Contact & briefing",
        text: "You tell me about your project, your goals and who you want to reach.",
      },
      {
        index: "02",
        title: "Proposal & design",
        text: "I design the visual concept and present it before writing a single line of code.",
      },
      {
        index: "03",
        title: "Development",
        text: "I build the custom site: clean code, fast, and tested on every device.",
      },
      {
        index: "04",
        title: "Delivery & tweaks",
        text: "We review the result together and fine-tune it until it's exactly what you wanted.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's talk about your project",
    lede: "No endless forms, no waiting around. One message and we're off.",
    whatsapp: "Message on WhatsApp",
    call: "Call now",
  },
  footer: {
    rights: "Blakewebs © 2026",
  },
};

export type Dict = typeof es;

const dictionaries: Record<Lang, Dict> = { es, en };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "blakewebs-lang";

function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "es";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "es" || stored === "en") return stored;
  return (window.navigator.language || "es").toLowerCase().startsWith("en")
    ? "en"
    : "es";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  return (
    <LanguageContext.Provider
      value={{ lang, setLang: setLangState, t: dictionaries[lang] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
