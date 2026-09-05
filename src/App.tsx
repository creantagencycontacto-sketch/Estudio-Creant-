import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Marcas from "./pages/Marcas";
import Pauta from "./pages/Pauta";
import Contenido from "./pages/Contenido";
import ComoTrabajamos from "./pages/ComoTrabajamos";
import DemoCreativo from "./pages/DemoCreativo";  // TEMPORAL: se borra al elegir
import NotFound from "./pages/NotFound";
import IrArriba from "./components/IrArriba";

const queryClient = new QueryClient();

/**
 * En el servidor van rutas normales (/marcas). Pero cuando el sitio se abre
 * con doble click desde una carpeta, el navegador no deja cambiar la URL:
 * ahí usamos rutas con # para que la vista previa funcione igual.
 */
const esVistaPrevia =
  typeof window !== "undefined" &&
  (window.location.protocol === "file:" || window.location.pathname.startsWith("/preview"));

const Router = esVistaPrevia ? HashRouter : BrowserRouter;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <IrArriba />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/branding" element={<Marcas />} />
          <Route path="/meta-ads" element={<Pauta />} />
          <Route path="/contenido" element={<Contenido />} />
          <Route path="/como-trabajamos" element={<ComoTrabajamos />} />
          {/* TEMPORAL: comparacion de las dos formas de mostrar el creativo */}
          <Route path="/demo-creativo" element={<DemoCreativo />} />
          {/* Las rutas nuevas van arriba de esta, que atrapa todo lo demás. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
