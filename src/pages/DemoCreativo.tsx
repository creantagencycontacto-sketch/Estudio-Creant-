import Marco from "@/components/Marco";
import CreativoFlotante from "@/components/CreativoFlotante";
import video from "@/assets/pauta/demo-neumaticos.mp4";
import poster from "@/assets/pauta/demo-neumaticos.jpg";

/**
 * PÁGINA TEMPORAL — solo para comparar las dos formas de mostrar el creativo.
 * Se borra en cuanto Mili elija una. No está enlazada desde ningún lado.
 */

const Caso = ({ children }: { children: React.ReactNode }) => (
  <div className="grid gap-8 border-t border-border pt-10 md:grid-cols-[1fr_auto] md:gap-14">
    <div>
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
        Neumáticos · venta mayorista
      </p>
      <h3 className="mt-3 font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-extrabold uppercase leading-[0.98] tracking-tight">
        Neumáticos de camión
      </h3>
      <p className="mt-5 max-w-[34rem] leading-relaxed text-muted-foreground">
        Dejamos de hablarle al consumidor final y le hablamos al que compra por
        volumen. Probamos tres piezas distintas y sostuvimos la que traía
        consultas más baratas.
      </p>
      <p className="mt-6 font-display text-4xl font-extrabold tracking-tight text-accent">$96</p>
      <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-muted-foreground">
        por consulta
      </p>
    </div>
    {children}
  </div>
);

const DemoCreativo = () => (
  <Marco>
    <section className="grano relative pb-12 pt-6">
      <div className="container mx-auto max-w-6xl px-6">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-accent">
          Página de prueba · no está enlazada desde el sitio
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,5.5vw,3.6rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.035em]">
          El creativo flotante,<br />de las dos formas
        </h1>
        <p className="mt-5 max-w-[34rem] text-lg text-muted-foreground">
          Es el mismo video real de la campaña de neumáticos, comprimido a 563 KB.
          Lo único que cambia entre una y otra es si se puede tocar.
        </p>
      </div>
    </section>

    <section className="grano relative pb-24">
      <div className="container mx-auto max-w-6xl space-y-16 px-6">
        <div>
          <p className="mb-6 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-primary">
            Opción 1 · solo la pieza
          </p>
          <Caso>
            <CreativoFlotante video={video} poster={poster} />
          </Caso>
          <p className="mt-6 max-w-[34rem] border-l-2 border-primary pl-5 text-sm leading-relaxed text-muted-foreground">
            El cliente no queda nombrado en ningún lado. No hay que pedirle permiso
            a nadie y ninguna tarjeta depende de que un posteo siga existiendo.
          </p>
        </div>

        <div>
          <p className="mb-6 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-primary">
            Opción 2 · se toca y abre las redes del cliente
          </p>
          <Caso>
            <CreativoFlotante video={video} poster={poster} enlace="#" cuenta="@satorineumaticos" />
          </Caso>
          <p className="mt-6 max-w-[34rem] border-l-2 border-accent pl-5 text-sm leading-relaxed text-muted-foreground">
            Pasá el mouse por encima para ver el aviso. Suma prueba de que la
            campaña existió, pero la tarjeta deja de decir «Neumáticos» y pasa a
            decir de quién es. Habría que avisarle a cada cliente.
          </p>
        </div>
      </div>
    </section>
  </Marco>
);

export default DemoCreativo;
