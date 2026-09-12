import { useId } from "react";

/**
 * La banda de tierra con sol donde termina el sitio.
 *
 * Naranja pleno y no degradado: es lo único que permite poner texto encima y
 * que se lea. Sobre el naranja hecho de grano el fondo real es naranja
 * salpicado sobre marrón, y ahí ningún color de texto llega al mínimo — el
 * crema se queda en 3,26 aun a opacidad plena y el marrón oscuro en 4,23.
 * Sobre naranja pleno, el marrón da 5,39 y pasa cómodo.
 *
 * El borde de arriba es una onda y no una línea recta, para que siga hablando
 * el mismo idioma que los cortes entre cámaras.
 *
 * Encima van granos rojos, densos contra la onda y apagándose hacia abajo.
 * Son la brasa: le sacan al naranja la lisura de color plano y quedan lejos
 * del texto, que descansa en la parte limpia de la banda.
 */

const BandaBrasa = () => {
  // Ids propios: el pie aparece en todas las páginas y no debe pisarse con
  // los filtros de los cortes de tierra.
  const id = useId().replace(/:/g, "");
  const onda =
    "M0,44 C170,16 330,60 520,40 C710,20 880,64 1080,44 C1240,28 1350,52 1440,38 L1440,130 L0,130 Z";

  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] block h-[96px] w-full md:h-[124px]"
      viewBox="0 0 1440 130"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {/* Los granos rojos van ARRIBA, pegados a la onda, y se apagan antes
            de llegar al texto. Donde hay texto el rojo tolera un 20% como
            máximo —más que eso y el contraste cae por debajo del mínimo— y a
            esa altura no se ve. Corridos hacia la onda pueden ser fuertes y
            además quedan donde tienen sentido: la brasa al borde de la tierra. */}
        <linearGradient id={`${id}-rojo`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="hsl(var(--accent))" stopOpacity="0.62" />
          <stop offset="0.34" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
          <stop offset="0.62" stopColor="hsl(var(--accent))" stopOpacity="0" />
        </linearGradient>

        {/* El ruido entra como transparencia y no como color: se toma su canal
            rojo y se usa de alfa, así lo que queda del rojo son granos sueltos
            y no una capa pareja. El -0.28 sube el umbral, o sea deja pasar
            menos granos. */}
        <filter id={`${id}-grano`} x="-2%" y="-10%" width="104%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="2" seed="11" result="ruido" />
          <feColorMatrix
            in="ruido"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    1 0 0 0 -0.28"
            result="alfa"
          />
          <feComposite in="SourceGraphic" in2="alfa" operator="in" />
        </filter>
      </defs>

      <path d={onda} fill="hsl(31 74% 48%)" />
      <path d={onda} fill={`url(#${id}-rojo)`} filter={`url(#${id}-grano)`} />
    </svg>
  );
};

export default BandaBrasa;
