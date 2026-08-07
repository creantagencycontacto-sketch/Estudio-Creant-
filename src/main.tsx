import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { initTracking } from "./lib/tracking";
import "./index.css";

document.documentElement.classList.add("dark");

// Guarda de qué campaña / anuncio vino la visita, apenas se abre la web.
initTracking();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
