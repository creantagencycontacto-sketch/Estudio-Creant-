import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, PenTool, TrendingUp, Mail, Instagram, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import logoCreant from "@/assets/logo-creant.png";
import milagrosPhoto from "@/assets/milagros.png";
import juanPhoto from "@/assets/juan-new.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
  }),
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <img src={logoCreant} alt="Creant Agency" className="h-14 w-auto" />
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/estudio.creant/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://wa.link/yzax1m" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle className="h-5 w-5" />
            </a>
            <Button variant="outline" className="hidden md:flex rounded-full border-primary/30 hover:bg-primary/10 text-primary" onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}>
              Hablemos
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-52 md:pb-32 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0} className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6 md:mb-8">
            LLEGASTE AL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              HORMIGUERO.
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1} className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
            Somos el estudio creativo que tu pyme necesita: branding, contenido y publicidad digital trabajando juntos para que tu marca venda más.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2} className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="rounded-full text-lg h-14 px-8 font-bold">
              <a href="https://wa.link/yzax1m" target="_blank" rel="noopener noreferrer">
                Empezar proyecto <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="secondary" className="rounded-full text-lg h-14 px-8 font-bold" onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}>
              Ver servicios
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-24 bg-secondary/30 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={0} className="mb-16 md:mb-24">
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
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={0} className="bg-background p-10 rounded-3xl border border-border hover:border-primary/50 transition-colors group">
              <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors">
                <PenTool className="h-8 w-8 text-primary group-hover:text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Diseño Estratégico</h3>
              <p className="text-muted-foreground leading-relaxed">
                Identidad visual, branding y diseño de interfaces pensadas para convertir y destacar en el mercado.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={1} className="bg-background p-10 rounded-3xl border border-border hover:border-accent/50 transition-colors group">
              <div className="h-16 w-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-accent transition-colors">
                <TrendingUp className="h-8 w-8 text-accent group-hover:text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Marketing de Crecimiento</h3>
              <p className="text-muted-foreground leading-relaxed">
                Estrategias integrales, gestión de redes y campañas enfocadas en el retorno de inversión y escalabilidad.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={2} className="bg-background p-10 rounded-3xl border border-border hover:border-primary/50 transition-colors group">
              <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors">
                <BarChart3 className="h-8 w-8 text-primary group-hover:text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Performance Ads</h3>
              <p className="text-muted-foreground leading-relaxed">
                Campañas publicitarias optimizadas con datos reales para adquirir clientes calificados constantemente.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Equipo Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={0} className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter mb-6">EL EQUIPO DETRÁS DE LA ESTRATEGIA</motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={1} className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mb-16 leading-relaxed">
            En Creant Studio, no solo creamos contenido; construimos puentes digitales. Combinamos la potencia del branding y la identidad visual de Milagros con la precisión estratégica en pauta y conversión de Juan. Con más de una década de experiencia sumada, nos enfocamos en que tu marca no solo se vea increíble, sino que también venda y conecte de forma auténtica.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Milagros */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={0} className="bg-secondary/30 rounded-3xl border border-border p-8 flex flex-col items-center text-center group hover:border-primary/50 transition-colors">
              <div className="h-36 w-36 rounded-full border-4 border-primary/30 mb-6 overflow-hidden group-hover:border-primary transition-colors">
                <img src={milagrosPhoto} alt="Milagros - Co-Founder & Creative Director" className="h-full w-full object-cover object-center" />
              </div>
              <h3 className="text-2xl font-bold mb-1">Milagros</h3>
              <p className="text-sm text-primary font-semibold mb-4">Co-Founder & Creative Director</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                6 años de experiencia en Branding y Comunicación. Especialista en unir marca e identidad digital con una visión creativa única. Manejo de edición de video y creación de contenido UGC que conecta y convierte.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="text-xs">Branding</Badge>
                <Badge variant="secondary" className="text-xs">Identidad Visual</Badge>
                <Badge variant="secondary" className="text-xs">Video / UGC</Badge>
                <Badge variant="secondary" className="text-xs">Comunicación</Badge>
              </div>
            </motion.div>

            {/* Juan */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={1} className="bg-secondary/30 rounded-3xl border border-border p-8 flex flex-col items-center text-center group hover:border-accent/50 transition-colors">
              <div className="h-36 w-36 rounded-full border-4 border-accent/30 mb-6 overflow-hidden group-hover:border-accent transition-colors">
                <img src={juanPhoto} alt="Juan - Co-Founder & Growth Strategist" className="h-full w-full object-cover object-center scale-110" />
              </div>
              <h3 className="text-2xl font-bold mb-1">Juan</h3>
              <p className="text-sm text-accent font-semibold mb-4">Co-Founder & Growth Strategist</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                5 años como Ads y Social Media Manager. Especialista en campañas de performance, email marketing y estrategias de ventas orientadas a resultados medibles y escalables.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="text-xs">Meta & Google Ads</Badge>
                <Badge variant="secondary" className="text-xs">Social Media</Badge>
                <Badge variant="secondary" className="text-xs">Email Marketing</Badge>
                <Badge variant="secondary" className="text-xs">Ventas</Badge>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-32 px-6">
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
          <a href="https://www.instagram.com/estudio.creant/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
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
