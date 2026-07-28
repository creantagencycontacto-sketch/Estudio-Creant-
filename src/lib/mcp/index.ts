import { defineMcp } from "@lovable.dev/mcp-js";
import getStudioInfoTool from "./tools/get-studio-info";
import listServicesTool from "./tools/list-services";
import listTeamTool from "./tools/list-team";
import requestContactTool from "./tools/request-contact";

export default defineMcp({
  name: "creant-studio-mcp",
  title: "Creant Studio",
  version: "0.1.0",
  instructions:
    "Public MCP server for Creant Studio (estudiocreant.com). Use these tools to fetch information about the studio's services, team, and contact channels, or to prepare a contact message. All data is public and no authentication is required.",
  tools: [getStudioInfoTool, listServicesTool, listTeamTool, requestContactTool],
});
