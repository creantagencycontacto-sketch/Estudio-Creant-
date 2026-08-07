import { useState } from "react";
import { Mail, Loader2, CheckCircle2, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { leadSchema, saveLead, buildWhatsappLink, type LeadInput } from "@/lib/leads";
import { trackEvent } from "@/lib/tracking";

type FieldErrors = Partial<Record<keyof LeadInput, string>>;
type Status = "idle" | "sending" | "sent";

const EMPTY_FORM: LeadInput = { name: "", email: "", message: "" };

/** Estilos compartidos de los campos, para que no se repitan tres veces. */
const fieldBase =
  "w-full bg-secondary/50 border rounded-xl px-6 outline-none transition-colors focus:border-primary";

const ContactForm = () => {
  const [values, setValues] = useState<LeadInput>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [whatsappLink, setWhatsappLink] = useState<string>("");

  const updateField = (field: keyof LeadInput) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    // Al empezar a corregir, sacamos el error de ese campo.
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = leadSchema.safeParse(values);

    if (!result.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof LeadInput;
        if (!nextErrors[field]) nextErrors[field] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    const lead = result.data;
    const link = buildWhatsappLink(lead);

    setStatus("sending");
    setWhatsappLink(link);

    // Le avisamos a Meta que hubo una consulta, para poder optimizar campañas
    // por conversión y armar públicos de retargeting.
    trackEvent("Lead", { content_name: "Formulario de contacto" });

    // Abrimos WhatsApp acá mismo, dentro del click, para que el navegador no
    // lo bloquee como si fuera un pop-up.
    window.open(link, "_blank", "noopener,noreferrer");

    // El guardado en la base va por atrás: aunque falle, el contacto ya llegó
    // a WhatsApp y no se pierde.
    void saveLead(lead).finally(() => {
      setStatus("sent");
      setValues(EMPTY_FORM);
      toast.success("¡Listo! Te llevamos a WhatsApp", {
        description: "Tu mensaje ya está escrito, solo tenés que enviarlo.",
      });
    });
  };

  if (status === "sent") {
    return (
      <div className="max-w-md mx-auto bg-secondary/30 border border-primary/30 rounded-2xl p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" aria-hidden="true" />
        <p className="text-xl font-bold mb-2">¡Mensaje listo!</p>
        <p className="text-muted-foreground text-sm mb-6">
          Te abrimos WhatsApp con tu consulta ya escrita. Si no se abrió sola, entrá desde acá.
        </p>
        <Button asChild size="lg" className="w-full h-14 rounded-xl text-lg font-bold">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("Contact", { content_name: "WhatsApp desde confirmación" })}
          >
            Abrir WhatsApp <MessageCircle className="ml-2 h-5 w-5" />
          </a>
        </Button>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Escribir otra consulta
        </button>
      </div>
    );
  }

  const isSending = status === "sending";

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-md mx-auto space-y-4 text-left">
      <div>
        <label htmlFor="contact-name" className="sr-only">
          Tu nombre
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Tu nombre"
          value={values.name}
          onChange={updateField("name")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "error-name" : undefined}
          className={`${fieldBase} h-14 ${errors.name ? "border-red-500" : "border-border"}`}
        />
        {errors.name && (
          <p id="error-name" role="alert" className="text-red-400 text-sm mt-2 px-2">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="sr-only">
          Tu email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Tu email"
          value={values.email}
          onChange={updateField("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "error-email" : undefined}
          className={`${fieldBase} h-14 ${errors.email ? "border-red-500" : "border-border"}`}
        />
        {errors.email && (
          <p id="error-email" role="alert" className="text-red-400 text-sm mt-2 px-2">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="sr-only">
          Contanos sobre tu proyecto
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Contanos sobre tu proyecto"
          value={values.message}
          onChange={updateField("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "error-message" : undefined}
          className={`${fieldBase} h-32 py-4 resize-none ${
            errors.message ? "border-red-500" : "border-border"
          }`}
        />
        {errors.message && (
          <p id="error-message" role="alert" className="text-red-400 text-sm mt-2 px-2">
            {errors.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSending}
        className="w-full h-14 rounded-xl text-lg font-bold mt-4"
      >
        {isSending ? (
          <>
            Enviando <Loader2 className="ml-2 h-5 w-5 animate-spin" aria-hidden="true" />
          </>
        ) : (
          <>
            Enviar Mensaje <Mail className="ml-2 h-5 w-5" aria-hidden="true" />
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center pt-2">
        Te respondemos por WhatsApp, normalmente el mismo día.
      </p>
    </form>
  );
};

export default ContactForm;
