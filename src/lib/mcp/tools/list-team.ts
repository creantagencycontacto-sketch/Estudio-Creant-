import { defineTool } from "@lovable.dev/mcp-js";

const team = [
  {
    name: "Milagros",
    role: "Co-Founder & Creative Director",
    experienceYears: 6,
    bio: "Especialista en branding, identidad visual, comunicación, edición de video y contenido UGC.",
    skills: ["Branding", "Identidad Visual", "Video / UGC", "Comunicación"],
  },
  {
    name: "Juan",
    role: "Co-Founder & Growth Strategist",
    experienceYears: 5,
    bio: "Ads y Social Media Manager. Especialista en performance, email marketing y estrategias de ventas.",
    skills: ["Meta & Google Ads", "Social Media", "Email Marketing", "Ventas"],
  },
];

export default defineTool({
  name: "list_team",
  title: "List team",
  description: "List the founders of Creant Studio with their role, experience, and skills.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(team, null, 2) }],
    structuredContent: { team },
  }),
});
