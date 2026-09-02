import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Al cambiar de página, el navegador conserva la posición del scroll: si venías
 * del pie de la home, entrabas a Marcas ya scrolleado a la mitad. Esto la lleva
 * arriba, salvo cuando el link apunta a una sección concreta (#contacto).
 */
const IrArriba = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const destino = document.getElementById(hash.slice(1));
      if (destino) {
        destino.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default IrArriba;
