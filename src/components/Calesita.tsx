import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";

/**
 * La calesita: las piezas dan vueltas en ronda, como los caballitos vistos
 * desde afuera. La de adelante va grande y entera; las de atras pasan chicas y
 * apagadas por detras.
 *
 * Gira sola y tambien a mano: se arrastra para hacerla girar, y al soltar
 * sigue con el envion hasta volver a su ritmo. Con el mouse encima se frena,
 * para poder tocar una sin perseguirla, y el boton la detiene del todo: lo que
 * se mueve solo mas de cinco segundos tiene que poder pararse.
 *
 * No es 3D de verdad. Cada tarjeta se ubica en una elipse y se achica y apaga
 * segun que tan atras esta, pero siempre mirando de frente: asi nunca queda
 * espejada ni de canto, y un logo o una etiqueta se leen en cualquier punto de
 * la vuelta.
 */

type Props<T> = {
  items: T[];
  /** Lo que se ve en cada tarjeta. */
  cara: (item: T) => ReactNode;
  /** Como se anuncia cada tarjeta en un lector de pantalla. */
  nombre: (item: T) => string;
  /** Que pasa al tocar una. Sin esto, tocarla la trae al frente y frena la
   *  calesita, para poder mirarla quieta. */
  alTocar?: (item: T) => void;
  /** Ancho de cada tarjeta, en clases de Tailwind. */
  ancho: string;
  /** Lo que va abajo, con la que esta al frente. */
  pie?: (item: T) => ReactNode;
  /** Color de los controles. */
  tinta: string;
  /** Nombre del conjunto, para lectores de pantalla. */
  titulo: string;
  /** Clases extra para la ronda, por ejemplo para que llegue al borde de la
   *  pantalla en celular. */
  claseRonda?: string;
  /** Segundos que tarda en dar una vuelta sola. */
  vuelta?: number;
};

const TAU = Math.PI * 2;
// Cuanto le falta a un angulo para llegar al frente, por el camino corto
const hastaElFrente = (a: number) => a - TAU * Math.round(a / TAU);
// La ronda se ve desde un poco mas arriba, como una calesita parado al lado:
// las de atras suben y las de adelante bajan, en fraccion del alto de una
// tarjeta. Sin esa inclinacion la elipse se aplasta y se lee como una fila.
const INCLINACION = 0.18;
// Tamano de la de mas atras, al lado de la de adelante
const ATRAS = 0.5;

const Calesita = <T,>({ items, cara, nombre, alTocar, ancho, pie, tinta, titulo, claseRonda = "", vuelta = 50 }: Props<T>) => {
  const ronda = useRef<HTMLDivElement>(null);
  const tarjetas = useRef<(HTMLButtonElement | null)[]>([]);
  const quieta = useReducedMotion() ?? false;
  const [frente, setFrente] = useState(0);
  const [pausada, setPausada] = useState(false);

  // Lo que cambia en cada cuadro vive en refs y se pinta directo en el DOM:
  // con estado de React serian sesenta renders por segundo.
  const giro = useRef({
    angulo: 0,
    vel: 0,
    destino: null as number | null,
    encima: false,
    foco: false,
    pausada: false,
    arrastre: null as null | { id: number; x0: number; x: number; t: number; movio: boolean },
  });
  const medida = useRef({ radio: 0, alto: 0 });
  const frenteActual = useRef(0);
  const huboArrastre = useRef(false);
  giro.current.pausada = pausada;

  const paso = TAU / items.length;

  const pintar = useCallback(() => {
    const g = giro.current;
    const { radio, alto } = medida.current;
    let mejor = 0;
    let masAdelante = -2;
    tarjetas.current.forEach((el, i) => {
      if (!el) return;
      const t = g.angulo + i * paso;
      const profundidad = Math.cos(t); // 1 adelante, -1 atras
      const cerca = (profundidad + 1) / 2; // 0 atras, 1 adelante
      const x = radio * Math.sin(t);
      const y = alto * INCLINACION * profundidad;
      const escala = ATRAS + (1 - ATRAS) * cerca;
      el.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${escala.toFixed(3)})`;
      el.style.opacity = (0.16 + 0.84 * cerca ** 1.8).toFixed(3);
      el.style.zIndex = String(Math.round(cerca * 100));
      // La mitad de atras queda tapada por la de adelante: no se toca
      el.style.pointerEvents = profundidad > 0 ? "auto" : "none";
      if (profundidad > masAdelante) {
        masAdelante = profundidad;
        mejor = i;
      }
    });
    if (mejor !== frenteActual.current) {
      frenteActual.current = mejor;
      setFrente(mejor);
    }
  }, [paso]);

  // La ronda se mide sola: el radio sale del ancho disponible y el alto, de
  // las tarjetas. Y se pinta una vez antes del primer cuadro, para que nunca
  // se vean todas apiladas en el medio.
  useLayoutEffect(() => {
    const el = ronda.current;
    const primera = tarjetas.current[0];
    if (!el || !primera) return;
    const medir = () => {
      const t = primera.offsetWidth;
      const h = primera.offsetHeight;
      // Las de los costados llegan justo al borde. En pantallas anchas el
      // radio tiene tope: abierta de mas, la ronda se desarma en una fila.
      const costado = (1 + ATRAS) / 2;
      medida.current = { radio: Math.max(0, Math.min((el.clientWidth - t * costado) / 2, t * 2.2)), alto: h };
      // Lo mas alto es la de atras, que sube; lo mas bajo, la de adelante. El
      // escenario va de una a la otra, con 12 px de aire arriba y abajo.
      const arriba = Math.max(0.5 - INCLINACION, INCLINACION + ATRAS / 2) * h;
      const abajo = (INCLINACION + 0.5) * h;
      const ancla = `${Math.round(arriba + 12)}px`;
      const altura = `${Math.round(arriba + abajo + 24)}px`;
      if (el.style.height !== altura) el.style.height = altura;
      tarjetas.current.forEach((c) => {
        if (c) c.style.top = ancla;
      });
      pintar();
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    ro.observe(primera);
    return () => ro.disconnect();
  }, [pintar]);

  useEffect(() => {
    const el = ronda.current;
    if (!el) return;
    const velPropia = quieta ? 0 : -TAU / vuelta;
    let raf = 0;
    let previo = 0;
    let visible = false;
    // Si llega un aviso de visibilidad despues de desmontar, no arranca otra
    // vuelta: dos a la vez giran la ronda al doble de velocidad.
    let vivo = true;
    const cuadro = (ahora: number) => {
      raf = 0;
      if (!visible || !vivo) return;
      const dt = previo ? Math.min(0.05, (ahora - previo) / 1000) : 0;
      previo = ahora;
      const g = giro.current;
      if (!g.arrastre) {
        if (g.destino !== null) {
          // Hacia la tarjeta elegida, frenando al llegar
          const falta = g.destino - g.angulo;
          g.angulo += falta * (1 - Math.exp(-dt * 9));
          g.vel = 0;
          if (Math.abs(falta) < 0.001) {
            g.angulo = g.destino;
            g.destino = null;
          }
        } else {
          const quiere = g.pausada || g.encima || g.foco ? 0 : velPropia;
          // El envion de la mano se apaga de a poco hasta el ritmo propio
          g.vel += (quiere - g.vel) * (1 - Math.exp(-dt / 0.7));
          g.angulo += g.vel * dt;
          // Detenida, cuando el envion casi se apago termina de acomodarse
          // con una tarjeta justo al frente, y no a mitad de camino. Con el
          // mouse encima no: correria la tarjeta que se esta por tocar.
          if (g.pausada && Math.abs(g.vel) < 0.2) g.destino = paso * Math.round(g.angulo / paso);
        }
      }
      pintar();
      raf = requestAnimationFrame(cuadro);
    };
    // Fuera de la pantalla no gira: no gasta bateria en algo que nadie ve
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) {
        previo = 0;
        raf = requestAnimationFrame(cuadro);
      }
    });
    io.observe(el);
    return () => {
      vivo = false;
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [pintar, quieta, vuelta, paso]);

  const traer = (i: number) => {
    const g = giro.current;
    g.destino = g.angulo - hastaElFrente(g.angulo + i * paso);
  };

  const apretar = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    huboArrastre.current = false;
    giro.current.destino = null;
    giro.current.arrastre = { id: e.pointerId, x0: e.clientX, x: e.clientX, t: performance.now(), movio: false };
  };

  const mover = (e: React.PointerEvent) => {
    const g = giro.current;
    const a = g.arrastre;
    if (!a || a.id !== e.pointerId) return;
    if (!a.movio) {
      // Hasta los 6 px es un toque, no un arrastre
      if (Math.abs(e.clientX - a.x0) < 6) return;
      a.movio = true;
      huboArrastre.current = true;
      ronda.current?.setPointerCapture(e.pointerId);
    }
    const ahora = performance.now();
    // La tarjeta de adelante acompaña al dedo
    const giroDelDedo = (e.clientX - a.x) / Math.max(medida.current.radio, 1);
    g.angulo += giroDelDedo;
    g.vel = 0.75 * (giroDelDedo / Math.max(ahora - a.t, 1)) * 1000 + 0.25 * g.vel;
    a.x = e.clientX;
    a.t = ahora;
  };

  const soltar = (e: React.PointerEvent) => {
    const g = giro.current;
    const a = g.arrastre;
    if (!a || a.id !== e.pointerId) return;
    // Si la mano se quedo quieta antes de soltar, no hay envion
    if (performance.now() - a.t > 90) g.vel = 0;
    g.vel = Math.max(-7, Math.min(7, g.vel));
    g.arrastre = null;
  };

  const tocar = (item: T, i: number) => {
    if (huboArrastre.current) return; // fue un arrastre, no un toque
    if (alTocar) {
      alTocar(item);
    } else {
      traer(i);
      setPausada(true);
    }
  };

  return (
    <div role="group" aria-roledescription="calesita" aria-label={titulo}>
      <div
        ref={ronda}
        // isolate: el orden de las tarjetas (z-index de 0 a 100) queda adentro
        // de la ronda. Sin eso competia con el resto de la pagina, y los logos
        // se dibujaban encima del universo abierto.
        className={`relative isolate cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing ${claseRonda}`}
        onPointerDown={apretar}
        onPointerMove={mover}
        onPointerUp={soltar}
        onPointerCancel={soltar}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") giro.current.encima = true;
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") giro.current.encima = false;
        }}
        onDragStart={(e) => e.preventDefault()}
      >
        {items.map((item, i) => (
          <button
            key={i}
            type="button"
            ref={(el) => {
              tarjetas.current[i] = el;
            }}
            aria-label={nombre(item)}
            onClick={() => tocar(item, i)}
            // Con teclado, la que recibe el foco pasa al frente y la ronda
            // espera ahi: si no, el foco se iria a una tarjeta que no se ve.
            onFocus={(e) => {
              if (!e.currentTarget.matches(":focus-visible")) return;
              giro.current.foco = true;
              traer(i);
            }}
            onBlur={() => {
              giro.current.foco = false;
            }}
            className={`group absolute left-1/2 top-0 block cursor-pointer outline-offset-4 focus-visible:outline focus-visible:outline-2 ${ancho}`}
            style={{ outlineColor: tinta }}
          >
            {cara(item)}
          </button>
        ))}
      </div>

      <div className={`mt-6 flex items-center gap-6 ${pie ? "justify-between" : "justify-center"}`}>
        {pie ? <div className="min-w-0">{pie(items[frente])}</div> : null}
        {quieta ? null : (
          <button
            type="button"
            onClick={() => setPausada((p) => !p)}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 font-mono text-[0.65rem] uppercase tracking-[0.18em] opacity-80 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ color: tinta, borderColor: "currentColor" }}
          >
            {pausada ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" aria-hidden="true" />}
            {pausada ? "Girar" : "Pausar"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Calesita;
