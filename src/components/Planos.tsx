import { motion } from "framer-motion";
import Calesita from "@/components/Calesita";

/**
 * El universo de una marca, armado por planos.
 *
 * La version anterior era la misma ficha para las ocho: la tipografia de
 * Creant, las etiquetas en mono, la paleta en cuadritos y las piezas en
 * grillas parejas con epigrafe. Cambiaba el color de fondo y nada mas, asi que
 * entrar a una marca se sentia como seguir en la web.
 *
 * Aca cada marca arma su propia secuencia, y la que habla es la marca: sus
 * piezas a sangre, sus colores como campos enteros, su forma propia en los
 * cortes. El texto del estudio va en caja baja y sin gritar —es una nota al
 * margen del trabajo, no el titular—. La tipografia de Creant recien vuelve en
 * la navegacion del final, que es justamente cuando uno sale del universo.
 */

export type Pieza = { src: string; alt: string };

/** Los textos salen de la ficha de la marca y no se repiten en los planos:
 *  asi una correccion de copy se hace en un solo lugar. */
export type Textos = { pregunta: string; relato: string; cierre?: string };

type Base = {
  /** Un corte ondulado arriba en vez de una linea recta. Toma el color de
   *  este plano y se monta sobre el anterior. */
  onda?: boolean;
};

export type Plano = Base & (
  | { tipo: "portada"; fondo: string; tinta: string; logo: string; alt: string; bajada: string; detalle?: string }
  | { tipo: "pregunta"; fondo: string; tinta: string; alcance: string[] }
  | { tipo: "relato"; fondo: string; tinta: string; pieza?: Pieza & { fondo: string } }
  | { tipo: "estante"; fondo: string; tinta: string; titulo: string; piezas: Pieza[] }
  | { tipo: "calesita"; fondo: string; tinta: string; titulo: string; piezas: Pieza[] }
  | { tipo: "galeria"; fondo: string; tinta: string; titulo?: string; columnas: 2 | 3; piezas: Pieza[] }
  | { tipo: "par"; fondo: string; piezas: [Pieza, Pieza] }
  | { tipo: "cita"; fondo: string; tinta: string }
  | { tipo: "paleta"; fondo: string; colores: string[] }
);

// Un solo periodo de la onda, repetido a lo ancho. Va como mascara y el color
// lo pone el fondo: asi la misma onda sirve para cualquier plano. Medida fija
// en pixeles y no estirada al ancho: estirada, en celular se volvia un
// serrucho y en pantalla grande una lomada.
const ONDA =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='24'%3E%3Cpath d='M0 24V12Q18 0 36 12T72 12V24Z'/%3E%3C/svg%3E\")";

const Onda = ({ color }: { color: string }) => (
  <span
    aria-hidden="true"
    // Un pixel de solape con el plano de arriba: sin eso, en algunas
    // pantallas queda una rayita del fondo entre la onda y el bloque.
    className="pointer-events-none absolute inset-x-0 -top-[23px] block h-6"
    style={{
      background: color,
      WebkitMaskImage: ONDA, maskImage: ONDA,
      WebkitMaskRepeat: "repeat-x", maskRepeat: "repeat-x",
      WebkitMaskSize: "72px 24px", maskSize: "72px 24px",
      WebkitMaskPosition: "left bottom", maskPosition: "left bottom",
    }}
  />
);

const Aparece = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }}
    className={className}
  >
    {children}
  </motion.div>
);

const PlanoUnico = ({ p, t }: { p: Plano; t: Textos }) => {
  switch (p.tipo) {
    case "portada":
      return (
        <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-24 text-center"
                 style={{ background: p.fondo, color: p.tinta }}>
          <motion.img
            src={p.logo} alt={p.alt}
            initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
            className="w-[min(72vw,26rem)]"
          />
          <p className="mt-10 text-xl font-semibold md:text-2xl">{p.bajada}</p>
          {p.detalle ? <p className="mt-2 text-base opacity-80">{p.detalle}</p> : null}
          <span aria-hidden="true" className="absolute bottom-8 text-2xl opacity-60">↓</span>
        </section>
      );

    case "pregunta":
      return (
        <section className="relative px-6 py-24 md:py-32" style={{ background: p.fondo, color: p.tinta }}>
          {p.onda ? <Onda color={p.fondo} /> : null}
          <Aparece className="mx-auto max-w-5xl">
            <p className="max-w-[46rem] text-[clamp(1.9rem,5vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
              {t.pregunta}
            </p>
            {/* Lo que el que mira tiene que poder responder sin leer el
                relato: que se hizo en esta marca. */}
            <div className="mt-14 md:mt-20">
              <p className="text-sm font-semibold">Qué hicimos</p>
              <ul className="mt-4 grid border-t md:grid-cols-2 md:gap-x-10" style={{ borderColor: `${p.tinta}40` }}>
                {p.alcance.map((a) => (
                  <li key={a} className="border-b py-4 text-lg md:text-xl" style={{ borderColor: `${p.tinta}40` }}>{a}</li>
                ))}
              </ul>
            </div>
          </Aparece>
        </section>
      );

    case "relato":
      return (
        <section className="relative px-6 py-24 md:py-32" style={{ background: p.fondo, color: p.tinta }}>
          {p.onda ? <Onda color={p.fondo} /> : null}
          <div className={`mx-auto grid max-w-5xl items-center gap-12 ${p.pieza ? "md:grid-cols-2 md:gap-16" : ""}`}>
            <Aparece>
              <p className="max-w-[36rem] text-lg leading-relaxed md:text-xl">{t.relato}</p>
            </Aparece>
            {p.pieza ? (
              <Aparece>
                <div style={{ background: p.pieza.fondo }}>
                  <img src={p.pieza.src} alt={p.pieza.alt} loading="lazy" className="w-full" />
                </div>
              </Aparece>
            ) : null}
          </div>
        </section>
      );

    case "estante":
      return (
        <section className="relative py-24 md:py-32" style={{ background: p.fondo, color: p.tinta }}>
          {p.onda ? <Onda color={p.fondo} /> : null}
          <Aparece className="mx-auto max-w-6xl px-6">
            <p className="max-w-[30rem] text-[clamp(1.6rem,4vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
              {p.titulo}
            </p>
          </Aparece>
          {/* En celular es un estante que se recorre de costado, como mirar
              frascos en una gondola: apiladas de a dos, diez etiquetas son
              cinco pantallas de lo mismo. En compu entran todas a la vista. */}
          <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:mx-auto md:grid md:max-w-6xl md:grid-cols-5 md:gap-6 md:overflow-visible md:pb-0">
            {p.piezas.map((x, i) => (
              <motion.img
                key={x.src} src={x.src} alt={x.alt} loading="lazy"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: (i % 5) * 0.06 }}
                className="w-[44vw] max-w-[14rem] shrink-0 snap-start md:w-full md:max-w-none"
              />
            ))}
          </div>
        </section>
      );

    case "calesita":
      // Las piezas en ronda: giran solas, se arrastran para girarlas a mano, y
      // tocar una la trae al frente y la deja quieta para mirarla. En celular
      // la ronda llega hasta el borde de la pantalla.
      return (
        <section className="relative py-24 md:py-32" style={{ background: p.fondo, color: p.tinta }}>
          {p.onda ? <Onda color={p.fondo} /> : null}
          <Aparece className="mx-auto max-w-6xl px-6">
            <p className="max-w-[30rem] text-[clamp(1.6rem,4vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
              {p.titulo}
            </p>
          </Aparece>
          <div className="mx-auto mt-12 max-w-6xl md:px-6">
            <Calesita
              items={p.piezas} titulo={p.titulo} tinta={p.tinta}
              nombre={(x) => x.alt}
              ancho="w-[36vw] max-w-[12rem]"
              cara={(x) => (
                <img src={x.src} alt="" draggable={false} loading="lazy" className="aspect-[3/5] w-full object-cover" />
              )}
            />
          </div>
        </section>
      );

    case "galeria":
      return (
        <section className="relative px-6 py-24 md:py-32" style={{ background: p.fondo, color: p.tinta }}>
          {p.onda ? <Onda color={p.fondo} /> : null}
          <div className="mx-auto max-w-5xl">
            {p.titulo ? (
              <Aparece>
                <p className="max-w-[30rem] text-[clamp(1.6rem,4vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
                  {p.titulo}
                </p>
              </Aparece>
            ) : null}
          </div>
          {/* De a tres en celular quedaban dos arriba y una sola abajo, que
              parece que falta algo. Ahi va como el estante: de costado. */}
          <div className={`${p.titulo ? "mt-12" : ""} ${p.columnas === 3
            ? "-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:mx-auto md:grid md:max-w-5xl md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0"
            : "mx-auto grid max-w-5xl gap-6 md:grid-cols-2"}`}>
            {p.piezas.map((x) => (
              <Aparece key={x.src} className={p.columnas === 3 ? "w-[58vw] max-w-[17rem] shrink-0 snap-start md:w-auto md:max-w-none" : ""}>
                <img src={x.src} alt={x.alt} loading="lazy" className="w-full" />
              </Aparece>
            ))}
          </div>
        </section>
      );

    case "par":
      // A sangre y sin aire entre las dos: dos piezas pegadas se leen como una
      // sola escena, separadas se vuelven una grilla de catalogo.
      return (
        <section className="relative grid md:grid-cols-2" style={{ background: p.fondo }}>
          {p.onda ? <Onda color={p.fondo} /> : null}
          {p.piezas.map((x) => (
            <img key={x.src} src={x.src} alt={x.alt} loading="lazy" className="aspect-square w-full object-cover" />
          ))}
        </section>
      );

    case "cita":
      if (!t.cierre) return null;
      return (
        <section className="relative px-6 py-24 md:py-36" style={{ background: p.fondo, color: p.tinta }}>
          {p.onda ? <Onda color={p.fondo} /> : null}
          <Aparece className="mx-auto max-w-4xl">
            <p className="text-[clamp(1.6rem,4.4vw,3rem)] font-semibold leading-[1.15] tracking-[-0.015em]">
              «{t.cierre}»
            </p>
          </Aparece>
        </section>
      );

    case "paleta":
      // Bloques grandes y no muestritas, pero sobre un fondo propio y con
      // aire entre ellos: pegados a sangre, el color que coincidia con el
      // plano de arriba se fundia con el y la paleta parecia tener uno menos.
      //
      // Sin codigos de color. El portfolio muestra el resultado; los codigos
      // son del manual, que es del cliente y no se publica.
      return (
        <section className="relative px-6 py-16 md:py-20" style={{ background: p.fondo }}>
          <div className="mx-auto grid max-w-5xl gap-2" style={{ gridTemplateColumns: `repeat(${p.colores.length}, minmax(0,1fr))` }}>
            {p.colores.map((c) => (
              <div key={c} aria-hidden="true" className="h-32 md:h-44" style={{ background: c }} />
            ))}
          </div>
        </section>
      );
  }
};

const Planos = ({ planos, textos }: { planos: Plano[]; textos: Textos }) => (
  <>
    {planos.map((p, i) => <PlanoUnico key={i} p={p} t={textos} />)}
  </>
);

export default Planos;
