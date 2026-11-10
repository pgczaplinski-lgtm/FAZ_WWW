import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { content } from "../lib/content/index.ts";
import { PANEL_URL } from "../lib/content/panel/index.ts";
import { PageHeader } from "../components/ui/PageHeader.tsx";
import { Button, Section } from "../components/ui/primitives.tsx";

const fieldClass =
  "mt-1 w-full rounded-md border border-muted bg-white px-3 py-2 text-ink focus-visible:outline-brand aria-[invalid=true]:border-2 aria-[invalid=true]:border-red-700";

type Field = "name" | "email" | "message" | "consent";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "sent" | "failed";

const FIELD_ORDER: Field[] = ["name", "email", "message", "consent"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MESSAGES: Record<Field, string> = {
  name: "Wpisz imię i nazwisko.",
  email: "Wpisz adres e-mail w formacie nazwa@domena.pl.",
  message: "Wpisz treść wiadomości.",
  consent: "Zaznacz zgodę na przetwarzanie danych, aby wysłać formularz.",
};

function validate(v: { name: string; email: string; message: string; consent: boolean }): Errors {
  const errors: Errors = {};
  if (!v.name.trim()) errors.name = MESSAGES.name;
  if (!EMAIL_RE.test(v.email.trim())) errors.email = MESSAGES.email;
  if (!v.message.trim()) errors.message = MESSAGES.message;
  if (!v.consent) errors.consent = MESSAGES.consent;
  return errors;
}

export function Kontakt() {
  const org = content.getOrgInfo();
  const id = useId();
  const fieldId = (f: Field | "phone") => `${id}-${f}`;
  const errorId = (f: Field) => `${id}-${f}-error`;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [attempt, setAttempt] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const failureRef = useRef<HTMLDivElement>(null);
  const errorList = FIELD_ORDER.filter((f) => errors[f]);

  useEffect(() => {
    if (attempt === 0) return;
    if (errorList.length > 0) summaryRef.current?.focus();
    else if (status === "failed") failureRef.current?.focus();
  }, [attempt]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const found = validate({ name, email, message, consent });
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      setAttempt((n) => n + 1);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`${PANEL_URL}/api/public/website/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message, consent, website }),
      });
      if (res.ok) {
        setStatus("sent");
        return;
      }
      if (res.status === 400) {
        const body = (await res.json().catch(() => null)) as { fields?: string[] } | null;
        const server: Errors = {};
        for (const f of body?.fields ?? []) if (FIELD_ORDER.includes(f as Field)) server[f as Field] = MESSAGES[f as Field];
        if (Object.keys(server).length > 0) {
          setErrors(server);
          setStatus("idle");
          setAttempt((n) => n + 1);
          return;
        }
      }
      setStatus("failed");
    } catch {
      setStatus("failed");
    }
    setAttempt((n) => n + 1);
  }

  const describedBy = (f: Field) => (errors[f] ? errorId(f) : undefined);
  const invalid = (f: Field) => (errors[f] ? true : undefined);

  return (
    <>
      <PageHeader
        title="Kontakt"
        intro="Jesteśmy tu dla Ciebie – niezależnie od tego, czy masz pytanie, sugestię, czy potrzebujesz wsparcia. Wypełnij formularz, a my skontaktujemy się z Tobą."
        crumbs={[
          { label: "Strona główna", to: "/" },
          { label: "Kontakt" },
        ]}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div role="status">
              {status === "sent" && (
                <p className="rounded-xl border border-brand bg-brand-light p-6 font-semibold text-brand">
                  Dziękujemy! Wiadomość została wysłana. Odpowiemy najszybciej, jak to możliwe.
                </p>
              )}
            </div>
            {status !== "sent" && (
              <form onSubmit={onSubmit} noValidate className="space-y-4">
                {errorList.length > 0 && (
                  <div
                    ref={summaryRef}
                    tabIndex={-1}
                    role="alert"
                    className="rounded-xl border-2 border-red-700 bg-red-50 p-4 text-red-900"
                  >
                    <p className="font-semibold">
                      Formularz zawiera błędy ({errorList.length}). Popraw je i wyślij ponownie:
                    </p>
                    <ul className="mt-2 list-disc space-y-1 pl-6">
                      {errorList.map((f) => (
                        <li key={f}>
                          <a
                            href={`#${fieldId(f)}`}
                            className="underline"
                            onClick={(e) => {
                              e.preventDefault();
                              document.getElementById(fieldId(f))?.focus();
                            }}
                          >
                            {errors[f]}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {status === "failed" && (
                  <div
                    ref={failureRef}
                    tabIndex={-1}
                    role="alert"
                    className="rounded-xl border-2 border-red-700 bg-red-50 p-4 text-red-900"
                  >
                    <p className="font-semibold">Nie udało się wysłać wiadomości.</p>
                    <p className="mt-1">
                      Twoje dane pozostały w formularzu – spróbuj ponownie za chwilę albo napisz na{" "}
                      <a href={`mailto:${org.email}`} className="font-semibold underline">
                        {org.email}
                      </a>
                      {org.phones[0] ? (
                        <>
                          {" "}
                          lub zadzwoń:{" "}
                          <a href={`tel:${org.phones[0].replace(/\s/g, "")}`} className="font-semibold underline">
                            {org.phones[0]}
                          </a>
                        </>
                      ) : null}
                      .
                    </p>
                  </div>
                )}
                <div>
                  <label htmlFor={fieldId("name")} className="block text-sm font-semibold text-ink">
                    Imię i nazwisko (wymagane)
                  </label>
                  <input
                    id={fieldId("name")}
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    aria-invalid={invalid("name")}
                    aria-describedby={describedBy("name")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={fieldClass}
                  />
                  {errors.name && (
                    <p id={errorId("name")} className="mt-1 text-sm font-semibold text-red-700">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor={fieldId("email")} className="block text-sm font-semibold text-ink">
                    E-mail (wymagany)
                  </label>
                  <input
                    id={fieldId("email")}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    aria-invalid={invalid("email")}
                    aria-describedby={describedBy("email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={fieldClass}
                  />
                  {errors.email && (
                    <p id={errorId("email")} className="mt-1 text-sm font-semibold text-red-700">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor={fieldId("phone")} className="block text-sm font-semibold text-ink">
                    Telefon (opcjonalnie)
                  </label>
                  <input
                    id={fieldId("phone")}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor={fieldId("message")} className="block text-sm font-semibold text-ink">
                    Wiadomość (wymagana)
                  </label>
                  <textarea
                    id={fieldId("message")}
                    name="message"
                    required
                    rows={6}
                    aria-invalid={invalid("message")}
                    aria-describedby={describedBy("message")}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={fieldClass}
                  />
                  {errors.message && (
                    <p id={errorId("message")} className="mt-1 text-sm font-semibold text-red-700">
                      {errors.message}
                    </p>
                  )}
                </div>
                <div className="hidden" aria-hidden="true">
                  <label htmlFor={`${id}-website`}>Strona WWW</label>
                  <input
                    id={`${id}-website`}
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
                <div>
                  <div className="flex items-start gap-3">
                    <input
                      id={fieldId("consent")}
                      name="consent"
                      type="checkbox"
                      required
                      aria-invalid={invalid("consent")}
                      aria-describedby={describedBy("consent")}
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 accent-brand"
                    />
                    <label htmlFor={fieldId("consent")} className="text-sm text-muted">
                      Wyrażam zgodę na przetwarzanie danych zawartych w formularzu w celu kontaktu, zgodnie z
                      obowiązującymi przepisami o ochronie danych osobowych (wymagane, aby wysłać formularz).
                    </label>
                  </div>
                  {errors.consent && (
                    <p id={errorId("consent")} className="mt-1 text-sm font-semibold text-red-700">
                      {errors.consent}
                    </p>
                  )}
                </div>
                <Button type="submit" ariaDisabled={status === "sending"}>
                  {status === "sending" ? "Wysyłanie…" : "Wyślij"}
                </Button>
              </form>
            )}
          </div>

          <div className="space-y-4">
            {org.offices.map((office) => (
              <article
                key={`${office.city}-${office.address}`}
                className="rounded-xl border border-line bg-surface p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-baseline gap-2">
                  <h2 className="text-lg font-bold text-ink">{office.city}</h2>
                  {office.kind === "main" && (
                    <span className="rounded-full bg-brand-light px-3 py-0.5 text-xs font-semibold text-brand">
                      Siedziba główna
                    </span>
                  )}
                </div>
                <p className="mt-2 text-muted">{office.address}</p>
                {office.phones.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {office.phones.map((phoneNumber) => (
                      <li key={phoneNumber}>
                        <a href={`tel:${phoneNumber.replace(/\s/g, "")}`} className="text-brand hover:underline">
                          {phoneNumber}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-2">
                  <a href={`mailto:${office.email}`} className="text-brand hover:underline">
                    {office.email}
                  </a>
                </p>
                {office.hours && <p className="mt-2 text-sm text-muted">{office.hours}</p>}
              </article>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
