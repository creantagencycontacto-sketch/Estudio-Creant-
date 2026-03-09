import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, PenTool, TrendingUp, Mail, Instagram, MessageCircle } from "lucide-react";
import logoCreant from "@/assets/logo-creant.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <img src={logoCreant} alt="Creant Agency" className="h-14 w-auto" />
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/creant.agency" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://wa.link/yzax1m" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle className="h-5 w-5" />
            </a>
            <Button variant="outline" className="hidden md:flex rounded-full border-primary/30 hover:bg-primary/10 text-primary">
              Hablemos
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 md:pt-52 md:pb-32 px-6">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            DISEÑO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              QUE VENDE.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
            Unificamos diseño gráfico y marketing de crecimiento para escalar tu negocio. Comunicación efectiva, resultados reales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="rounded-full text-lg h-14 px-8 font-bold">
              <a href="https://wa.link/yzax1m" target="_blank" rel="noopener noreferrer">
                Empezar proyecto <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="secondary" className="rounded-full text-lg h-14 px-8 font-bold" onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}>
              Ver servicios
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-24 bg-secondary/30 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 md:mb-24">
            <blockquote className="border-l-4 border-primary pl-6 md:pl-8 mb-12 max-w-3xl">
              <p className="text-lg md:text-xl italic text-muted-foreground leading-relaxed">
                «El contenido precede al diseño. Diseño en ausencia de contenido no es diseño, es decoración.»
              </p>
              <cite className="text-sm text-muted-foreground/60 mt-2 block not-italic">— Jeffrey Zeldman</cite>
            </blockquote>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">NUESTRO ENFOQUE</h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Por eso combinamos estrategia y contenido con creatividad visual para hacer crecer Pymes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-10 rounded-3xl border border-border hover:border-primary/50 transition-colors group">
              <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors">
                <PenTool className="h-8 w-8 text-primary group-hover:text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Diseño Estratégico</h3>
              <p className="text-muted-foreground leading-relaxed">
                Identidad visual, branding y diseño de interfaces pensadas para convertir y destacar en el mercado.
              </p>
            </div>

            <div className="bg-background p-10 rounded-3xl border border-border hover:border-accent/50 transition-colors group">
              <div className="h-16 w-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-accent transition-colors">
                <TrendingUp className="h-8 w-8 text-accent group-hover:text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Marketing de Crecimiento</h3>
              <p className="text-muted-foreground leading-relaxed">
                Estrategias integrales, gestión de redes y campañas enfocadas en el retorno de inversión y escalabilidad.
              </p>
            </div>

            <div className="bg-background p-10 rounded-3xl border border-border hover:border-primary/50 transition-colors group">
              <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors">
                <BarChart3 className="h-8 w-8 text-primary group-hover:text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Performance Ads</h3>
              <p className="text-muted-foreground leading-relaxed">
                Campañas publicitarias optimizadas con datos reales para adquirir clientes calificados constantemente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">
            ¿LISTO PARA ESCALAR?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Dejanos tus datos y nos pondremos en contacto para analizar cómo podemos ayudar a tu empresa a crecer.
          </p>
          
          <div className="max-w-md mx-auto space-y-4">
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Tu nombre" 
                className="w-full h-14 bg-secondary/50 border border-border rounded-xl px-6 outline-none focus:border-primary transition-colors"
              />
              <input 
                type="email" 
                placeholder="Tu email" 
                className="w-full h-14 bg-secondary/50 border border-border rounded-xl px-6 outline-none focus:border-primary transition-colors"
              />
              <textarea 
                placeholder="Contanos sobre tu proyecto" 
                className="w-full h-32 bg-secondary/50 border border-border rounded-xl px-6 py-4 outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
            <Button size="lg" className="w-full h-14 rounded-xl text-lg font-bold mt-4">
              Enviar Mensaje <Mail className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Contact info */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-muted-foreground text-sm">
            <a href="mailto:Creantagency.contacto@gmail.com" className="hover:text-primary transition-colors flex items-center gap-2">
              <Mail className="h-4 w-4" /> Creantagency.contacto@gmail.com
            </a>
            <a href="https://wa.link/yzax1m" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border text-center text-muted-foreground">
        <div className="flex items-center justify-center gap-6 mb-4">
          <a href="https://www.instagram.com/creant.agency" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="https://www.tiktok.com/@creantagency?_r=1&_t=ZS-94WzOFtFavI" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-xs font-bold">
            TikTok
          </a>
          <a href="https://wa.link/yzax1m" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <MessageCircle className="h-5 w-5" />
          </a>
        </div>
        <p>© {new Date().getFullYear()} Creant Agency. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Index;
