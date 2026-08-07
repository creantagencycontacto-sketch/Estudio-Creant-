import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { getTrafficSource } from "./tracking";

/** Número de WhatsApp de Creant, en un solo lugar para no repetirlo. */
export const WHATSAPP_NUMBER = "5492216024898";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/**
 * Reglas de validación del formulario.
 * Los mensajes son los que ve la persona, así que están escritos en tu tono.
 */
export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Contanos cómo te llamás")
    .max(80, "El nombre es un poco largo"),
  email: z
    .string()
    .trim()
    .min(1, "Necesitamos tu email para responderte")
    .email("Revisá el email, parece que le falta algo")
    .max(120, "El email es demasiado largo"),
  message: z
    .string()
    .trim()
    .min(10, "Contanos un poquito más sobre tu proyecto")
    .max(2000, "Se pasó de largo, resumilo un toque"),
});

export type LeadInput = z.infer<typeof leadSchema>;

/**
 * Guarda el lead en Supabase.
 *
 * Va junto con el origen de la visita (de qué campaña vino), así después
 * podés ver qué anuncio te trae consultas de verdad y no solo clicks.
 *
 * Si falla, no cortamos el flujo: la persona igual llega a WhatsApp y el
 * contacto no se pierde. Solo lo dejamos anotado en la consola.
 */
export async function saveLead(lead: LeadInput): Promise<void> {
  const source = getTrafficSource();

  const { error } = await supabase.from("leads").insert({
    name: lead.name,
    email: lead.email,
    message: lead.message,
    utm_source: source?.utm_source ?? null,
    utm_medium: source?.utm_medium ?? null,
    utm_campaign: source?.utm_campaign ?? null,
    utm_content: source?.utm_content ?? null,
    fbclid: source?.fbclid ?? null,
    referrer: source?.referrer ?? null,
    landing_page: source?.landing_page ?? null,
  });

  if (error) {
    console.error("[Creant] No se pudo guardar el lead en Supabase:", error.message);
  }
}

/** Arma el texto que se abre precargado en WhatsApp. */
export function buildWhatsappMessage(lead: LeadInput): string {
  return [
    `¡Hola Creant! 👋`,
    ``,
    `Soy ${lead.name}.`,
    `Mi email: ${lead.email}`,
    ``,
    `Sobre mi proyecto:`,
    lead.message,
  ].join("\n");
}

/** Link de WhatsApp con el mensaje del formulario ya escrito. */
export function buildWhatsappLink(lead: LeadInput): string {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(buildWhatsappMessage(lead))}`;
}
