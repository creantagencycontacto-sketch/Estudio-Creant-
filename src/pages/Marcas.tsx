import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Marco from "@/components/Marco";

import mGrannie from "@/assets/marcas/grannie.png";
import mReyna from "@/assets/marcas/reyna.png";
import mMalvada from "@/assets/marcas/malvada.png";
import mNmo from "@/assets/marcas/nmo.png";
import mResistencia from "@/assets/marcas/resistencia.png";
import mAstegiano from "@/assets/marcas/astegiano.png";
import mMagna from "@/assets/marcas/magna.png";
import mCherry from "@/assets/marcas/cherry.png";

// Piezas aplicadas. Salen del deck de cada marca, eligiendo solo las paginas
// de aplicacion: las de manual (tipografias, construccion del logo, usos
// correctos) no se publican, porque son la herramienta del cliente y no el
// resultado del trabajo.
import reynaSistema from "@/assets/marcas/aplicaciones/reyna-sistema.webp";
import reynaPackaging from "@/assets/marcas/aplicaciones/reyna-packaging.webp";
import reynaGrandes from "@/assets/marcas/aplicaciones/reyna-grandes.webp";
import reynaPieza from "@/assets/marcas/aplicaciones/reyna-pieza.webp";
import reynaLogo from "@/assets/marcas/aplicaciones/reyna-logo.png";
import reynaSello from "@/assets/marcas/aplicaciones/reyna-sello.png";

/**
 * Portfolio de marcas.
 *
 * La grilla las muestra a todas en la misma tinta: cada identidad fue diseñada
 * para destacar, así que juntas y a todo color se pelean entre ellas.
 *
 * Al abrir una NO se despliega una ficha más abajo, que era el problema de la
 * version anterior: la pagina no se movia y el usuario creia que su click no
 * habia hecho nada. Ahora entra a pantalla completa y pintada con los colores
 * de esa marca — el cambio es imposible de no ver, y ademas es lo unico que se
 * parece a "entrar" a una identidad.
 *
 * Los ocho archivos de logo estan aplanados a un solo marron, asi que se usan
 * como mascara y el color lo pone el CSS. Por eso cada marca puede mostrar su
 * logo en su propio color sin tener ocho archivos mas.
 *
 * Las etiquetas chicas del panel van al 80% de opacidad y no al 55%: cada
 * marca trae su propio par de fondo y tinta, y con NMO —el par mas ajustado—
 * recien al 70% se llega al minimo de contraste. El 80% deja margen para las
 * ocho sin tener que calcular caso por caso.
 *
 * Nunca se publica el manual completo: se muestra el resultado, no la
 * herramienta con la que el cliente lo aplica.
 */

type Marca = {
  nombre: string;
  logo: string;
  rubro: string;
  /** La pregunta de mercado que abre el caso. Cuando esta, reemplaza al
   *  concepto en el titular: dos frases cortas peleando por el mismo lugar
   *  se anulan entre si. */
  pregunta?: string;
  concepto: string;
  paleta: string[];
  relato: string;
  /** El remate, en la voz del estudio. */
  cierre?: string;
  /** Colores del universo de la marca. Verificados en contraste AA. */
  fondo: string;
  tinta: string;
  colorLogo: string;
  /** El logo en sus colores reales, para el panel. Los archivos de la grilla
   *  son monocromos y algunos son la version de contorno: pintados de un solo
   *  color pierden el dibujo. Cuando estan estos, se usan estos.
   *
   *  El primero es el principal y va grande; los que siguen son variantes y
   *  van chicos, debajo. Maximo TRES en total: con mas, la columna se vuelve
   *  una grilla de sellos y le come el protagonismo al caso.
   *
   *  Solo entran variantes que se lean sobre el fondo de esa marca. Un
   *  logotipo claro sobre un panel claro no se ve, por mas que sea una
   *  variante legitima del manual. */
  logos?: string[];
  /** Se muestran solo si estan cargadas. */
  aplicaciones?: { src: string; pie: string }[];
};

const MARCAS: Marca[] = [
  {
    nombre: "Grannie", logo: mGrannie, rubro: "Mermeladas artesanales",
    concepto: "Un sistema que se estira a siete sabores sin romperse",
    paleta: ["#8B2A2A", "#E8B33C", "#2D4A7C", "#F0E4C8"],
    fondo: "#F0E4C8", tinta: "#3B1616", colorLogo: "#8B2A2A",
    relato: "Siete sabores, siete mundos de color, un solo sistema. La fruta ilustrada, la onda del dulce cayendo y el sello «hecho a mano con amor» se repiten en todas; lo único que cambia es la paleta. Se entregó con las planchas armadas para imprenta, listas para producir.",
  },
  {
    nombre: "Los Budines de Reyna", logo: mReyna, rubro: "Pastelería artesanal",
    pregunta: "¿Cómo te destacás en un mercado tan diverso y saturado como la pastelería?",
    concepto: "El personaje antes que el logo",
    paleta: ["#8C8F41", "#321F17", "#FFF2DE"],
    fondo: "#FFF2DE", tinta: "#321F17", colorLogo: "#8C8F41", logos: [reynaLogo, reynaSello],
    relato: "Ro eligió los budines. Pero no son solo «budines»: son budines gigantes y con una vueltita de rosca. La acompañamos desde el arranque del emprendimiento con una identidad que tiene en el centro una caricatura de ella misma cargando esos budines espectaculares, y desarrollamos los elementos para su packaging de estilo artesanal.",
    cierre: "Un personaje sencillo y versátil, que le sirve para contar su producto en tantos escenarios como quiera. Una tipografía bold y divertida. Colores que acompañan. Y ya: ¡poné la pava!",
    aplicaciones: [
      { src: reynaPackaging, pie: "El packaging real, ya en producción" },
      { src: reynaSistema, pie: "El personaje y su familia de íconos" },
      { src: reynaGrandes, pie: "Pieza de campaña: el tamaño como argumento" },
      { src: reynaPieza, pie: "La marca aplicada en redes" },
    ],
  },
  {
    nombre: "Malvada Shoes", logo: mMalvada, rubro: "Calzado y accesorios",
    concepto: "El color se gana, no se reparte",
    paleta: ["#C7FF0F", "#F887C0", "#8F7BC1", "#111111"],
    fondo: "#111111", tinta: "#FFFFFF", colorLogo: "#C7FF0F",
    relato: "Malvada no quería ser prolija. La base quedó en blanco y negro para que la marca no canse, y el color entra como tropezones de dopamina: lima, rosa, violeta, siempre por sorpresa. La regla que le dejé es de una línea — si el color está en todas partes, deja de llamar la atención en ninguna.",
  },
  {
    nombre: "NMO Perfumería", logo: mNmo, rubro: "Perfumería · rebranding",
    concepto: "El nombre ya tenía la respuesta",
    paleta: ["#98CFF1", "#61A5DA", "#32536D"],
    fondo: "#32536D", tinta: "#EAF4FC", colorLogo: "#98CFF1",
    relato: "No Me Olvides ya tenía una flor en su logo original. En vez de descartarla la rediseñé: la nomeolvides pasó a ser el isotipo y la marca ganó un símbolo propio que se sostiene incluso a cincuenta píxeles. Era un rebranding, no una marca nueva — la clienta de siempre tenía que reconocerla y la nueva, elegirla.",
  },
  {
    nombre: "Resistencia", logo: mResistencia, rubro: "Indumentaria deportiva",
    concepto: "Dos colores, cero decoración",
    paleta: ["#C4FF00", "#0A0A0A", "#FFFFFF"],
    fondo: "#0A0A0A", tinta: "#FFFFFF", colorLogo: "#C4FF00",
    relato: "Ropa deportiva para gente que entrena de verdad, no para modelos de catálogo. Por eso el sistema es negro y lima: dos colores y todo contraste. La R dentro del círculo funciona como sello — se borda, se estampa y se imprime chica en la etiqueta sin perder nada.",
  },
  {
    nombre: "Astegiano", logo: mAstegiano, rubro: "Neumáticos",
    concepto: "La marca dentro de la banda de rodamiento",
    paleta: ["#FFED00", "#151912", "#A6A6A6"],
    fondo: "#151912", tinta: "#FFFFFF", colorLogo: "#FFED00",
    relato: "El isotipo es una A dentro de anillos concéntricos que leen como la banda de un neumático. Amarillo y negro, la combinación del rubro, usada con orden: en un mercado donde todos gritan, la marca gana por estar mejor construida, no por gritar más fuerte.",
  },
  {
    nombre: "Magna Fitness", logo: mMagna, rubro: "Indumentaria femenina",
    concepto: "Magna significa «fuera de lo común»",
    paleta: ["#D90416", "#F2949C", "#F2F2F2"],
    fondo: "#F2F2F2", tinta: "#1A1A1A", colorLogo: "#D90416",
    relato: "El nombre define la marca y el monograma lo sintetiza. Ropa para mujeres que entrenan en serio y necesitan que la prenda no las estorbe. El monograma se usa solo cuando el nombre completo no entra: perfil, etiqueta, botón.",
  },
  {
    nombre: "Cherry Nails", logo: mCherry, rubro: "Manicuría",
    concepto: "Una guía corta para una marca chica",
    paleta: ["#E63462", "#F5A9C0", "#1A1A1A"],
    fondo: "#1A1A1A", tinta: "#FFFFFF", colorLogo: "#E63462",
    relato: "No todos los clientes necesitan un manual de trece páginas. Cherry pidió una guía mínima —logotipo, paleta, tipografías y aplicación en redes— y eso fue lo que se entregó. Saber cuándo entregar menos también es parte del oficio.",
  },
];

/** El logo va como máscara: los archivos son monocromos, el color lo pone el CSS. */
const LogoMascara = ({ src, color, className }: { src: string; color: string; className?: string }) => (
  <span
    aria-hidden="true"
    className={className}
    style={{
      background: color,
      WebkitMaskImage: `url(${src})`, maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
      WebkitMaskSize: "contain", maskSize: "contain",
      WebkitMaskPosition: "center", maskPosition: "center",
    }}
  />
);

const Universo = ({ marca, cerrar }: { marca: Marca; cerrar: () => void }) => {
  const panel = useRef<HTMLDivElement>(null);

  // Mientras el universo esta abierto la pagina de atras no se scrollea: si no,
  // al llegar al final del panel el scroll "salta" a la grilla y desorienta.
  useEffect(() => {
    // Y el panel arranca arriba. El navegador le heredaba la posicion de
    // scroll de la pagina, asi que en los casos largos abria por la mitad y
    // el logo, el nombre y la pregunta quedaban arriba de la pantalla.
    panel.current?.scrollTo(0, 0);
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const conEsc = (e: KeyboardEvent) => e.key === "Escape" && cerrar();
    window.addEventListener("keydown", conEsc);
    return () => {
      document.body.style.overflow = previo;
      window.removeEventListener("keydown", conEsc);
    };
  }, [cerrar]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog" aria-modal="true" aria-label={`Universo de la marca ${marca.nombre}`}
      ref={panel}
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ background: marca.fondo, color: marca.tinta }}
    >
      <button
        onClick={cerrar}
        aria-label="Cerrar"
        className="fixed right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full transition-opacity hover:opacity-70 md:right-8 md:top-8"
        style={{ background: `${marca.tinta}14`, color: marca.tinta }}
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="container mx-auto max-w-5xl px-6 pb-24 pt-20 md:pt-28"
      >
        {/* El titulo arriba y a todo el ancho, y el logo al costado del texto.
            Antes el logo abria solo la pagina y dejaba un hueco enorme a su
            derecha, que lo hacia ver colgado. */}
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em]" style={{ opacity: 0.8 }}>
          {marca.rubro}
        </p>
        <h2 className="mt-3 font-display text-[clamp(2rem,6vw,4rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.035em]">
          {marca.nombre}
        </h2>

        {/* La columna derecha lleva ancho fijo y los logos se miden por ancho y
            no por alto. Con la columna ajustada al contenido quedaban del alto
            pedido pero angostos, y las variantes con texto curvo no se leian. */}
        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_15rem] md:items-start md:gap-14">
          <div>
            <p className="max-w-[34rem] text-xl font-semibold leading-snug md:text-2xl">
              {marca.pregunta ?? marca.concepto}
            </p>

            <p className="mt-7 max-w-[38rem] text-lg leading-relaxed" style={{ opacity: 0.85 }}>
              {marca.relato}
            </p>

            {marca.cierre ? (
              <p className="mt-7 max-w-[38rem] border-l-2 pl-5 text-lg leading-relaxed"
                 style={{ borderColor: marca.colorLogo }}>
                {marca.cierre}
              </p>
            ) : null}
          </div>

          <div className="md:pt-1">
            {marca.logos?.length ? (
              <>
                <img src={marca.logos[0]} alt={`Logo de ${marca.nombre}`}
                     className="w-full max-w-[13rem]" />
                {marca.logos.length > 1 ? (
                  <div className="mt-6 flex flex-wrap items-center gap-5 border-t pt-6"
                       style={{ borderColor: `${marca.tinta}26` }}>
                    {/* Las variantes van casi tan grandes como el principal:
                        varias traen texto curvo o dibujo, y achicadas se
                        vuelven una mancha en vez de leerse. */}
                    {marca.logos.slice(1, 3).map((l) => (
                      <img key={l} src={l} alt={`${marca.nombre}, otra versión del logo`}
                           className="w-full max-w-[11rem]" />
                    ))}
                  </div>
                ) : null}
              </>
            ) : (
              <LogoMascara src={marca.logo} color={marca.colorLogo}
                className="block h-24 w-[14rem] md:h-32 md:w-[15rem]" />
            )}
          </div>
        </div>

        <div className="mt-14">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em]" style={{ opacity: 0.8 }}>
            La paleta
          </p>
          <div className="mt-4 grid gap-3" style={{ gridTemplateColumns: `repeat(${marca.paleta.length}, minmax(0,1fr))` }}>
            {marca.paleta.map((c) => (
              <div key={c}>
                {/* El borde tiene que verse: algunas paletas incluyen el mismo
                    color del fondo y sin marco el cuadrito desaparece. */}
                <div className="h-20 md:h-28" style={{ background: c, outline: `1px solid ${marca.tinta}3D` }} />
                <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-wider" style={{ opacity: 0.8 }}>{c}</p>
              </div>
            ))}
          </div>
        </div>

        {marca.aplicaciones?.length ? (
          <div className="mt-14">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em]" style={{ opacity: 0.8 }}>
              Aplicada
            </p>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {marca.aplicaciones.map((a) => (
                <figure key={a.src}>
                  <img src={a.src} alt={`${marca.nombre} — ${a.pie}`} className="w-full" loading="lazy" />
                  <figcaption className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.14em]" style={{ opacity: 0.8 }}>
                    {a.pie}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ) : null}

        <button
          onClick={cerrar}
          className="mt-16 border-b pb-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] transition-opacity hover:opacity-60"
          style={{ borderColor: `${marca.tinta}59` }}
        >
          ← Volver a todas las marcas
        </button>
      </motion.div>
    </motion.div>
  );
};

const Marcas = () => {
  const [abierta, setAbierta] = useState<Marca | null>(null);

  return (
    <Marco>
      <section className="grano relative pb-14 pt-6">
        <div className="container mx-auto max-w-6xl px-6">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
            Portfolio · Branding e identidad
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
          <p className="mb-8 max-w-[34rem] text-sm text-background/60">
            Todas entran en la misma tinta: cada una fue diseñada para destacar, así que
            juntas y a todo color se pelean. Tocá una para entrar a su universo.
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
                aria-label={`Entrar al universo de ${m.nombre}`}
                className="group relative flex aspect-[4/3] items-center justify-center bg-tunel p-8 transition-colors hover:bg-background/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <LogoMascara src={m.logo} color="hsl(var(--background))"
                  className="h-16 w-full max-w-[9rem] opacity-70 transition-opacity group-hover:opacity-100" />
                {/* Sin esta pista, una grilla de logos no se lee como algo tocable */}
                <span className="pointer-events-none absolute bottom-4 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-primary opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  Entrar
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {abierta && <Universo marca={abierta} cerrar={() => setAbierta(null)} />}
      </AnimatePresence>
    </Marco>
  );
};

export default Marcas;
