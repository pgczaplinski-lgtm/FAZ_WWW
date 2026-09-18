import { useId, useState, type FormEvent } from "react";
import { content } from "../lib/content/index.ts";
import { PageHeader } from "../components/ui/PageHeader.tsx";
import { Button, Section } from "../components/ui/primitives.tsx";

const fieldClass =
  "mt-1 w-full rounded-md border border-line bg-surface px-3 py-2 text-ink focus-visible:outline-brand";

export function Kontakt() {
  const org = content.getOrgInfo();
  const id = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

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
            {sent ? (
              <p className="rounded-xl border border-brand bg-brand-light p-6 font-semibold text-brand" role="status">
                Dziękujemy! Wiadomość została wysłana.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label htmlFor={`${id}-name`} className="block text-sm font-semibold text-ink">
                    Imię i nazwisko
                  </label>
                  <input
                    id={`${id}-name`}
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor={`${id}-email`} className="block text-sm font-semibold text-ink">
                    E-mail
                  </label>
                  <input
                    id={`${id}-email`}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor={`${id}-phone`} className="block text-sm font-semibold text-ink">
                    Telefon
                  </label>
                  <input
                    id={`${id}-phone`}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor={`${id}-message`} className="block text-sm font-semibold text-ink">
                    Wiadomość
                  </label>
                  <textarea
                    id={`${id}-message`}
                    name="message"
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div className="flex items-start gap-3">
                  <input
                    id={`${id}-consent`}
                    name="consent"
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1"
                  />
                  <label htmlFor={`${id}-consent`} className="text-sm text-muted">
                    Wyrażam zgodę na przetwarzanie danych zawartych w formularzu w celu kontaktu,
                    zgodnie z obowiązującymi przepisami o ochronie danych osobowych.
                  </label>
                </div>
                <Button type="submit">Wyślij</Button>
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
