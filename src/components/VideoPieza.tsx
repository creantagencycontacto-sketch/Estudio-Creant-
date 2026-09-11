import { useVideoEnVista } from "@/hooks/useVideoEnVista";

/**
 * Una pieza de video dentro de una grilla, con su epígrafe.
 *
 * Va muda y en loop: el visitante está recorriendo un portfolio, no viendo
 * televisión. Si una pieza le interesa de verdad, la va a ver en las redes
 * del cliente, no acá.
 */

type Props = {
  video: string;
  poster: string;
  pie: string;
  /** Un renglón corto con qué resolvía la pieza. Opcional. */
  nota?: string;
  /** Sobre qué fondo vive la pieza. Los colores del epígrafe cambian con él:
   *  el texto pensado para el túnel desaparece sobre la arena clara. */
  tono?: "oscuro" | "claro";
};

const VideoPieza = ({ video, poster, pie, nota, tono = "oscuro" }: Props) => {
  const { ref, cargar } = useVideoEnVista();
  const claro = tono === "claro";

  return (
    <figure>
      <div className={`overflow-hidden rounded-lg ${claro ? "bg-foreground/10" : "bg-black/30"}`}>
        <video
          ref={ref}
          className="block aspect-[9/16] w-full object-cover"
          src={cargar ? video : undefined}
          poster={poster}
          preload="none"
          muted
          loop
          playsInline
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>
      <figcaption className="mt-3">
        <p className={`font-mono text-[0.62rem] uppercase tracking-[0.14em] ${claro ? "text-accent" : "text-primary"}`}>{pie}</p>
        {nota ? <p className={`mt-1 text-sm leading-snug ${claro ? "text-muted-foreground" : "text-background/70"}`}>{nota}</p> : null}
      </figcaption>
    </figure>
  );
};

export default VideoPieza;
