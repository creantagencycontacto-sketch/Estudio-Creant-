import { Instagram } from "lucide-react";
import { useVideoEnVista } from "@/hooks/useVideoEnVista";

/**
 * El creativo real de una campaña, flotando dentro de la tarjeta del caso.
 *
 * Se aloja el video acá y no se usa el embed de Instagram a propósito: el
 * embed carga un script de Meta —que estamos manteniendo afuera de la vista
 * previa—, tarda, y si el cliente borra el posteo la tarjeta queda con un
 * hueco. Un mp4 propio no depende de nadie.
 *
 * Si la pieza es video va muda, en loop y sin controles: no es algo para
 * mirar sentado, es la prueba de que la campaña existió.
 *
 * La carga diferida y el arranque al entrar en pantalla viven en
 * useVideoEnVista, compartido con las piezas de la página de contenido.
 */

type Props = {
  /** La pieza. Casi todas son imagen: es lo que entrega el Administrador de
   *  Anuncios al bajar un creativo. Con `video` se usa el mp4 y la imagen
   *  pasa a ser su primer cuadro. */
  imagen: string;
  video?: string;
  /** Cuando está, el creativo se vuelve un link a las redes del cliente. */
  enlace?: string;
  /** Nombre de la cuenta, solo si hay enlace. */
  cuenta?: string;
};

const CreativoFlotante = ({ imagen, video, enlace, cuenta }: Props) => {
  const { ref, cargar } = useVideoEnVista();

  const pieza = (
    <>
      <div className="relative overflow-hidden rounded-[1.1rem] border-2 border-background/25 bg-black/40 shadow-[0_14px_34px_-12px_rgba(0,0,0,0.7)]">
        {video ? (
          <video
            ref={ref}
            className="block aspect-[9/16] w-full object-cover"
            src={cargar ? video : undefined}
            poster={imagen}
            preload="none"
            muted
            loop
            playsInline
            // Decorativo: el caso se entiende sin la pieza, así que no necesita
            // descripción propia ni entrar en el orden de tabulación.
            aria-hidden="true"
            tabIndex={-1}
          />
        ) : (
          /* Las piezas vienen en proporciones distintas —cuadradas, verticales,
             4:5— y se muestran como son. Forzarlas todas al 9:16 les recortaría
             el remate, que en un anuncio casi siempre está abajo. */
          <img src={imagen} alt="" className="block w-full" loading="lazy" aria-hidden="true" />
        )}
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
