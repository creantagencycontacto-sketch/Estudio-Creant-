import { useEffect, useRef, useState } from "react";

/**
 * Un video que no se descarga hasta acercarse a la pantalla y solo se
 * reproduce mientras está a la vista.
 *
 * Con varias piezas en una misma página, dejarlas todas en autoplay serían
 * varios megas de golpe y un montón de videos moviéndose al mismo tiempo.
 *
 * Mirar y reproducir van separados a propósito. Juntos no funciona: pedir
 * play() en el mismo momento en que se decide cargar el archivo falla, porque
 * el src todavía no está puesto —React no volvió a dibujar— y el video no
 * arranca hasta que uno se va y vuelve.
 */
export const useVideoEnVista = () => {
  const ref = useRef<HTMLVideoElement>(null);
  const [cargar, setCargar] = useState(false);
  const [enVista, setEnVista] = useState(false);

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

  return { ref, cargar };
};
