import { Link, useLocation } from "react-router-dom";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/lib/leads";
import { trackEvent } from "@/lib/tracking";
import logotipo from "@/assets/logotipo-creant.svg";
import BandaBrasa from "@/components/BandaBrasa";

const SECCIONES = [
  { a: "/branding", texto: "Branding" },
  { a: "/meta-ads", texto: "Meta Ads" },
  { a: "/contenido", texto: "Contenido" },
  { a: "/como-trabajamos", texto: "Cómo trabajamos" },
];

/**
 * La barra y el pie que comparten todas las páginas.
 * Estaban repetidos en cada una: si cambiaba un link, había que tocarlo en
 * cuatro lugares y tarde o temprano uno quedaba viejo.
 */
const Marco = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const trackWhatsapp = (origen: string) => () =>
    trackEvent("Contact", { content_name: `WhatsApp — ${origen}` });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="relative z-[6]">
        <nav className="container mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6">
          {/* py-2 -my-2 agranda el area tocable sin mover el logo de lugar */}
          <Link to="/" aria-label="Creant, ir al inicio" className="-my-2 py-2">
            {/* El logotipo va como máscara y no como imagen. Una imagen se dibuja
                aislada de la página: el currentColor del SVG no encuentra color
                del que heredar y cae al negro. Como máscara, el color lo pone el
                fondo del elemento, así que se puede pintar desde el CSS. */}
            <span
              aria-hidden="true"
              className="block h-[40px] bg-primary md:h-[44px]"
              style={{
                aspectRatio: "779 / 449",
                WebkitMaskImage: `url(${logotipo})`,
                maskImage: `url(${logotipo})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
          </Link>

          <div className="hidden items-center gap-6 text-sm md:flex">
            {SECCIONES.map((s) => (
              <Link
                key={s.a}
                to={s.a}
                className={`border-b py-2 transition-colors hover:text-foreground ${
                  pathname === s.a
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:border-primary"
                }`}
              >
                {s.texto}
              </Link>
            ))}
          </div>

          {/* El boton de la barra es el camino corto: abre WhatsApp de una.
              El que baja al formulario es "Empezar proyecto", en la portada,
              donde el que llega todavia esta decidiendo. */}
          <Button asChild className="h-11 rounded-none font-semibold">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={trackWhatsapp("barra")}>
              Hablemos
            </a>
          </Button>
        </nav>
      </header>

      {children}

      {/* El padding de abajo acompaña al resplandor: tiene que ser MAYOR que
          donde termina el naranja (150px), para que nada quede que leerse
          encima. Si se sube uno hay que subir el otro. */}
      <footer className="brasa grano relative overflow-hidden bg-tunel pb-0 pt-6 text-center text-background/55">
        <div className="mb-2 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm md:hidden">
          {SECCIONES.map((s) => (
            <Link key={s.a} to={s.a} className="px-2 py-3 transition-colors hover:text-primary">{s.texto}</Link>
          ))}
        </div>
        <BandaBrasa />

        {/* Redes y firma en un solo renglón, adentro de la banda. El marrón
            oscuro es el único color que se lee sobre el naranja pleno. */}
        {/* Dos contenedores anidados y no uno: el de afuera empuja la fila al pie
            de la banda —arriba están los granos rojos y sobre ellos el marrón no
            llega al contraste mínimo— y el de adentro alinea los iconos con el
            texto. Con uno solo hay que elegir: centrado deja la fila en el medio
            de la banda, y alineado abajo las cajas táctiles de 44px de los
            iconos les levantan el dibujo y queda desparejo. */}
        <div className="relative z-[2] mt-4 flex h-[96px] items-end justify-center pb-3 md:mt-8 md:h-[124px] md:pb-5">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 text-tunel md:gap-x-7">
          <a href="https://www.instagram.com/estudio.creant/" target="_blank" rel="noopener noreferrer"
             aria-label="Instagram de Creant" className="-my-2 flex h-11 w-11 items-center justify-center transition-opacity hover:opacity-70">
            <Instagram className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
          </a>
          <a href="https://www.tiktok.com/@creantagency?_r=1&_t=ZS-94WzOFtFavI" target="_blank" rel="noopener noreferrer"
             aria-label="TikTok de Creant" className="-my-2 flex h-11 items-center px-1 text-xs font-bold transition-opacity hover:opacity-70">
            TikTok
          </a>
            {/* En celular se acorta: con "Argentina" la línea pide 397px y hay
                343, así que se parte en dos renglones. Achicar la tipografía
                hasta que entre la deja en ocho píxeles y medio, ilegible. */}
            <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.12em] md:text-[0.7rem]">
              © {new Date().getFullYear()} Creant · Buenos Aires<span className="hidden sm:inline">, Argentina</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Marco;
