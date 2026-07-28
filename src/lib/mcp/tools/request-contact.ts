import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "request_contact",
  title: "Request contact",
  description:
    "Prepare a prefilled contact message for Creant Studio. Returns the studio's email and a prefilled WhatsApp link the user can open to start the conversation. Does not send anything on its own.",
  inputSchema: {
    name: z.string().min(1).describe("Name of the person or company reaching out."),
    message: z.string().min(1).describe("Short description of the project or need."),
    email: z.string().email().optional().describe("Optional reply-to email."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: ({ name, message, email }) => {
    const waText =
      `Hola Creant! Soy ${name}.\n${message}` + (email ? `\nEmail: ${email}` : "");
    const whatsappUrl =
      "https://wa.me/?text=" + encodeURIComponent(waText);
    const mailtoUrl =
      `mailto:Creantagency.contacto@gmail.com` +
      `?subject=${encodeURIComponent(`Nuevo contacto - ${name}`)}` +
      `&body=${encodeURIComponent(message + (email ? `\n\nEmail: ${email}` : ""))}`;

    const result = {
      instructions:
        "Abrí uno de los links para iniciar la conversación con Creant Studio. Nada se envía automáticamente.",
      whatsappUrl,
      mailtoUrl,
      email: "Creantagency.contacto@gmail.com",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
