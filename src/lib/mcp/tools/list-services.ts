import { defineTool } from "@lovable.dev/mcp-js";

const services = [
  {
    id: "strategic-design",
    name: "Diseño Estratégico",
    description:
      "Identidad visual, branding y diseño de interfaces pensadas para convertir y destacar en el mercado.",
  },
  {
    id: "growth-marketing",
    name: "Marketing de Crecimiento",
    description:
      "Estrategias integrales, gestión de redes y campañas enfocadas en el retorno de inversión y escalabilidad.",
  },
  {
    id: "performance-ads",
    name: "Performance Ads",
    description:
      "Campañas publicitarias optimizadas con datos reales para adquirir clientes calificados constantemente.",
  },
];

export default defineTool({
  name: "list_services",
  title: "List services",
  description: "List the services Creant Studio offers, with a short description of each.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(services, null, 2) }],
    structuredContent: { services },
  }),
});
