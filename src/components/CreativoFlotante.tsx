import { Instagram } from "lucide-react";

/**
 * El creativo real de una campaña, flotando al costado del caso.
 *
 * Se aloja el video acá y no se usa el embed de Instagram a propósito: el
 * embed carga un script de Meta —que estamos manteniendo afuera— tarda, y si
 * el cliente borra el posteo el portfolio queda con un hueco. Un mp4 propio
 * no depende de nadie.
 *
 * El video va mudo, en loop y sin controles: no es una pieza para mirar
 * sentado, es una prueba de que la campaña existió. Con `poster` la tarjeta
 * ya muestra algo antes de que cargue el video.
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
  const pieza = (
    <>
      <div className="relative overflow-hidden rounded-[1.6rem] border-4 border-tunel bg-tunel shadow-[0_24px_60px_-20px_rgba(36,24,17,0.55)]">
        <video
          className="block aspect-[9/16] w-full object-cover"
          src={video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          // El video es decorativo: el caso se entiende sin él, así que no
          // necesita descripción ni controles.
          aria-hidden="true"
          tabIndex={-1}
        />
        {enlace ? (
          <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-tunel/95 to-transparent px-3 pb-3 pt-10 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-background opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <Instagram className="h-3.5 w-3.5" aria-hidden="true" />
            Ver en Instagram
          </span>
        ) : null}
      </div>
      <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
        {enlace ? cuenta : "La pieza que ganó"}
      </p>
    </>
  );

  if (!enlace) return <div className="w-full max-w-[15rem]">{pieza}</div>;

  return (
    <a
      href={enlace}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full max-w-[15rem] transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      aria-label={`Ver la campaña en el Instagram de ${cuenta}`}
    >
      {pieza}
    </a>
  );
};

export default CreativoFlotante;
