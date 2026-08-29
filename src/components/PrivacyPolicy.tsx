import { ChevronLeft } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL, PHONE_WHATSAPP } from "../lib/contact";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10 first:mt-0">
      <h2 className="font-display text-[18px] md:text-[20px] font-semibold text-[#0a1b33]">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-[14px] md:text-[15px] text-slate-600 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen w-full bg-[#f9fafb] px-3 sm:px-4 md:px-8 py-6 md:py-10">
      <header className="w-full max-w-[1400px] mx-auto flex items-center justify-between px-2">
        <a href="/" className="flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="Blakewebs"
            className="w-9 h-9 rounded-xl shadow-sm shrink-0"
          />
          <span className="font-display text-[14px] font-semibold text-[#0a1b33]">
            Blakewebs
          </span>
        </a>
        <a
          href="/"
          className="inline-flex items-center gap-1 text-[12px] md:text-[13px] font-semibold text-slate-500 hover:text-[#0a1b33] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver al inicio
        </a>
      </header>

      <main className="w-full max-w-[900px] mx-auto mt-8 md:mt-12">
        <div className="bg-white rounded-[32px] sm:rounded-[40px] border border-slate-200/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] px-6 sm:px-10 md:px-16 py-12 md:py-16">
            <p className="font-display text-[13px] font-semibold tracking-wide uppercase text-slate-400">
              Legal
            </p>
            <h1 className="mt-3 font-serif text-[30px] sm:text-[38px] md:text-[46px] font-medium leading-[1.1] tracking-tight text-[#0a1b33]">
              Política de Privacidad
            </h1>
            <p className="mt-4 text-[13px] text-slate-400">
              Última actualización: 27 de agosto de 2026
            </p>

            <p className="mt-8 text-[14px] md:text-[15px] text-slate-600 leading-relaxed">
              En Blakewebs nos tomamos en serio la privacidad de las personas
              que visitan esta web. Este documento explica qué datos
              recopilamos, con qué finalidad, durante cuánto tiempo los
              conservamos y qué derechos puedes ejercer sobre ellos, de
              acuerdo con el Reglamento (UE) 2016/679 (RGPD) y la Ley
              Orgánica 3/2018 de Protección de Datos Personales y garantía
              de los derechos digitales (LOPDGDD).
            </p>

            <Section title="1. Responsable del tratamiento">
              <ul className="space-y-1">
                <li>
                  <span className="font-semibold text-[#0a1b33]">
                    Titular / Razón social:
                  </span>{" "}
                  [AÑADIR DATO]
                </li>
                <li>
                  <span className="font-semibold text-[#0a1b33]">
                    NIF / CIF:
                  </span>{" "}
                  [AÑADIR DATO]
                </li>
                <li>
                  <span className="font-semibold text-[#0a1b33]">
                    Domicilio:
                  </span>{" "}
                  [AÑADIR DATO]
                </li>
                <li>
                  <span className="font-semibold text-[#0a1b33]">
                    Teléfono:
                  </span>{" "}
                  {PHONE_DISPLAY}
                </li>
                <li>
                  <span className="font-semibold text-[#0a1b33]">
                    Correo electrónico de contacto:
                  </span>{" "}
                  [AÑADIR DATO]
                </li>
              </ul>
            </Section>

            <Section title="2. Datos personales que recopilamos">
              <p>
                Actualmente esta web no dispone de formularios de contacto
                ni de registro: el único canal de contacto directo es el
                teléfono y WhatsApp. Los datos que se recopilan son los
                siguientes:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <span className="font-semibold text-[#0a1b33]">
                    Datos de contacto directo:
                  </span>{" "}
                  si nos llamas o nos escribes por WhatsApp, accedemos a tu
                  número de teléfono y al contenido de la conversación que
                  decidas compartir (por ejemplo, tu nombre o los detalles
                  de tu proyecto). Estas conversaciones se gestionan a
                  través de los servicios de telefonía y de WhatsApp
                  (Meta Platforms, Inc.), y quedan sujetas también a la
                  política de privacidad de dicho servicio.
                </li>
                <li>
                  <span className="font-semibold text-[#0a1b33]">
                    Datos de navegación:
                  </span>{" "}
                  al visitar la web se recogen de forma automática datos
                  técnicos de tu dispositivo y navegación (dirección IP,
                  tipo de navegador, páginas visitadas, tiempo de
                  permanencia, origen del tráfico) a través de Google
                  Analytics y, en su caso, Google AdSense. Consulta la
                  sección de cookies para más detalle.
                </li>
              </ul>
              <p>
                Si en el futuro se incorpora un formulario de contacto u
                otro medio de recogida de datos, esta política se
                actualizará para reflejarlo.
              </p>
            </Section>

            <Section title="3. Finalidad del tratamiento">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  Atender tus consultas y solicitudes de presupuesto sobre
                  servicios de diseño y desarrollo web.
                </li>
                <li>
                  Gestionar la relación comercial y, en su caso, la
                  prestación del servicio contratado.
                </li>
                <li>
                  Analizar el uso de la web (páginas más visitadas, origen
                  del tráfico, rendimiento) para mejorar su funcionamiento
                  y contenidos, mediante Google Analytics.
                </li>
                <li>
                  Mostrar publicidad, en su caso, a través de Google
                  AdSense.
                </li>
              </ul>
            </Section>

            <Section title="4. Base legal">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <span className="font-semibold text-[#0a1b33]">
                    Contacto telefónico o por WhatsApp:
                  </span>{" "}
                  interés legítimo (art. 6.1.f RGPD), ya que eres tú quien
                  inicia el contacto de forma voluntaria para solicitar
                  información.
                </li>
                <li>
                  <span className="font-semibold text-[#0a1b33]">
                    Cookies analíticas y publicitarias:
                  </span>{" "}
                  consentimiento del usuario (art. 6.1.a RGPD), prestado a
                  través del panel de configuración de cookies.
                </li>
              </ul>
            </Section>

            <Section title="5. Conservación de los datos">
              <p>
                Los datos derivados de una conversación telefónica o por
                WhatsApp se conservan únicamente durante el tiempo necesario
                para gestionar tu consulta o, en caso de contratar un
                servicio, durante la duración de la relación comercial y los
                plazos legales de conservación aplicables (fiscales,
                contables). Los datos de navegación recogidos por Google
                Analytics se conservan según la configuración de retención
                de dicha herramienta.
              </p>
            </Section>

            <Section title="6. Destinatarios y encargados del tratamiento">
              <p>
                No cedemos tus datos a terceros salvo obligación legal.
                Para el funcionamiento de la web recurrimos a los
                siguientes proveedores, que actúan como encargados del
                tratamiento o bajo su propia política de privacidad:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <span className="font-semibold text-[#0a1b33]">
                    Netlify, Inc.
                  </span>{" "}
                  — alojamiento (hosting) de la web.
                </li>
                <li>
                  <span className="font-semibold text-[#0a1b33]">
                    Google LLC
                  </span>{" "}
                  — Google Analytics (medición de audiencia) y Google
                  AdSense (publicidad).
                </li>
                <li>
                  <span className="font-semibold text-[#0a1b33]">
                    Meta Platforms, Inc.
                  </span>{" "}
                  — WhatsApp, como canal de contacto.
                </li>
              </ul>
              <p>
                Algunos de estos proveedores pueden estar ubicados fuera del
                Espacio Económico Europeo. En esos casos, la transferencia
                se ampara en las garantías previstas por el RGPD (como las
                cláusulas contractuales tipo de la Comisión Europea).
              </p>
            </Section>

            <Section title="7. Derechos del usuario">
              <p>
                Puedes ejercer en cualquier momento tus derechos de:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Acceso a tus datos personales.</li>
                <li>Rectificación de datos inexactos o incompletos.</li>
                <li>Supresión de tus datos.</li>
                <li>Oposición al tratamiento.</li>
                <li>Limitación del tratamiento.</li>
                <li>Portabilidad de tus datos.</li>
              </ul>
              <p>
                Para ello, escríbenos a{" "}
                <span className="font-semibold text-[#0a1b33]">
                  [AÑADIR DATO]
                </span>{" "}
                o llámanos al {PHONE_DISPLAY}. Si consideras que no hemos
                atendido correctamente tu solicitud, tienes derecho a
                presentar una reclamación ante la Agencia Española de
                Protección de Datos (AEPD) —{" "}
                <a
                  href="https://www.aepd.es"
                  target="_blank"
                  rel="noopener"
                  className="underline hover:text-[#0a1b33]"
                >
                  www.aepd.es
                </a>
                .
              </p>
            </Section>

            <Section title="8. Seguridad">
              <p>
                Adoptamos las medidas técnicas y organizativas razonables
                para proteger los datos personales frente a accesos no
                autorizados, pérdida o alteración, adecuadas al riesgo del
                tratamiento realizado.
              </p>
            </Section>

            <Section title="9. Cookies">
              <p>
                Esta web utiliza cookies propias y de terceros para su
                correcto funcionamiento y para fines analíticos y, en su
                caso, publicitarios:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <span className="font-semibold text-[#0a1b33]">
                    Cookies técnicas:
                  </span>{" "}
                  necesarias para el funcionamiento básico de la web.
                </li>
                <li>
                  <span className="font-semibold text-[#0a1b33]">
                    Cookies analíticas (Google Analytics):
                  </span>{" "}
                  nos ayudan a entender cómo se usa la web de forma
                  agregada y anónima.
                </li>
                <li>
                  <span className="font-semibold text-[#0a1b33]">
                    Cookies publicitarias (Google AdSense):
                  </span>{" "}
                  pueden usarse para mostrar anuncios relevantes.
                </li>
              </ul>
              <p>
                Al acceder a la web se te muestra un panel de consentimiento
                de cookies donde puedes aceptar, rechazar o configurar tus
                preferencias en cualquier momento. También puedes gestionar
                o eliminar las cookies desde la configuración de tu propio
                navegador.
              </p>
            </Section>

            <Section title="10. Servicios de terceros">
              <p>
                Esta web utiliza los siguientes servicios de terceros, cada
                uno con su propia política de privacidad: Google Analytics,
                Google AdSense y WhatsApp (Meta Platforms, Inc.). Te
                recomendamos consultar sus respectivas políticas para más
                información sobre el tratamiento que realizan.
              </p>
            </Section>

            <Section title="11. Menores de edad">
              <p>
                Los servicios ofrecidos en esta web están dirigidos a
                personas mayores de edad. No recopilamos conscientemente
                datos de menores de edad.
              </p>
            </Section>

            <Section title="12. Cambios en esta política">
              <p>
                Podemos actualizar esta Política de Privacidad para
                adaptarla a novedades legislativas o cambios en el
                funcionamiento de la web. La fecha de la última
                actualización figura al inicio de este documento. Te
                recomendamos revisarla periódicamente.
              </p>
            </Section>

            <Section title="13. Contacto">
              <p>
                Si tienes cualquier duda sobre esta Política de Privacidad
                o sobre el tratamiento de tus datos, puedes contactar con
                nosotros:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Teléfono: {PHONE_DISPLAY}</li>
                <li>
                  WhatsApp:{" "}
                  <a
                    href={PHONE_WHATSAPP}
                    target="_blank"
                    rel="noopener"
                    className="underline hover:text-[#0a1b33]"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li>Correo electrónico: [AÑADIR DATO]</li>
              </ul>
            </Section>

            <div className="mt-10 pt-6 border-t border-slate-100">
              <a
                href={PHONE_TEL}
                className="inline-flex items-center gap-2 bg-[#0a152d] text-white text-[14px] font-semibold rounded-full px-7 py-3"
              >
                Contactar
              </a>
            </div>
        </div>
      </main>

      <footer className="mt-10 max-w-[1400px] mx-auto px-2 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[13px] text-slate-400">
          <p>Blakewebs © 2026</p>
          <a href="/" className="hover:text-[#0a1b33] transition-colors">
            Volver al inicio
          </a>
        </div>
      </footer>
    </div>
  );
}
