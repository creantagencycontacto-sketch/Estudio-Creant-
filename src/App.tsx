import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Marcas from "./pages/Marcas";
import Pauta from "./pages/Pauta";
import ComoTrabajamos from "./pages/ComoTrabajamos";
import NotFound from "./pages/NotFound";
import IrArriba from "./components/IrArriba";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <IrArriba />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/marcas" element={<Marcas />} />
          <Route path="/pauta" element={<Pauta />} />
          <Route path="/como-trabajamos" element={<ComoTrabajamos />} />
          {/* Las rutas nuevas van arriba de esta, que atrapa todo lo demás. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
