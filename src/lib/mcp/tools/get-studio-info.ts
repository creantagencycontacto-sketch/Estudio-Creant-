import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_studio_info",
  title: "Get studio info",
  description:
    "Returns general information about Creant Studio: what the studio does, location context, and how to get in touch.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      name: "Creant Studio",
      tagline: "Estudio creativo de branding, contenido y publicidad digital para pymes.",
      website: "https://estudiocreant.com",
      email: "Creantagency.contacto@gmail.com",
      whatsapp: "https://wa.link/yzax1m",
      instagram: "https://www.instagram.com/estudio.creant/",
      tiktok: "https://www.tiktok.com/@creantagency",
      description:
        "Combinamos branding, identidad visual, contenido UGC y campañas de performance (Meta & Google Ads) para que las pymes crezcan de forma medible.",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
