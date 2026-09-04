import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Marco from "@/components/Marco";

/**
 * Portfolio de contenido.
 *
 * El eje NO es la inteligencia artificial. Creant diseña piezas desde cero
 * siguiendo el manual de cada marca, graba, edita video y además usa IA donde
 * suma. Poner la IA al frente haría parecer que el estudio es otra cosa de la
 * que es, y encima es lo único de la lista que cualquiera puede copiar.
 *
 * El hilo que une las cuatro capacidades es la marca: el manual sirve solo si
 * alguien produce contenido que lo respete. Por eso la página engancha con la
 * sección de branding en vez de vivir aislada.
 *
 * PENDIENTE: faltan las piezas reales. Cuando estén, reemplazan el bloque de
 * "en preparación" del final.
 */

const HACEMOS = [
  {
    n: "01", titulo: "Piezas desde cero",
    texto: "Diseñamos cada pieza partiendo del manual de la marca: su paleta, sus tipografías, sus reglas. No plantillas adaptadas — piezas armadas para esa marca y nada más.",
  },
  {
    n: "02", titulo: "Grabación",
    texto: "Vamos al local, al taller o a la fábrica y grabamos el material propio. El contenido que mejor funciona casi nunca se compra en un banco de imágenes: se filma donde pasan las cosas.",
  },
  {
    n: "03", titulo: "Edición de video",
    texto: "Montaje, ritmo, subtítulos, placas y música. El mismo criterio de marca que en gráfica, aplicado a lo que se mueve, y cortado para el formato donde va a vivir.",
  },
  {
    n: "04", titulo: "IA con criterio",
    texto: "La usamos cuando resuelve algo: una escena imposible de fotografiar, una variante rápida, un fondo que hay que extender. Nunca como atajo para no pensar la pieza.",
  },
];

const PASOS = [
  { n: "01", titulo: "La referencia", texto: "Qué hace la marca, qué hace su competencia, qué está funcionando en el rubro. La idea sale de acá, no de una herramienta." },
  { n: "02", titulo: "La generación", texto: "Se producen las primeras versiones. Es la parte rápida y la que puede hacer cualquiera: por sí sola no resuelve nada." },
  { n: "03", titulo: "El criterio", texto: "Acá está el trabajo. Elegir cuál sirve, descartar las que no, corregir proporciones y arreglar lo que la máquina resolvió mal." },
  { n: "04", titulo: "La aplicación", texto: "La pieza entra en el sistema de la marca. Recién ahí deja de ser una imagen linda y pasa a ser contenido de esa marca." },
];

const Contenido = () => (
  <Marco>
    <section className="grano relative pb-16 pt-6">
      <div className="container mx-auto max-w-6xl px-6">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
          Portfolio · Contenido y redes
        </p>
        <h1 className="mt-3 max-w-4xl font-display text-[clamp(2.4rem,8vw,5.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em]">
          Un manual no sirve<br /><span className="text-accent">si nadie lo aplica.</span>
        </h1>
        <p className="mt-6 max-w-[37rem] text-lg text-muted-foreground">
          Diseñamos las piezas desde cero siguiendo el manual de cada marca, grabamos
          el material, editamos el video y usamos inteligencia artificial donde suma.
          El hilo es siempre el mismo: que todo lo que sale se reconozca como de esa
          marca, sin importar con qué se hizo.
        </p>
      </div>
    </section>

    <section className="grano relative bg-tunel py-20 text-background">
      <div className="container mx-auto max-w-6xl px-6">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-primary">Qué hacemos</p>
        <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.9rem,5vw,3.4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.035em]">
          Cuatro formas de<br />producir la misma marca
        </h2>

        <div className="mt-12 grid gap-px bg-background/15 md:grid-cols-2">
          {HACEMOS.map((h, i) => (
            <motion.div key={h.n}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
              className="bg-tunel p-9">
              <p className="font-mono text-[0.7rem] tracking-[0.2em] text-primary">{h.n}</p>
              <h3 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight">{h.titulo}</h3>
              <p className="mt-3 leading-relaxed text-background/70">{h.texto}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 max-w-[37rem] border-l-2 border-primary pl-5 leading-relaxed text-background/70">
          Una identidad bien construida no se termina el día que se entrega el manual.
          Se sostiene o se rompe en cada posteo, cada video y cada historia que sale
          después.{" "}
          <Link to="/branding" className="text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary">
            Así construimos esas identidades
          </Link>.
        </p>
      </div>
    </section>

    <section className="grano relative py-20">
      <div className="container mx-auto max-w-6xl px-6">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
          Sobre la inteligencia artificial
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.8rem,4.6vw,3rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.035em]">
          Cuando la usamos,<br />la usamos así
        </h2>
        <p className="mt-5 max-w-[37rem] text-lg text-muted-foreground">
          No la escondemos ni la vendemos como si fuera el producto. Es una herramienta
          más dentro del proceso, y de los cuatro pasos que siguen, solo uno lo hace la
          máquina.
        </p>

        <div className="mt-12 grid gap-px bg-foreground/12 md:grid-cols-4">
          {PASOS.map((p, i) => (
            <motion.div key={p.n}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.4, delay: i * 0.06 }}
              // El paso 03 se destaca con una linea y no con un fondo tintado:
              // sobre ese tinte el rojo caia a 4.30:1, abajo del minimo. Ademas
              // el borde tambien se ve en celular, donde el fondo no aparecia.
              className={`bg-background p-7 ${p.n === "03" ? "border-t-2 border-accent" : "border-t-2 border-transparent"}`}>
              <p className="font-mono text-[0.7rem] tracking-[0.2em] text-accent">{p.n}</p>
              <h3 className="mt-3 font-display text-xl font-extrabold uppercase tracking-tight">{p.titulo}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.texto}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 max-w-[37rem] border-l-2 border-accent pl-5 leading-relaxed text-muted-foreground">
          Generar una imagen lleva treinta segundos y lo hace cualquiera. Saber cuál de
          las diez sirve, por qué las otras nueve no, y dejarla lista para que se
          imprima sin romperse — eso es lo que se paga.
        </p>
      </div>
    </section>

    <section className="grano relative bg-secondary py-20">
      <div className="container mx-auto max-w-6xl px-6">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">Las piezas</p>
        <h2 className="mt-3 font-display text-[clamp(1.7rem,4vw,2.6rem)] font-extrabold uppercase tracking-tight">
          En preparación
        </h2>
        <p className="mt-4 max-w-[35rem] leading-relaxed text-muted-foreground">
          Estamos armando esta sección con trabajo real de cada tipo: piezas gráficas,
          video editado y material grabado, cada uno junto a la marca para la que se hizo.
        </p>
      </div>
    </section>
  </Marco>
);

export default Contenido;
