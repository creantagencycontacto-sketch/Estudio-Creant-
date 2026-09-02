import { useState } from "react";
import { motion } from "framer-motion";
import Marco from "@/components/Marco";

/**
 * Portfolio de pauta.
 *
 * El contenido sale del relevamiento de Juan sobre las 11 cuentas del Business.
 * Dos reglas que vienen de ese documento y conviene no romper:
 *
 *  1. Cada anuncio se juzga por su rol en el embudo. Los de captación se miden
 *     por alcance, CPM y CTR; los de conversión por costo por conversación.
 *     Por eso cada tarjeta tiene UN dato protagonista y dos de apoyo.
 *  2. "Conversaciones", nunca "ventas": casi toda la cartera cierra por
 *     WhatsApp, fuera de la plataforma. Y ROAS solo donde hay Píxel.
 */

type Caso = {
  marca: string;
  anonima?: boolean;
  rubro: string;
  bajada: string;
  protagonista: { dato: string; que: string };
  apoyo: { dato: string; que: string }[];
  relato: string;
  moneda: "ARS" | "USD";
};

const CASOS: Caso[] = [
  {
    marca: "Satori Neumáticos", rubro: "Neumáticos", moneda: "ARS",
    bajada: "Venta mayorista y minorista de neumáticos de camión · cierre por WhatsApp",
    protagonista: { dato: "$96", que: "por conversación B2B" },
    apoyo: [{ dato: "5,70%", que: "CTR" }, { dato: "460", que: "conversaciones" }],
    relato: "La cuenta más profunda de la cartera: 3.368 conversaciones documentadas solo en los veinte anuncios de mayor inversión. El anuncio «Distribuidor» es probablemente el mejor que hicimos — noventa y seis pesos por una conversación B2B es un número que no necesita explicación.",
  },
  {
    marca: "CEA Electrónica", rubro: "Automotor", moneda: "ARS",
    bajada: "Ecosistema de tres cuentas · equipos de diagnóstico, tienda online y cursos",
    protagonista: { dato: "628.000", que: "reproducciones completas a $0,52" },
    apoyo: [{ dato: "895.000", que: "impresiones" }, { dato: "697", que: "conversaciones en un mes" }],
    relato: "Acá el mérito no es un anuncio, es la escala. Manejamos el ecosistema completo y solo en julio fueron más de ochocientos ochenta mil pesos de inversión administrada. Y tiene el caso de contenido más masivo que hicimos: dos videos educativos con 628 mil reproducciones completas a cincuenta y dos centavos cada una.",
  },
  {
    marca: "Epic", rubro: "E-commerce", moneda: "ARS",
    bajada: "Tienda online del grupo CEA · la única cuenta con compra medida por Píxel",
    protagonista: { dato: "16", que: "compras web con CPA de $4.365" },
    apoyo: [{ dato: "3,38%", que: "CTR" }, { dato: "357", que: "conversaciones a $123" }],
    relato: "La única cuenta de la cartera donde el Píxel mide compras de verdad, así que es la única donde podemos hablar de retorno. El resto cierra por WhatsApp, fuera de la plataforma: ahí medimos conversaciones, que es lo honesto.",
  },
  {
    marca: "My Magical Mili", rubro: "Viajes", moneda: "USD",
    bajada: "Agencia de viajes Disney & Universal · mercado hispano",
    protagonista: { dato: "USD 0,44", que: "por conversación" },
    apoyo: [{ dato: "39 → 126", que: "conversaciones en tres meses" }, { dato: "misma", que: "inversión mensual" }],
    relato: "La curva más limpia que tenemos: treinta y nueve conversaciones en mayo, ochenta y cinco en junio, ciento veintiséis en julio — con la misma plata todos los meses. El objetivo de la cuenta era un dólar cincuenta por conversación y terminamos en cuarenta y cuatro centavos.",
  },
  {
    marca: "Medicina estética", anonima: true, rubro: "Estética", moneda: "ARS",
    bajada: "Centro médico estético · consultas por WhatsApp",
    protagonista: { dato: "10,76%", que: "CTR" },
    apoyo: [{ dato: "1.774", que: "visitas a la web a $40" }, { dato: "854", que: "conversaciones en la cuenta" }],
    relato: "Un CTR de dos dígitos en uno de los rubros más caros para pautar. Va sin nombre porque es salud y la comunicación de la clienta es deliberadamente cuidada — el mérito acá es del rubro, no de la marca.",
  },
  {
    marca: "Refrigeración industrial", anonima: true, rubro: "Servicios B2B", moneda: "ARS",
    bajada: "Servicio técnico de refrigeración civil e industrial · CABA y GBA",
    protagonista: { dato: "13,49%", que: "CTR — el más alto de la cartera" },
    apoyo: [{ dato: "709", que: "visitas a $27,51" }, { dato: "814", que: "visitas de perfil a $16,64" }],
    relato: "Uno de cada siete que vio el anuncio lo tocó. En servicio técnico B2B, un rubro donde nadie espera que la pauta funcione. Es el mejor CTR que registramos en toda la agencia.",
  },
  {
    marca: "Salud mental", anonima: true, rubro: "Salud", moneda: "USD",
    bajada: "Psiquiatría y mindfulness · público hispano",
    protagonista: { dato: "USD 0,27", que: "de CPM" },
    apoyo: [{ dato: "56.063", que: "personas con USD 20" }, { dato: "USD 0,01", que: "por visita de perfil" }],
    relato: "El alcance más barato que conseguimos: veintisiete centavos de dólar cada mil impresiones. En salud mental el contenido de identificación emocional rinde distinto, y estos números lo muestran.",
  },
  {
    marca: "Creant", rubro: "Agencia", moneda: "ARS",
    bajada: "Nuestra propia marca · nos aplicamos lo mismo que vendemos",
    protagonista: { dato: "11,34%", que: "CTR" },
    apoyo: [{ dato: "736", que: "visitas a la web a $32" }, { dato: "23.602", que: "personas alcanzadas" }],
    relato: "Números chicos al lado de los clientes, y va igual. El punto no es el volumen: es que invertimos en nuestra propia marca y nos rinde. Si no lo hiciéramos, no tendríamos con qué venderlo.",
  },
];

const RUBROS = ["Todos", ...Array.from(new Set(CASOS.map((c) => c.rubro)))];

const Pauta = () => {
  const [rubro, setRubro] = useState("Todos");
  const [abierta, setAbierta] = useState<string | null>(null);
  const visibles = rubro === "Todos" ? CASOS : CASOS.filter((c) => c.rubro === rubro);

  return (
    <Marco>
      {/* Cabecera con los números de toda la cartera */}
      <section className="grano relative pb-16 pt-6">
        <div className="container mx-auto max-w-6xl px-6">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
            Portfolio · Publicidad en Meta
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-[clamp(2.4rem,8vw,5.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em]">
            Lo que hicimos<br /><span className="text-accent">con la plata de otros</span>
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg text-muted-foreground">
            Once cuentas publicitarias, ocho rubros. Cada caso muestra el número que
            corresponde a lo que ese anuncio tenía que lograr — no el que queda más lindo.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-px bg-border md:grid-cols-4">
            {[
              { n: "+6.500", q: "conversaciones iniciadas" },
              { n: "+5M", q: "impresiones servidas" },
              { n: "11", q: "cuentas gestionadas" },
              { n: "8", q: "rubros distintos" },
            ].map((d) => (
              <div key={d.q} className="bg-background px-5 py-7">
                <p className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-none tracking-tight text-accent">{d.n}</p>
                <p className="mt-2 font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.12em] text-muted-foreground">{d.q}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Los casos, en la cámara */}
      <section className="grano relative bg-tunel py-16 text-background">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-10 flex flex-wrap gap-2">
            {RUBROS.map((r) => (
              <button
                key={r}
                onClick={() => setRubro(r)}
                className={`border px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] transition-colors ${
                  rubro === r
                    ? "border-primary bg-primary text-foreground"
                    : "border-background/25 text-background/70 hover:border-primary hover:text-background"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="grid gap-px bg-background/15 md:grid-cols-2">
            {visibles.map((c, i) => {
              const abiertaEsta = abierta === c.marca;
              return (
                <motion.article
                  key={c.marca}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
                  className="bg-tunel p-8"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight">{c.marca}</h2>
                    <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-primary">{c.moneda}</span>
                  </div>
                  <p className="mt-1 text-sm text-background/55">{c.bajada}</p>
                  {c.anonima && (
                    <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-background/40">
                      Sin nombre a pedido del cliente
                    </p>
                  )}

                  <p className="mt-7 font-display text-[clamp(2.2rem,5vw,3.2rem)] font-extrabold leading-none tracking-tight text-primary">
                    {c.protagonista.dato}
                  </p>
                  <p className="mt-2 text-sm text-background/70">{c.protagonista.que}</p>

                  <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-background/15 pt-5">
                    {c.apoyo.map((a) => (
                      <div key={a.que}>
                        <p className="font-display text-lg font-extrabold tracking-tight">{a.dato}</p>
                        <p className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-background/50">{a.que}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setAbierta(abiertaEsta ? null : c.marca)}
                    aria-expanded={abiertaEsta}
                    className="mt-6 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-primary transition-opacity hover:opacity-75"
                  >
                    {abiertaEsta ? "Cerrar" : "Cómo se logró →"}
                  </button>

                  {abiertaEsta && (
                    <p className="mt-4 border-l-2 border-primary pl-4 leading-relaxed text-background/80">
                      {c.relato}
                    </p>
                  )}
                </motion.article>
              );
            })}
          </div>

          <p className="mt-12 max-w-[38rem] text-sm leading-relaxed text-background/45">
            Los números salen del Administrador de Anuncios de Meta y cubren toda la vida de
            cada cuenta. Cada moneda se muestra como se invirtió, sin convertir. Decimos
            «conversaciones» y no «ventas» porque casi toda la cartera cierra por WhatsApp,
            fuera de la plataforma.
          </p>
        </div>
      </section>
    </Marco>
  );
};

export default Pauta;
