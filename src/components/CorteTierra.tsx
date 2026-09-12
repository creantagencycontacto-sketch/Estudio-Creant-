import { useId } from "react";

/**
 * El corte de tierra entre una cámara y la siguiente.
 *
 * Son tres capas en vez de una: las dos de atrás van difuminadas y arrancan
 * transparentes, y la del frente es plana y nítida. Esa diferencia de foco es
 * lo que da profundidad — el ojo lee lo borroso como lejos.
 *
 * Cada capa lleva su propio grano, más marcado en la de atrás: el desenfoque
 * solo se ve digital, el grano es lo que lo vuelve fotográfico. Va como filtro
 * adentro del SVG y no como una capa encima, así queda recortado a la forma y
 * no mancha la sección de arriba.
 *
 * Los degradados son lo que hace que cada capa APAREZCA en vez de empezar. Sin
 * ellos, por más desenfoque que tengan, arriba queda un borde y se leen como
 * bandas de color pegadas.
 *
 * Las curvas arrancan en -60 y terminan en 1500, fuera del encuadre: si
 * empezaran justo en el borde, el desenfoque dejaría los costados
 * transparentes y se vería el corte.
 */

/** Dos juegos de curvas para que las tres divisiones del sitio no sean la
 *  misma onda repetida. */
const CURVAS = [
  {
    lejos: "M-60,46 C120,18 260,60 440,42 C620,24 760,68 940,48 C1120,28 1280,56 1500,36 L1500,180 L-60,180 Z",
    medio: "M-60,84 C140,54 300,96 480,76 C660,56 820,102 1000,82 C1180,62 1320,88 1500,72 L1500,180 L-60,180 Z",
    frente: "M-60,114 C90,90 150,136 246,118 C348,100 392,142 500,126 C600,112 660,148 762,130 C870,112 918,150 1030,132 C1130,116 1190,90 1290,112 C1352,126 1400,104 1500,112 L1500,180 L-60,180 Z",
  },
  {
    lejos: "M-60,38 C160,62 300,22 500,46 C700,70 840,26 1040,44 C1200,58 1340,30 1500,48 L1500,180 L-60,180 Z",
    medio: "M-60,78 C180,100 340,62 520,84 C700,106 860,66 1040,86 C1200,104 1350,74 1500,88 L1500,180 L-60,180 Z",
    frente: "M-60,120 C120,142 240,102 400,122 C560,142 700,104 860,124 C1020,144 1180,110 1320,126 C1400,134 1450,118 1500,124 L1500,180 L-60,180 Z",
  },
];

type Props = {
  /** Los dos tonos que aparecen entre una sección y la otra, de arriba abajo. */
  intermedios: [string, string];
  /** El color de la sección que viene abajo. */
  fondo: string;
  /** Marca el corte que vuelve a la superficie.
   *
   *  Bajando, la capa del frente va plana y con borde nítido a propósito: ese
   *  borde ES la línea del suelo y por eso se lee bien. Subiendo no representa
   *  nada y queda como una raya cruzando la pantalla, así que también se
   *  desvanece. */
  sube?: boolean;
  variante?: 0 | 1;
  className?: string;
};

const CorteTierra = ({ intermedios, fondo, sube = false, variante = 0, className = "" }: Props) => {
  // Cada corte necesita ids propios: con tres en la misma página, los filtros
  // y degradados se pisarían entre sí y todos usarían los del primero.
  const id = useId().replace(/:/g, "");
  const c = CURVAS[variante];

  return (
    <svg
      className={`relative z-[3] -mb-px block h-[78px] w-full md:h-[150px] ${className}`}
      viewBox="0 0 1440 150"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {intermedios.map((color, i) => (
          <linearGradient key={i} id={`${id}-funde-${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={color} stopOpacity="0" />
            <stop offset={i === 0 ? "0.45" : "0.4"} stopColor={color} stopOpacity={i === 0 ? "0.8" : "0.9"} />
            <stop offset="1" stopColor={color} stopOpacity="1" />
          </linearGradient>
        ))}

        <filter id={`${id}-lejos`} x="-8%" y="-30%" width="116%" height="170%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="suave" />
          <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="4" seed="7" result="ruido" />
          <feColorMatrix in="ruido" type="saturate" values="0" result="gris" />
          <feComponentTransfer in="gris" result="grano"><feFuncA type="linear" slope="0.75" /></feComponentTransfer>
          <feComposite in="grano" in2="suave" operator="in" result="recortado" />
          <feBlend in="suave" in2="recortado" mode="multiply" />
        </filter>
        <filter id={`${id}-medio`} x="-6%" y="-25%" width="112%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.4" result="suave" />
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" seed="19" result="ruido" />
          <feColorMatrix in="ruido" type="saturate" values="0" result="gris" />
          <feComponentTransfer in="gris" result="grano"><feFuncA type="linear" slope="0.5" /></feComponentTransfer>
          <feComposite in="grano" in2="suave" operator="in" result="recortado" />
          <feBlend in="suave" in2="recortado" mode="multiply" />
        </filter>
        {sube ? (
          <linearGradient id={`${id}-funde-frente`} x1="0" y1="0" x2="0" y2="1">
            {/* Tiene que llegar al 100% bastante antes del final. La curva se
                extiende por debajo del encuadre, así que si el degradado
                recién cierra en su último punto, al borde visible le falta un
                cinco por ciento y por ahí se filtra el color de arriba: se ve
                un escalón finito justo donde empieza la sección. */}
            <stop offset="0" stopColor={fondo} stopOpacity="0" />
            <stop offset="0.35" stopColor={fondo} stopOpacity="0.85" />
            <stop offset="0.55" stopColor={fondo} stopOpacity="1" />
            <stop offset="1" stopColor={fondo} stopOpacity="1" />
          </linearGradient>
        ) : null}

        <filter id={`${id}-frente`} x="-4%" y="-20%" width="108%" height="150%">
          {sube ? <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="suave" /> : null}
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="3" result="ruido" />
          <feColorMatrix in="ruido" type="saturate" values="0" result="gris" />
          <feComponentTransfer in="gris" result="grano"><feFuncA type="linear" slope="0.3" /></feComponentTransfer>
          <feComposite in="grano" in2={sube ? "suave" : "SourceGraphic"} operator="in" result="recortado" />
          <feBlend in={sube ? "suave" : "SourceGraphic"} in2="recortado" mode="multiply" />
        </filter>
      </defs>

      <path filter={`url(#${id}-lejos)`} fill={`url(#${id}-funde-0)`} d={c.lejos} />
      <path filter={`url(#${id}-medio)`} fill={`url(#${id}-funde-1)`} d={c.medio} />
      <path filter={`url(#${id}-frente)`} fill={sube ? `url(#${id}-funde-frente)` : fondo} d={c.frente} />
    </svg>
  );
};

export default CorteTierra;
