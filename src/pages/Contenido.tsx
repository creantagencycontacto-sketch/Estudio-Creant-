import { motion } from "framer-motion";
import Marco from "@/components/Marco";

/**
 * Portfolio de contenido.
 *
 * El diferencial acá no es la pieza final —eso lo muestra cualquiera— sino el
 * proceso: qué se generó, qué se descartó y qué se corrigió. Por eso la página
 * se organiza alrededor de los cuatro pasos y no de una grilla de resultados.
 *
 * Sobre la IA: se nombra sin vueltas. Esconderla se nota, y decirlo con el
 * criterio a la vista es justamente lo que diferencia a Creant de alguien que
 * pega un prompt y entrega lo primero que sale.
 *
 * PENDIENTE: faltan las piezas reales. Cuando estén, reemplazan el bloque de
 * "en preparación" de abajo.
 */

const PASOS = [
  {
    n: "01", titulo: "La referencia",
    texto: "Todo arranca mirando: qué hace la marca, qué hace su competencia, qué está funcionando en el rubro. De ahí sale la idea, no de una herramienta.",
  },
  {
    n: "02", titulo: "La generación",
    texto: "Usamos IA para producir las primeras versiones. Es la parte rápida y la que cualquiera puede hacer: por sí sola no resuelve nada.",
  },
  {
    n: "03", titulo: "El criterio",
    texto: "Acá está el trabajo. Elegir cuál sirve, descartar las que no, corregir proporciones, arreglar lo que la máquina dibujó mal y llevarlo al vector para que aguante cualquier tamaño.",
  },
  {
    n: "04", titulo: "La aplicación",
    texto: "La pieza entra en el sistema de la marca: su paleta, su tipografía, su tono. Recién ahí deja de ser una imagen linda y pasa a ser contenido de esa marca.",
  },
];

const Contenido = () => (
  <Marco>
    <section className="grano relative pb-16 pt-6">
      <div className="container mx-auto max-w-6xl px-6">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
          Portfolio · Contenido y redes
        </p>
        <h1 className="mt-3 max-w-4xl font-display text-[clamp(2.4rem,8vw,5.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em]">
          La máquina genera.<br /><span className="text-accent">El criterio decide.</span>
        </h1>
        <p className="mt-6 max-w-[36rem] text-lg text-muted-foreground">
          Usamos inteligencia artificial para producir contenido, y lo decimos sin vueltas.
          La diferencia no está en la herramienta —hoy la tiene cualquiera— sino en saber
          qué descartar, qué corregir y cómo hacer que la pieza sea de la marca y no de
          nadie.
        </p>
      </div>
    </section>

    <section className="grano relative bg-tunel py-20 text-background">
      <div className="container mx-auto max-w-6xl px-6">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-primary">Cómo se hace una pieza</p>
        <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.9rem,5vw,3.4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.035em]">
          Cuatro pasos,<br />y solo uno lo hace la máquina
        </h2>

        <div className="mt-12 grid gap-px bg-background/15 md:grid-cols-2">
          {PASOS.map((p, i) => (
            <motion.div key={p.n}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
              className="bg-tunel p-9">
              <p className="font-mono text-[0.7rem] tracking-[0.2em] text-primary">{p.n}</p>
              <h3 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight">{p.titulo}</h3>
              <p className="mt-3 leading-relaxed text-background/70">{p.texto}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 max-w-[36rem] border-l-2 border-primary pl-5 leading-relaxed text-background/70">
          Generar una imagen lleva treinta segundos y lo hace cualquiera. Saber cuál de las
          diez sirve, por qué las otras nueve no, y dejarla lista para que se imprima sin
          romperse — eso es lo que se paga.
        </p>
      </div>
    </section>

    <section className="grano relative py-20">
      <div className="container mx-auto max-w-6xl px-6">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">Las piezas</p>
        <h2 className="mt-3 font-display text-[clamp(1.7rem,4vw,2.6rem)] font-extrabold uppercase tracking-tight">
          En preparación
        </h2>
        <p className="mt-4 max-w-[34rem] leading-relaxed text-muted-foreground">
          Estamos armando esta sección con los cuatro pasos a la vista en cada caso:
          la referencia, lo que devolvió la máquina, lo que corregimos y la pieza final
          aplicada.
        </p>
      </div>
    </section>
  </Marco>
);

export default Contenido;
