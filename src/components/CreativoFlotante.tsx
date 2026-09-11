import { useEffect, useRef, useState } from "react";
import { Instagram } from "lucide-react";

/**
 * El creativo real de una campaña, flotando dentro de la tarjeta del caso.
 *
 * Se aloja el video acá y no se usa el embed de Instagram a propósito: el
 * embed carga un script de Meta —que estamos manteniendo afuera de la vista
 * previa—, tarda, y si el cliente borra el posteo la tarjeta queda con un
 * hueco. Un mp4 propio no depende de nadie.
 *
 * El video va mudo, en loop y sin controles: no es una pieza para mirar
 * sentado, es la prueba de que la campaña existió.
 *
 * Nada se descarga hasta que la tarjeta se acerca a la pantalla, y solo
 * reproduce el que está a la vista. Con ocho casos en una página, dejarlos
 * a todos en autoplay serían varios megas de golpe y ocho videos moviéndose
 * al mismo tiempo, que marea y le saca el foco al número.
 */

type Props = {
  video: string;
  poster: string;
  /** Cuando está, el creativo se vuelve un link a las redes del cliente. */
  enlace?: string;
  /** Nombre de la cuenta, solo si hay enlace. */
  cuenta?: string;
};

const CreativoFlotante = ({ video, poster, enlace, cuenta }: Props) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [cargar, setCargar] = useState(false);
  const [enVista, setEnVista] = useState(false);

  // Mirar y reproducir van separados a propósito. Juntos no funciona: pedir
  // play() en el mismo momento en que se decide cargar el archivo falla,
  // porque el src todavía no está puesto —React no volvió a dibujar— y el
  // video no arrancaba hasta que uno se iba de la tarjeta y volvía.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        setEnVista(e.isIntersecting);
        if (e.isIntersecting) setCargar(true);
      },
      { rootMargin: "200px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !cargar) return;

    // Quien pidió menos movimiento en su sistema se queda con la imagen fija.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (enVista) {
      // play() devuelve una promesa que el navegador rechaza si la pestaña
      // está en segundo plano. Sin el catch queda un error suelto en consola
      // cada vez que alguien cambia de pestaña.
      void el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [cargar, enVista]);

  const pieza = (
    <>
      <div className="relative overflow-hidden rounded-[1.1rem] border-2 border-background/25 bg-black/40 shadow-[0_14px_34px_-12px_rgba(0,0,0,0.7)]">
        <video
          ref={ref}
          className="block aspect-[9/16] w-full object-cover"
          src={cargar ? video : undefined}
          poster={poster}
          preload="none"
          muted
          loop
          playsInline
          // Decorativo: el caso se entiende sin el video, así que no necesita
          // descripción propia ni entrar en el orden de tabulación.
          aria-hidden="true"
          tabIndex={-1}
        />
        {enlace ? (
          <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-gradient-to-t from-black/90 to-transparent px-2 pb-2 pt-8 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-background opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <Instagram className="h-3 w-3" aria-hidden="true" />
            Ver en Instagram
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-center font-mono text-[0.55rem] uppercase tracking-[0.12em] text-background/60">
        {enlace ? cuenta : "La pieza que ganó"}
      </p>
    </>
  );

  if (!enlace) return <div className="w-[7.5rem] shrink-0 md:w-[8.5rem]">{pieza}</div>;

  return (
    <a
      href={enlace}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-[7.5rem] shrink-0 transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:w-[8.5rem]"
      aria-label={`Ver la campaña en el Instagram de ${cuenta}`}
    >
      {pieza}
    </a>
  );
};

export default CreativoFlotante;
