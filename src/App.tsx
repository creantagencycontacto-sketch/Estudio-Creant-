import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Marcas from "./pages/Marcas";
import Pauta from "./pages/Pauta";
import ComoTrabajamos from "./pages/ComoTrabajamos";
import NotFound from "./pages/NotFound";
import IrArriba from "./components/IrArriba";

const queryClient = new QueryClient();

/**
 * En el servidor van rutas normales (/marcas). Pero cuando el sitio se abre
 * con doble click desde una carpeta, el navegador no deja cambiar la URL:
 * ahí usamos rutas con # para que la vista previa funcione igual.
 */
const Router = typeof window !== "undefined" && window.location.protocol === "file:"
  ? HashRouter
  : BrowserRouter;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <IrArriba />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/marcas" element={<Marcas />} />
          <Route path="/pauta" element={<Pauta />} />
          <Route path="/como-trabajamos" element={<ComoTrabajamos />} />
          {/* Las rutas nuevas van arriba de esta, que atrapa todo lo demás. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
