import { Link, useLocation, useNavigate } from "react-router-dom";
import { Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/lib/leads";
import { trackEvent } from "@/lib/tracking";
import logotipo from "@/assets/logotipo-creant.svg";

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
  const navegar = useNavigate();
  const trackWhatsapp = (origen: string) => () =>
    trackEvent("Contact", { content_name: `WhatsApp — ${origen}` });

  const irAContacto = () => {
    if (pathname === "/") document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
    else navegar("/#contacto");
  };

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

          <div className="hidden items-center gap-6 text-sm lg:flex">
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

          <Button onClick={irAContacto} className="h-11 rounded-none font-semibold">Hablemos</Button>
        </nav>
      </header>

      {children}

      <footer className="grano relative bg-tunel pb-10 pt-14 text-center text-background/55">
        {/* Con cuatro secciones la barra de arriba ya no entra en tablet, así que
            se esconde antes (lg) y el menú del pie aparece hasta ese mismo ancho.
            Si los dos cortaran en md, entre 768 y 1024 no habría menú en ningún lado. */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm lg:hidden">
          {SECCIONES.map((s) => (
            <Link key={s.a} to={s.a} className="px-2 py-3 transition-colors hover:text-primary">{s.texto}</Link>
          ))}
        </div>
        <div className="mb-4 flex items-center justify-center gap-6">
          <a href="https://www.instagram.com/estudio.creant/" target="_blank" rel="noopener noreferrer"
             aria-label="Instagram de Creant" className="-m-3 p-3 transition-colors hover:text-primary">
            <Instagram className="h-5 w-5" aria-hidden="true" />
          </a>
          <a href="https://www.tiktok.com/@creantagency?_r=1&_t=ZS-94WzOFtFavI" target="_blank" rel="noopener noreferrer"
             aria-label="TikTok de Creant" className="-m-3 flex min-h-[44px] items-center p-3 text-xs font-bold transition-colors hover:text-primary">
            TikTok
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={trackWhatsapp("pie")}
             aria-label="Escribinos por WhatsApp" className="-m-3 p-3 transition-colors hover:text-primary">
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em]">
          © {new Date().getFullYear()} Creant · Buenos Aires, Argentina
        </p>
      </footer>
    </div>
  );
};

export default Marco;
