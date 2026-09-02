import { Link } from "react-router-dom";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ContactForm from "@/components/ContactForm";
import Marco from "@/components/Marco";
import { WHATSAPP_URL } from "@/lib/leads";
import { trackEvent } from "@/lib/tracking";

import milagrosFoto from "@/assets/milagros-2026.webp";
import juanFoto from "@/assets/juan-new.png";

const aparece = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
  }),
};

/** La obrera, mirando hacia donde va el sendero. Se reutiliza seis veces. */
const Obrera = () => (
  <g id="obrera" fill="#2A1C13">
    <g transform="scale(-1,1) translate(-690,0)">
      <path d="M128 118 C 84 66, 44 34, 12 16 C 4 12, -2 22, 6 30 C 40 58, 76 92, 112 140 Z" />
      <path d="M116 140 C 76 104, 40 82, 8 72 C -1 69, -5 80, 4 85 C 40 100, 74 124, 106 158 Z" />
      <path d="M232 168 C 232 96, 190 74, 150 82 C 96 92, 62 148, 66 226 C 70 288, 106 306, 152 300 C 206 293, 232 244, 232 168 Z" />
      <path d="M78 168 C 100 158, 122 168, 126 182 C 108 214, 82 220, 74 206 C 70 196, 71 178, 78 168 Z" fill="#EFE7D9" />
      <circle cx="282" cy="207" r="52" /><circle cx="358" cy="207" r="46" />
      <path d="M400 196 C 404 118, 470 96, 546 104 C 634 114, 676 176, 668 250 C 662 300, 596 312, 520 300 C 444 288, 396 258, 400 196 Z" />
      <path d="M214 242 C 190 300, 176 388, 168 496 C 167 508, 155 508, 155 496 C 160 384, 176 296, 202 236 Z" />
      <path d="M258 262 C 250 330, 252 420, 258 496 C 259 508, 271 508, 270 496 C 266 418, 268 330, 276 258 Z" />
      <path d="M392 254 C 414 320, 428 410, 434 496 C 435 508, 447 508, 446 496 C 442 406, 428 314, 406 246 Z" />
      <path d="M474 288 C 512 336, 556 380, 584 408 C 590 440, 592 470, 592 496 C 592 508, 604 508, 604 496 C 604 462, 601 428, 594 396 C 564 366, 520 322, 486 276 Z" />
    </g>
  </g>
);

/** Cada obrera lleva un servicio al hombro, sin contorno: el color pleno se lee
 *  mejor que una silueta delineada, sobre todo en tamaño chico. */
const CARGAS = [
  { escala: 0.041, retardo: "0s", carga: <rect x="0" y="0" width="12" height="11" rx="2.4" fill="#E8940C" /> },
  { escala: 0.037, retardo: "-5s", carga: <path d="M6 11.4 C0.4 7.6, -0.1 4.2, 2.3 2 C4.1 0.4, 5.7 1.3, 6 2.7 C6.4 1.3, 8 0.4, 9.8 2 C12.2 4.2, 11.7 7.6, 6 11.4 Z" fill="#C41230" /> },
  { escala: 0.045, retardo: "-10s", carga: (
    <g><rect x="0" y="6" width="3.4" height="5" fill="#2A1C13" /><rect x="4.3" y="3" width="3.4" height="8" fill="#E8940C" /><rect x="8.6" y="0" width="3.4" height="11" fill="#C41230" /></g>) },
  { escala: 0.039, retardo: "-15s", carga: (
    <g><path d="M6 11.4 C-0.6 8.8, -0.6 2.4, 6 0.4 C12.6 2.4, 12.6 8.8, 6 11.4 Z" fill="#8C8F41" /><path d="M6 11.4 L6 1.2" stroke="#2A1C13" strokeWidth="1.4" opacity="0.6" /></g>) },
  { escala: 0.043, retardo: "-20s", carga: <path d="M1.5 0.5 L11.5 5.5 L1.5 10.5 Z" fill="#C41230" /> },
  { escala: 0.036, retardo: "-25s", carga: (
    <g><rect x="0" y="1" width="12" height="9" rx="1.2" fill="#E8940C" /><path d="M0.6 1.8 L6 6 L11.4 1.8" fill="none" stroke="#2A1C13" strokeWidth="2.2" strokeLinejoin="round" /></g>) },
];

const PUERTAS = [
  { a: "/marcas", eyebrow: "Portfolio", titulo: "Marcas", texto: "Ocho identidades completas, de la panadería de barrio a la perfumería. Cada una con su sistema, su paleta y su historia." },
  { a: "/pauta", eyebrow: "Portfolio", titulo: "Pauta", texto: "Once cuentas gestionadas y más de seis mil conversaciones. Los números reales de cada campaña, sin maquillar." },
  { a: "/como-trabajamos", eyebrow: "El método", titulo: "Cómo trabajamos", texto: "Miramos antes de proponer, definimos con qué se mide y ajustamos con los números en la mano." },
];

const EQUIPO = [
  { foto: milagrosFoto, nombre: "Milagros", rol: "Co-Founder & Creative Director",
    texto: "6 años en branding y comunicación. Desarrollo de identidad, dirección de arte y contenido. Especialista en llevar una idea de la referencia al vector y dejarla lista para producción.",
    tags: ["Branding", "Identidad visual", "Video / UGC", "Comunicación"] },
  { foto: juanFoto, nombre: "Juan", rol: "Co-Founder & Growth Strategist",
    texto: "5 años como Ads y Social Media Manager. Campañas de performance, email marketing y estrategias de venta orientadas a resultados medibles.",
    tags: ["Meta & Google Ads", "Social Media", "Email Marketing", "Ventas"] },
];

const Index = () => {
  const trackWhatsapp = (origen: string) => () => trackEvent("Contact", { content_name: `WhatsApp — ${origen}` });

  return (
    <Marco>
      {/* ================= SUPERFICIE ================= */}
      <section className="grano relative overflow-hidden">
        {/* El sendero va en la franja libre de abajo: si cruzara el titular, las
            obreras caminarían tapadas por las letras. */}
        <svg className="sendero-hormigas pointer-events-none absolute bottom-9 left-0 right-0 z-[4]"
             viewBox="0 0 1440 130" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path d="M -40 96 C 250 62, 520 112, 800 74 S 1240 46, 1500 90"
                fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.1"
                strokeDasharray="3 8" opacity="0.45" />
          <defs><Obrera /></defs>
          {CARGAS.map((h, i) => (
            <g key={i} className="hormiga" style={{ animationDelay: h.retardo }}>
              <g transform={`translate(${(-340 * h.escala).toFixed(1)},${(-508 * h.escala).toFixed(1)}) scale(${h.escala})`}>
                <use href="#obrera" />
                <g transform="translate(130,-285) scale(40)"><g className="carga">{h.carga}</g></g>
              </g>
            </g>
          ))}
        </svg>

        <div className="container relative z-[3] mx-auto max-w-6xl px-6 pt-6">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
            Estudio de marca y pauta
          </p>

          <h1 className="mt-4 font-display text-[clamp(2.9rem,11vw,8.5rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.045em]">
            Llegaste al
            <span className="block text-accent">hormiguero.</span>
          </h1>

          <motion.p variants={aparece} initial="hidden" animate="visible" custom={1}
                    className="mt-8 max-w-[31rem] text-[clamp(1.05rem,2.2vw,1.3rem)] text-muted-foreground">
            Somos el estudio creativo que tu pyme necesita:{" "}
            <b className="font-semibold text-foreground">branding, contenido y publicidad digital</b>{" "}
            trabajando juntos para que tu marca venda más.
          </motion.p>

          <motion.div variants={aparece} initial="hidden" animate="visible" custom={2}
                      className="mb-40 mt-10 flex flex-wrap gap-3 sm:mb-16">
            <Button asChild size="lg" className="h-14 rounded-none px-8 text-base font-semibold">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={trackWhatsapp("hero")}>
                Empezar proyecto <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 rounded-none border-foreground px-8 text-base font-semibold">
              <Link to="/marcas">Ver el trabajo</Link>
            </Button>
          </motion.div>
        </div>

        {/* El corte de tierra: la superficie se abre y empieza el hormiguero. */}
        <svg className="relative z-[3] -mb-px block h-auto w-full" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,52 C90,30 150,74 246,58 C348,41 392,80 500,66 C600,53 660,86 762,70 C870,53 918,88 1030,72 C1130,58 1190,34 1290,52 C1352,63 1400,44 1440,50 L1440,90 L0,90 Z"
                fill="hsl(var(--tunel))" />
        </svg>
      </section>

      {/* ================= LAS TRES CÁMARAS ================= */}
      <section className="grano relative bg-tunel py-20 text-background">
        <div className="container mx-auto max-w-6xl px-6">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-primary">Bajá al hormiguero</p>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.9rem,5vw,3.4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.035em]">
            Tres cámaras,<br />tres formas de mirarnos
          </h2>

          <div className="mt-12 grid gap-px bg-background/15 md:grid-cols-3">
            {PUERTAS.map((p, i) => (
              <motion.div key={p.a}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.45, delay: i * 0.09 }}>
                <Link to={p.a} className="group flex h-full flex-col bg-tunel p-9 transition-colors hover:bg-background/5">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-primary">{p.eyebrow}</p>
                  <h3 className="mt-4 font-display text-3xl font-extrabold uppercase tracking-tight">{p.titulo}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-background/65">{p.texto}</p>
                  <span className="mt-7 inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-primary">
                    Entrar <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EQUIPO ================= */}
      <section id="equipo" className="grano relative py-24">
        <div className="container mx-auto max-w-6xl px-6">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">Quiénes somos</p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,5vw,3.4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.035em]">
            Somos dos<br />y atendés con nosotros
          </h2>
          <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">
            No hay ejecutivo de cuentas ni pasamanos. Combinamos la identidad visual de Milagros
            con la estrategia de pauta y conversión de Juan.
          </p>

          <div className="mt-14 grid gap-px bg-border md:grid-cols-2">
            {EQUIPO.map((p, i) => (
              <motion.div key={p.nombre}
                variants={aparece} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} custom={i}
                className="bg-background p-9">
                <img src={p.foto} alt={`${p.nombre} — ${p.rol}`} width="640" height="640" loading="lazy"
                     className="h-32 w-32 rounded-full border-2 border-accent object-cover" />
                <h3 className="mt-6 font-display text-2xl font-extrabold uppercase tracking-tight">{p.nombre}</h3>
                <p className="mt-1 text-sm font-semibold text-accent">{p.rol}</p>
                <p className="mt-4 leading-relaxed text-muted-foreground">{p.texto}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => <Badge key={t} variant="secondary" className="rounded-none text-xs font-normal">{t}</Badge>)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACTO ================= */}
      <section id="contacto" className="camara grano relative bg-tunel py-24 text-background">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-primary">Última cámara</p>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,6vw,4.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]">
            ¿Listo para escalar?
          </h2>
          <p className="mx-auto mb-12 mt-5 max-w-xl text-background/70">
            Dejanos tus datos y te escribimos para ver cómo podemos ayudarte a crecer.
          </p>

          <ContactForm />

          <div className="mt-12 flex flex-col items-center justify-center gap-5 text-sm text-background/60 sm:flex-row sm:gap-8">
            <a href="mailto:creantagency.contacto@gmail.com" className="flex items-center gap-2 py-3 transition-colors hover:text-primary">
              <Mail className="h-4 w-4" /> creantagency.contacto@gmail.com
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={trackWhatsapp("sección contacto")}
               className="flex items-center gap-2 py-3 transition-colors hover:text-primary">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </Marco>
  );
};

export default Index;
