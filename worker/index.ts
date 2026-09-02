interface Env {
  RESEND_API_KEY?: string;
  CONTACT_RECIPIENT?: string;
  CONTACT_FROM?: string;
}

interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const SUCCESS_MESSAGE = "Dziękujemy. Wiadomość została wysłana.";
const UNAVAILABLE_MESSAGE =
  "Formularz jest chwilowo niedostępny. Skontaktuj się z nami telefonicznie lub e-mailem.";
const UPSTREAM_ERROR_MESSAGE =
  "Nie udało się wysłać wiadomości. Spróbuj ponownie później.";

const RESPONSE_HEADERS = {
  "Cache-Control": "no-store",
  "Content-Type": "application/json; charset=utf-8",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
} as const;

function jsonResponse(
  body: Record<string, unknown>,
  status: number,
  additionalHeaders: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...RESPONSE_HEADERS, ...additionalHeaders },
  });
}

function successResponse(): Response {
  return jsonResponse({ ok: true, message: SUCCESS_MESSAGE }, 200);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string): boolean {
  if (value.length === 0 || value.length > 254) return false;

  const separator = value.lastIndexOf("@");
  if (separator <= 0 || separator !== value.indexOf("@")) return false;

  const local = value.slice(0, separator);
  const domain = value.slice(separator + 1);
  if (
    local.length > 64 ||
    local.startsWith(".") ||
    local.endsWith(".") ||
    local.includes("..") ||
    !/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local)
  ) {
    return false;
  }

  const labels = domain.split(".");
  if (domain.length > 253 || labels.length < 2) return false;
  if (!/^[A-Za-z]{2,63}$/.test(labels.at(-1) ?? "")) return false;

  return labels.every(
    (label) =>
      label.length >= 1 &&
      label.length <= 63 &&
      /^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/.test(label),
  );
}

function validateContact(body: Record<string, unknown>): {
  data?: ContactMessage;
  errors: Record<string, string>;
} {
  const name = stringValue(body.name);
  const email = stringValue(body.email);
  const subject = stringValue(body.subject);
  const message = stringValue(body.message);
  const errors: Record<string, string> = {};

  if (name.length < 2 || name.length > 100) {
    errors.name = "Imię i nazwisko musi mieć od 2 do 100 znaków.";
  }
  if (!isValidEmail(email)) {
    errors.email = "Podaj poprawny adres e-mail (maksymalnie 254 znaki).";
  }
  if (subject.length < 3 || subject.length > 150) {
    errors.subject = "Temat musi mieć od 3 do 150 znaków.";
  }
  if (message.length < 10 || message.length > 5000) {
    errors.message = "Wiadomość musi mieć od 10 do 5000 znaków.";
  }
  if (body.consent !== true) {
    errors.consent = "Zgoda na przetwarzanie danych jest wymagana.";
  }

  if (Object.keys(errors).length > 0) return { errors };

  return { data: { name, email, subject, message }, errors };
}

function hasHoneypotValue(value: unknown): boolean {
  if (typeof value === "string") return value.trim().length > 0;
  return value !== undefined && value !== null;
}

function hasRequiredEnv(env: Env): env is Required<Env> {
  return [env.RESEND_API_KEY, env.CONTACT_RECIPIENT, env.CONTACT_FROM].every(
    (value) => typeof value === "string" && value.trim().length > 0,
  );
}

function safeBodyText(value: string, limit: number): string {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, " ")
    .slice(0, limit);
}

function safeHeaderText(value: string): string {
  return value
    .replace(/[\r\n]+/g, " ")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .slice(0, 150);
}

function emailPayload(data: ContactMessage, env: Required<Env>): Record<string, unknown> {
  return {
    from: env.CONTACT_FROM,
    to: [env.CONTACT_RECIPIENT],
    reply_to: data.email.slice(0, 254),
    subject: `[faz.org.pl] ${safeHeaderText(data.subject)}`,
    text: [
      "Nowa wiadomość z formularza kontaktowego faz.org.pl",
      "",
      `Imię i nazwisko: ${safeBodyText(data.name, 100)}`,
      `E-mail: ${safeBodyText(data.email, 254)}`,
      `Temat: ${safeBodyText(data.subject, 150)}`,
      "",
      "Wiadomość:",
      safeBodyText(data.message, 5000),
    ].join("\n"),
  };
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("Origin");
  if (!origin) return true;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

async function sendContactEmail(data: ContactMessage, env: Required<Env>): Promise<boolean> {
  let response: Response;

  try {
    response = await globalThis.fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": "faz.org.pl-contact-worker/1.0",
      },
      body: JSON.stringify(emailPayload(data, env)),
    });
  } catch {
    console.error("Contact email delivery failed", { service: "resend", kind: "network_error" });
    return false;
  }

  if (!response.ok) {
    console.error("Contact email delivery failed", {
      service: "resend",
      kind: "upstream_status",
      status: response.status,
    });
    return false;
  }

  return true;
}

export async function fetch(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);

  if (url.pathname !== "/api/contact") {
    return jsonResponse({ ok: false, message: "Nie znaleziono endpointu API." }, 404);
  }

  if (request.method !== "POST") {
    return jsonResponse(
      { ok: false, message: "Ta metoda nie jest obsługiwana." },
      405,
      { Allow: "POST" },
    );
  }

  if (!isSameOrigin(request)) {
    return jsonResponse({ ok: false, message: "Żądanie zostało odrzucone." }, 403);
  }

  const mediaType = request.headers.get("Content-Type")?.split(";", 1)[0].trim().toLowerCase();
  if (mediaType !== "application/json") {
    return jsonResponse({ ok: false, message: "Wymagany jest format JSON." }, 415);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(
      {
        ok: false,
        message: "Popraw wskazane pola.",
        errors: { form: "Prześlij poprawne dane formularza." },
      },
      400,
    );
  }

  if (!isRecord(body)) {
    return jsonResponse(
      {
        ok: false,
        message: "Popraw wskazane pola.",
        errors: { form: "Prześlij poprawne dane formularza." },
      },
      400,
    );
  }

  if (hasHoneypotValue(body.website)) return successResponse();

  const { data, errors } = validateContact(body);
  if (!data) {
    return jsonResponse({ ok: false, message: "Popraw wskazane pola.", errors }, 400);
  }

  if (!hasRequiredEnv(env)) {
    return jsonResponse({ ok: false, message: UNAVAILABLE_MESSAGE }, 503);
  }

  if (!(await sendContactEmail(data, env))) {
    return jsonResponse({ ok: false, message: UPSTREAM_ERROR_MESSAGE }, 502);
  }

  return successResponse();
}

export default { fetch };
