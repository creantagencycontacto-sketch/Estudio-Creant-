import { useState } from "react";
import { motion } from "framer-motion";
import Marco from "@/components/Marco";

/**
 * Portfolio de pauta.
 *
 * Regla de escritura: la tarjeta se lee de arriba a abajo como una historia
 * —qué necesitaba el cliente, qué hicimos, qué pasó— y recién al final aparece
 * el número. Nadie que contrate una agencia sabe qué es un CTR: si el dato
 * necesita un glosario, la tarjeta está mal escrita.
 *
 * Dos reglas que vienen del relevamiento de Juan y conviene no romper:
 *  · "Conversaciones", nunca "ventas": casi toda la cartera cierra por WhatsApp,
 *    fuera de la plataforma. Y ROAS solo donde el Píxel mide compras.
 *  · Cada moneda se muestra como se invirtió, sin convertir.
 *
 * Ningún cliente aparece con nombre: todos van por rubro. La única marca
 * nombrada es la nuestra.
 */

type Grafico =
  | { tipo: "puntos"; llenos: number; leyenda: string }
  | { tipo: "barras"; unidad: string; datos: { etiqueta: string; valor: number }[]; menorEsMejor?: boolean };

type Caso = {
  rubro: string;
  titulo: string;
  contexto: string;
  objetivo: string;
  comoLoHicimos: string;
  resultado: string;
  queSignifica: string;
  grafico: Grafico;
  moneda: "ARS" | "USD";
};

const CASOS: Caso[] = [
  {
    rubro: "Neumáticos", titulo: "Neumáticos de camión", moneda: "ARS",
    contexto: "Venta mayorista y minorista · cierre por WhatsApp",
    objetivo: "Que los talleres y revendedores escriban para pedir precio, sin salir a buscarlos uno por uno.",
    comoLoHicimos: "Dejamos de hablarle al consumidor final y le hablamos al que compra por volumen. Probamos tres piezas distintas y sostuvimos la que traía consultas más baratas.",
    resultado: "$96 por consulta",
    queSignifica: "Cada persona que escribió costó menos de cien pesos. Es el mejor número que consiguió la agencia en toda su historia.",
    grafico: { tipo: "barras", unidad: "$ por consulta", menorEsMejor: true,
      datos: [{ etiqueta: "Pieza ganadora", valor: 96 }, { etiqueta: "Segunda", valor: 209 }, { etiqueta: "Tercera", valor: 313 }] },
  },
  {
    rubro: "Automotor", titulo: "Electrónica automotriz", moneda: "ARS",
    contexto: "Ecosistema de tres cuentas · equipos, tienda online y cursos",
    objetivo: "Sostener tres negocios distintos al mismo tiempo sin que se pisen entre ellos.",
    comoLoHicimos: "En vez de publicidad directa hicimos contenido que enseña el oficio. Primero el técnico aprende algo, después conoce la marca que se lo enseñó.",
    resultado: "7 de cada 10 lo miraron entero",
    queSignifica: "628 mil personas vieron el video completo, a cincuenta y dos centavos cada una. No lo saltearon: se quedaron.",
    grafico: { tipo: "puntos", llenos: 70, leyenda: "de cada 100 personas que empezaron el video, lo terminaron" },
  },
  {
    rubro: "E-commerce", titulo: "Tienda de equipos técnicos", moneda: "ARS",
    contexto: "La única cuenta donde el Píxel mide la compra completa",
    objetivo: "Vender equipos caros directamente por la web, no solo generar consultas.",
    comoLoHicimos: "Instalamos la medición de compra en la tienda y reorientamos las campañas hacia quien efectivamente compraba, no hacia quien solo miraba.",
    resultado: "16 compras online",
    queSignifica: "De cada veintidós personas que escribieron, una terminó comprando sin hablar con nadie. En el resto de la cartera la venta se cierra por WhatsApp.",
    grafico: { tipo: "barras", unidad: "personas",
      datos: [{ etiqueta: "Escribieron", valor: 357 }, { etiqueta: "Compraron en la web", valor: 16 }] },
  },
  {
    rubro: "Viajes", titulo: "Viajes a parques temáticos", moneda: "USD",
    contexto: "Mercado hispano · consultas por WhatsApp",
    objetivo: "Conseguir más consultas de familias sin aumentar un peso el presupuesto mensual.",
    comoLoHicimos: "Pusimos el precio a la vista en el anuncio. Tres meses seguidos ganó la pieza que decía cuánto salía el viaje, contra las que lo escondían.",
    resultado: "El triple de consultas con la misma plata",
    queSignifica: "De 39 consultas en mayo a 126 en julio, invirtiendo exactamente lo mismo todos los meses.",
    grafico: { tipo: "barras", unidad: "consultas por mes",
      datos: [{ etiqueta: "Mayo", valor: 39 }, { etiqueta: "Junio", valor: 85 }, { etiqueta: "Julio", valor: 126 }] },
  },
  {
    rubro: "Estética", titulo: "Medicina estética", moneda: "ARS",
    contexto: "Centro médico · sin precios públicos",
    objetivo: "Llenar la agenda de consultas en un rubro donde la clienta no quiere publicar precios.",
    comoLoHicimos: "Contenido que explica el tratamiento en vez de ofertarlo. El único paso siguiente posible es preguntar.",
    resultado: "11 de cada 100 tocaron el anuncio",
    queSignifica: "En un rubro donde la publicidad es carísima, una de cada nueve personas que lo vio quiso saber más.",
    grafico: { tipo: "puntos", llenos: 11, leyenda: "de cada 100 personas que vieron el anuncio, tocaron" },
  },
  {
    rubro: "Servicios B2B", titulo: "Refrigeración industrial", moneda: "ARS",
    contexto: "Servicio técnico civil e industrial · CABA y GBA",
    objetivo: "Que las empresas llamen para el mantenimiento antes de que el equipo se rompa, no después.",
    comoLoHicimos: "En vez de ofrecer el servicio mostramos el problema: qué pasa cuando no hacés mantenimiento. El miedo a la rotura vende más que el descuento.",
    resultado: "13 de cada 100 tocaron el anuncio",
    queSignifica: "Es el número más alto de toda la cartera. Y en un rubro donde nadie espera que la publicidad funcione.",
    grafico: { tipo: "puntos", llenos: 13, leyenda: "de cada 100 personas que vieron el anuncio, tocaron" },
  },
  {
    rubro: "Salud", titulo: "Salud mental", moneda: "USD",
    contexto: "Consultorio online · público hispano",
    objetivo: "Llegar a mucha gente con poquísimo presupuesto, en un tema donde hay que hablar con cuidado.",
    comoLoHicimos: "Contenido de identificación —situaciones cotidianas, no diagnósticos ni promesas—. La gente se reconoce y comparte, y eso abarata el alcance.",
    resultado: "56.000 personas con 20 dólares",
    queSignifica: "Llegar a mil personas costó veintisiete centavos. Es el alcance más barato que conseguimos.",
    grafico: { tipo: "barras", unidad: "personas alcanzadas",
      datos: [{ etiqueta: "Pieza que funcionó", valor: 56063 }, { etiqueta: "Pieza anterior", valor: 9508 }] },
  },
  {
    rubro: "Agencia", titulo: "Creant", moneda: "ARS",
    contexto: "Nuestra propia marca",
    objetivo: "Probar en casa lo que vendemos afuera. Si no nos funciona a nosotros, no lo podemos ofrecer.",
    comoLoHicimos: "Promocionamos piezas que ya habían funcionado solas en el perfil, en vez de fabricar anuncios nuevos desde cero.",
    resultado: "11 de cada 100 tocaron el anuncio",
    queSignifica: "Números chicos al lado de los clientes, y va igual: la agencia también invierte en su propia marca.",
    grafico: { tipo: "puntos", llenos: 11, leyenda: "de cada 100 personas que vieron el anuncio, tocaron" },
  },
];

const RUBROS = ["Todos", ...Array.from(new Set(CASOS.map((c) => c.rubro)))];

/** Cien puntitos, y se pintan los que corresponden. Un porcentaje explicado
 *  con palabras se olvida; contado en puntos se entiende de un vistazo. */
const Puntos = ({ llenos, leyenda }: { llenos: number; leyenda: string }) => (
  <div>
    <div className="grid w-fit grid-cols-10 gap-[3px]">
      {Array.from({ length: 100 }, (_, i) => (
        <span key={i} className={`h-[7px] w-[7px] ${i < llenos ? "bg-primary" : "bg-background/20"}`} />
      ))}
    </div>
    <p className="mt-3 text-xs leading-relaxed text-background/55">
      <b className="font-semibold text-primary">{llenos}</b> {leyenda}
    </p>
  </div>
);

/** Barras comparadas. Cuando menos es mejor —un costo— se aclara, porque si no
 *  la barra más larga se lee como la mejor y es al revés. */
const Barras = ({ datos, unidad, menorEsMejor }: Extract<Grafico, { tipo: "barras" }>) => {
  const max = Math.max(...datos.map((d) => d.valor));
  const mejor = menorEsMejor ? Math.min(...datos.map((d) => d.valor)) : max;
  return (
    <div>
      <div className="flex flex-col gap-3">
        {datos.map((d) => (
          <div key={d.etiqueta}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-xs text-background/60">{d.etiqueta}</span>
              <span className={`font-display text-sm font-extrabold tabular-nums ${d.valor === mejor ? "text-primary" : "text-background/70"}`}>
                {d.valor.toLocaleString("es-AR")}
              </span>
            </div>
            <div className="mt-1 h-2 w-full bg-background/15">
              <div
                className={`h-full ${d.valor === mejor ? "bg-primary" : "bg-background/35"}`}
                style={{ width: `${Math.max(4, (d.valor / max) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-background/45">
        {unidad}{menorEsMejor ? " · más corto es mejor" : ""}
      </p>
    </div>
  );
};

const Pauta = () => {
  const [rubro, setRubro] = useState("Todos");
  const visibles = rubro === "Todos" ? CASOS : CASOS.filter((c) => c.rubro === rubro);

  return (
    <Marco>
      <section className="grano relative pb-16 pt-6">
        <div className="container mx-auto max-w-6xl px-6">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
            Portfolio · Publicidad en Meta
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-[clamp(2.4rem,8vw,5.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em]">
            Lo que hicimos<br /><span className="text-accent">con la plata de otros</span>
          </h1>
          <p className="mt-6 max-w-[36rem] text-lg text-muted-foreground">
            Once cuentas publicitarias, ocho rubros. Cada caso cuenta qué necesitaba
            el cliente, qué hicimos y qué pasó. Sin jerga y sin números inflados.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-px bg-border md:grid-cols-4">
            {[
              { n: "+6.500", q: "personas escribieron" },
              { n: "+5M", q: "veces se mostraron los anuncios" },
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

      <section className="grano relative bg-tunel py-16 text-background">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-10 flex flex-wrap gap-2">
            {RUBROS.map((r) => (
              <button key={r} onClick={() => setRubro(r)}
                className={`border px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] transition-colors ${
                  rubro === r ? "border-primary bg-primary text-foreground"
                              : "border-background/25 text-background/70 hover:border-primary hover:text-background"}`}>
                {r}
              </button>
            ))}
          </div>

          <div className="grid gap-px bg-background/15 md:grid-cols-2">
            {visibles.map((c, i) => (
              <motion.article key={c.titulo}
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
                className="flex flex-col bg-tunel p-8">

                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-display text-2xl font-extrabold uppercase leading-tight tracking-tight">{c.titulo}</h2>
                  <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-primary">{c.moneda}</span>
                </div>
                <p className="mt-1 text-sm text-background/50">{c.contexto}</p>

                <div className="mt-7 space-y-5">
                  <div>
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-primary">Qué necesitaba</p>
                    <p className="mt-1.5 leading-relaxed text-background/80">{c.objetivo}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-primary">Qué hicimos</p>
                    <p className="mt-1.5 leading-relaxed text-background/80">{c.comoLoHicimos}</p>
                  </div>
                </div>

                <div className="mt-7 border-t border-background/15 pt-6">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-primary">Qué pasó</p>
                  <p className="mt-2 font-display text-[clamp(1.6rem,3.5vw,2.2rem)] font-extrabold leading-none tracking-tight">
                    {c.resultado}
                  </p>
                  <p className="mt-3 leading-relaxed text-background/65">{c.queSignifica}</p>
                </div>

                <div className="mt-7">
                  {c.grafico.tipo === "puntos"
                    ? <Puntos llenos={c.grafico.llenos} leyenda={c.grafico.leyenda} />
                    : <Barras {...c.grafico} />}
                </div>
              </motion.article>
            ))}
          </div>

          <p className="mt-12 max-w-[38rem] text-sm leading-relaxed text-background/45">
            Los números salen del Administrador de Anuncios de Meta y cubren toda la vida de
            cada cuenta. Cada moneda se muestra como se invirtió, sin convertir. Y decimos
            «consultas» y no «ventas» porque casi toda la cartera cierra por WhatsApp, fuera
            de la plataforma: contar como venta algo que no podemos ver sería inventar.
          </p>
        </div>
      </section>
    </Marco>
  );
};

export default Pauta;
