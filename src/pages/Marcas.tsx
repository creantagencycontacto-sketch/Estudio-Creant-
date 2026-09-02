import { useState } from "react";
import { motion } from "framer-motion";
import Marco from "@/components/Marco";

import mGrannie from "@/assets/marcas/grannie.png";
import mReyna from "@/assets/marcas/reyna.png";
import mMalvada from "@/assets/marcas/malvada.png";
import mNmo from "@/assets/marcas/nmo.png";
import mResistencia from "@/assets/marcas/resistencia.png";
import mAstegiano from "@/assets/marcas/astegiano.png";
import mMagna from "@/assets/marcas/magna.png";
import mCherry from "@/assets/marcas/cherry.png";

/**
 * Portfolio de marcas.
 *
 * La grilla las muestra a todas en la misma tinta: cada identidad fue diseñada
 * para destacar, así que juntas y a todo color se pelean entre ellas. El color
 * aparece recién al abrir un caso, y por eso funciona como recompensa.
 *
 * Nunca se publica el manual completo: se muestra el resultado, no la
 * herramienta con la que el cliente lo aplica.
 */

type Marca = {
  nombre: string;
  logo: string;
  rubro: string;
  concepto: string;
  paleta: string[];
  relato: string;
};

const MARCAS: Marca[] = [
  {
    nombre: "Grannie", logo: mGrannie, rubro: "Mermeladas artesanales",
    concepto: "Un sistema que se estira a siete sabores sin romperse",
    paleta: ["#8B2A2A", "#E8B33C", "#2D4A7C", "#F0E4C8"],
    relato: "Siete sabores, siete mundos de color, un solo sistema. La fruta ilustrada, la onda del dulce cayendo y el sello «hecho a mano con amor» se repiten en todas; lo único que cambia es la paleta. Se entregó con las planchas armadas para imprenta, listas para producir.",
  },
  {
    nombre: "Los Budines de Reyna", logo: mReyna, rubro: "Panadería artesanal",
    concepto: "El personaje antes que el logo",
    paleta: ["#8C8F41", "#321F17", "#FFF2DE"],
    relato: "No le faltaba un logo, le faltaba una cara. Desarrollé a la Reyna alzando un budín —de la referencia al vector, limpiando y ajustando hasta que entrara dentro del monograma— para que la marca tuviera personaje y no solo letras. Es la que más se aplica sola: la ves en la bolsa y ya sabés de qué se trata.",
  },
  {
    nombre: "Malvada Shoes", logo: mMalvada, rubro: "Calzado y accesorios",
    concepto: "El color se gana, no se reparte",
    paleta: ["#C7FF0F", "#F887C0", "#8F7BC1", "#111111"],
    relato: "Malvada no quería ser prolija. La base quedó en blanco y negro para que la marca no canse, y el color entra como tropezones de dopamina: lima, rosa, violeta, siempre por sorpresa. La regla que le dejé es de una línea — si el color está en todas partes, deja de llamar la atención en ninguna.",
  },
  {
    nombre: "NMO Perfumería", logo: mNmo, rubro: "Perfumería · rebranding",
    concepto: "El nombre ya tenía la respuesta",
    paleta: ["#98CFF1", "#61A5DA", "#32536D"],
    relato: "No Me Olvides ya tenía una flor en su logo original. En vez de descartarla la rediseñé: la nomeolvides pasó a ser el isotipo y la marca ganó un símbolo propio que se sostiene incluso a cincuenta píxeles. Era un rebranding, no una marca nueva — la clienta de siempre tenía que reconocerla y la nueva, elegirla.",
  },
  {
    nombre: "Resistencia", logo: mResistencia, rubro: "Indumentaria deportiva",
    concepto: "Dos colores, cero decoración",
    paleta: ["#C4FF00", "#0A0A0A", "#FFFFFF"],
    relato: "Ropa deportiva para gente que entrena de verdad, no para modelos de catálogo. Por eso el sistema es negro y lima: dos colores y todo contraste. La R dentro del círculo funciona como sello — se borda, se estampa y se imprime chica en la etiqueta sin perder nada.",
  },
  {
    nombre: "Astegiano", logo: mAstegiano, rubro: "Neumáticos",
    concepto: "La marca dentro de la banda de rodamiento",
    paleta: ["#FFED00", "#151912", "#A6A6A6"],
    relato: "El isotipo es una A dentro de anillos concéntricos que leen como la banda de un neumático. Amarillo y negro, la combinación del rubro, usada con orden: en un mercado donde todos gritan, la marca gana por estar mejor construida, no por gritar más fuerte.",
  },
  {
    nombre: "Magna Fitness", logo: mMagna, rubro: "Indumentaria femenina",
    concepto: "Magna significa «fuera de lo común»",
    paleta: ["#D90416", "#F2949C", "#F2F2F2"],
    relato: "El nombre define la marca y el monograma lo sintetiza. Ropa para mujeres que entrenan en serio y necesitan que la prenda no las estorbe. El monograma se usa solo cuando el nombre completo no entra: perfil, etiqueta, botón.",
  },
  {
    nombre: "Cherry Nails", logo: mCherry, rubro: "Manicuría",
    concepto: "Una guía corta para una marca chica",
    paleta: ["#E63462", "#F5A9C0", "#1A1A1A"],
    relato: "No todos los clientes necesitan un manual de trece páginas. Cherry pidió una guía mínima —logotipo, paleta, tipografías y aplicación en redes— y eso fue lo que se entregó. Saber cuándo entregar menos también es parte del oficio.",
  },
];

const Marcas = () => {
  const [abierta, setAbierta] = useState<Marca | null>(null);

  return (
    <Marco>
      <section className="grano relative pb-14 pt-6">
        <div className="container mx-auto max-w-6xl px-6">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
            Portfolio · Marcas desarrolladas
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-[clamp(2.4rem,8vw,5.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em]">
            Salieron del hormiguero<br /><span className="text-accent">listas para trabajar</span>
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg text-muted-foreground">
            Este no es un portfolio más. Son marcas que ya están afuera, funcionando.
            Entrá a cualquiera y mirá cómo se resolvió.
          </p>
        </div>
      </section>

      <section className="grano relative bg-tunel py-16 text-background">
        <div className="container mx-auto max-w-6xl px-6">
          <p className="mb-8 max-w-[34rem] text-sm text-background/50">
            Todas entran en la misma tinta: cada una fue diseñada para destacar, así que
            juntas y a todo color se pelean. El color aparece cuando abrís una.
          </p>

          <div className="grid grid-cols-2 gap-px bg-background/15 md:grid-cols-4">
            {MARCAS.map((m, i) => (
              <motion.button
                key={m.nombre}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
                onClick={() => setAbierta(m)}
                aria-label={`Ver el caso de ${m.nombre}`}
                className="group flex aspect-[4/3] items-center justify-center bg-tunel p-8 transition-colors hover:bg-background/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <img
                  src={m.logo}
                  alt={m.nombre}
                  className="max-h-16 w-auto max-w-[9rem] opacity-70 transition-opacity group-hover:opacity-100"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* El caso abierto: acá aparece el color */}
      {abierta && (
        <motion.section
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="grano relative bg-secondary py-16"
          id="caso"
        >
          <div className="container mx-auto max-w-4xl px-6">
            <button
              onClick={() => setAbierta(null)}
              className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Volver a las marcas
            </button>

            <p className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
              {abierta.rubro}
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,6vw,3.6rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.035em]">
              {abierta.nombre}
            </h2>
            <p className="mt-4 border-l-2 border-accent pl-4 text-lg font-semibold">{abierta.concepto}</p>

            <div className="mt-8 flex">
              {abierta.paleta.map((c) => (
                <div key={c} className="h-14 flex-1 border border-foreground/10" style={{ background: c }} />
              ))}
            </div>

            <p className="mt-8 max-w-[36rem] text-lg leading-relaxed text-muted-foreground">{abierta.relato}</p>
          </div>
        </motion.section>
      )}
    </Marco>
  );
};

export default Marcas;
