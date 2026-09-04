import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PenTool, TrendingUp, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Marco from "@/components/Marco";

const SERVICIOS = [
  {
    icono: PenTool, titulo: "Diseño estratégico",
    texto: "Identidad visual, branding y sistemas de marca pensados para que se apliquen bien en todos lados, no solo para que se vean lindos en la presentación.",
    incluye: ["Identidad y logotipo", "Sistema de color y tipografía", "Aplicaciones y packaging", "Manual de marca"],
  },
  {
    icono: TrendingUp, titulo: "Marketing de crecimiento",
    texto: "Estrategia, gestión de redes y contenido con un plan detrás. Sabemos qué publicamos, para quién y por qué.",
    incluye: ["Estrategia de contenidos", "Gestión de redes", "Contenido y UGC", "Email marketing"],
  },
  {
    icono: BarChart3, titulo: "Performance ads",
    texto: "Campañas en Meta y Google optimizadas con datos reales. Medimos cada consulta y sabemos de qué anuncio salió.",
    incluye: ["Meta y Google Ads", "Píxel y medición", "Optimización por conversión", "Reportes mensuales"],
  },
];

const PASOS = [
  { n: "01", titulo: "Miramos", texto: "Antes de proponer nada auditamos lo que ya tenés: redes, competencia, cómo te encuentran hoy. De ahí sale el diagnóstico, no de una plantilla." },
  { n: "02", titulo: "Definimos", texto: "Acordamos qué problema estamos resolviendo y con qué se mide. Si no se puede medir, lo decimos antes y no después." },
  { n: "03", titulo: "Construimos", texto: "Marca, contenido o campaña, según lo que el problema pida. Entregamos lo que la marca necesita en cada universo donde tenga que estar." },
  { n: "04", titulo: "Medimos y ajustamos", texto: "Nada queda librado a que «se vea lindo». Miramos los números, sacamos lo que no rinde y reforzamos lo que sí." },
];

const ComoTrabajamos = () => (
  <Marco>
    {/* La cita es el titulo de la pagina. Va en caja alta y baja y no en
        mayusculas como el resto de los h1: son quince palabras, y en
        mayusculas a este tamaño se vuelve un paredon ilegible.
        Las comillas quedan porque el titular tiene que leerse como cita
        desde el primer golpe de vista; sin ellas parece una frase nuestra
        y la firma de abajo llega tarde.
        El tratamiento es sobrio a proposito: comillas gigantes y florituras
        arriba de una frase contra la decoracion serian un chiste en contra
        nuestra. */}
    <section className="grano relative pb-16 pt-6">
      <div className="container mx-auto max-w-6xl px-6">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
          Cómo trabajamos
        </p>
        <blockquote className="mt-4 max-w-[44rem]">
          <h1 className="font-display text-[clamp(1.85rem,5vw,3.5rem)] font-extrabold leading-[1.08] tracking-[-0.025em]">
            «El contenido precede al diseño. Diseño en ausencia de contenido no es
            diseño, <span className="text-accent">es decoración.»</span>
          </h1>
          <footer className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
            Jeffrey Zeldman — fundador de The Web Standards Project
          </footer>
        </blockquote>
        <p className="mt-10 max-w-[33rem] border-l-2 border-primary pl-5 text-lg leading-relaxed text-muted-foreground">
          La tenemos en nuestros informes desde el primer día. Por eso el primer
          paso nunca es diseñar.
        </p>
      </div>
    </section>

    <section className="grano relative bg-secondary py-20">
      <div className="container mx-auto max-w-6xl px-6">
        <h2 className="font-display text-[clamp(1.7rem,4vw,2.6rem)] font-extrabold uppercase tracking-tight">
          El recorrido
        </h2>
        <div className="mt-12 grid gap-px bg-border md:grid-cols-2">
          {PASOS.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
              className="bg-background p-9"
            >
              <p className="font-mono text-[0.7rem] tracking-[0.2em] text-accent">{p.n}</p>
              <h3 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight">{p.titulo}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{p.texto}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="grano relative py-20">
      <div className="container mx-auto max-w-6xl px-6">
        <h2 className="font-display text-[clamp(1.7rem,4vw,2.6rem)] font-extrabold uppercase tracking-tight">
          Qué hacemos
        </h2>
        {/* Estaba bajo el titular viejo. Sobrevive al cambio porque no habla de
            cuantos somos sino de que no hay capas intermedias, y eso sigue
            siendo cierto trabajando con colaboradores. */}
        <p className="mt-4 max-w-[33rem] text-lg text-muted-foreground">
          No hay ejecutivo de cuentas ni pasamanos. Hablás con quien hace el trabajo,
          de principio a fin.
        </p>
        <div className="mt-12 grid gap-px bg-border md:grid-cols-3">
          {SERVICIOS.map((s, i) => (
            <motion.div
              key={s.titulo}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-background p-9"
            >
              <s.icono className="h-8 w-8 text-accent" />
              <h3 className="mt-6 font-display text-2xl font-extrabold uppercase tracking-tight">{s.titulo}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{s.texto}</p>
              <ul className="mt-6 space-y-2 border-t border-border pt-5">
                {s.incluye.map((x) => (
                  <li key={x} className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted-foreground">{x}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <Button asChild size="lg" className="h-14 rounded-none px-8 text-base font-semibold">
            <Link to="/branding">Ver el branding</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-14 rounded-none border-foreground px-8 text-base font-semibold">
            <Link to="/meta-ads">Ver los Meta Ads</Link>
          </Button>
        </div>
      </div>
    </section>
  </Marco>
);

export default ComoTrabajamos;
