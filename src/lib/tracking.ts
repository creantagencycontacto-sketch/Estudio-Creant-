/**
 * TRACKING DE CREANT
 * ==================
 *
 * ¿Dónde está el píxel de Meta?
 * -----------------------------
 * El código del píxel vive en `index.html` (arriba de todo, en el <head>).
 * Ese es el único lugar donde está el ID `2259284821506211`, y es el que se
 * encarga de contar las visitas (el evento PageView).
 *
 * Este archivo NO vuelve a cargar el píxel — solo lo usa. Si cargáramos el
 * píxel dos veces, Meta contaría cada visita doble y todas las métricas de
 * las campañas quedarían infladas.
 *
 * ¿Entonces para qué sirve este archivo?
 * --------------------------------------
 * Para las dos cosas que el píxel solo no hace:
 *
 *   1. Mandar los eventos que importan de verdad:
 *        Lead    → alguien completó y envió el formulario
 *        Contact → alguien hizo click en un botón de WhatsApp
 *      Con estos podés optimizar campañas por conversión (y no por clicks)
 *      y armar públicos de retargeting.
 *
 *   2. Guardar de dónde vino cada visita (utm_source, utm_campaign, fbclid),
 *      para que cuando entre una consulta sepas qué anuncio la trajo.
 */

/** Los eventos que le mandamos a Meta desde la web. */
type MetaEvent = "Lead" | "Contact";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Datos de dónde vino la persona, para guardarlos junto al lead. */
export type TrafficSource = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  fbclid: string | null;
  referrer: string | null;
  landing_page: string | null;
};

const SOURCE_STORAGE_KEY = "creant_traffic_source";

/**
 * Lee los parámetros de la URL la primera vez que la persona entra y los
 * guarda en la sesión del navegador.
 *
 * ¿Por qué guardarlos? Porque si alguien entra desde un anuncio y recién
 * escribe diez minutos después, la URL ya puede haber perdido los parámetros.
 * Así el dato del origen sigue estando cuando manda el formulario.
 */
export function captureTrafficSource(): void {
  try {
    if (sessionStorage.getItem(SOURCE_STORAGE_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const source: TrafficSource = {
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      utm_content: params.get("utm_content"),
      fbclid: params.get("fbclid"),
      referrer: document.referrer || null,
      landing_page: window.location.pathname + window.location.search,
    };

    sessionStorage.setItem(SOURCE_STORAGE_KEY, JSON.stringify(source));
  } catch {
    // Si el navegador tiene el almacenamiento bloqueado, seguimos sin drama.
  }
}

/** Devuelve el origen guardado, para adjuntarlo al lead. */
export function getTrafficSource(): TrafficSource | null {
  try {
    const raw = sessionStorage.getItem(SOURCE_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TrafficSource) : null;
  } catch {
    return null;
  }
}

/** Se llama una vez, al abrir la web. */
export function initTracking(): void {
  captureTrafficSource();
}

/**
 * Manda un evento a Meta.
 *
 * Si el píxel no llegó a cargar (bloqueador de anuncios, sin internet), esto
 * simplemente no hace nada. Nunca rompe la web ni corta el formulario.
 */
export function trackEvent(event: MetaEvent, params?: Record<string, unknown>): void {
  if (typeof window.fbq !== "function") return;
  window.fbq("track", event, params);
}
