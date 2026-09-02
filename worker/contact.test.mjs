import assert from "node:assert/strict";
import test from "node:test";

import worker from "./index.ts";

const endpoint = "https://faz.org.pl/api/contact";
const env = {
  RESEND_API_KEY: "resend-secret",
  CONTACT_RECIPIENT: "kontakt@faz.org.pl",
  CONTACT_FROM: "FAZ <formularz@faz.org.pl>",
};
const validContact = {
  name: "Jan Kowalski",
  email: "jan@example.com",
  subject: "Pytanie o współpracę",
  message: "Proszę o kontakt w sprawie współpracy.",
  consent: true,
  website: "",
};

function request(body, headers = {}) {
  return new Request(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://faz.org.pl", ...headers },
    body: JSON.stringify(body),
  });
}

test("valid contact is sent through Resend", async (t) => {
  let outbound;
  t.mock.method(globalThis, "fetch", async (url, init) => {
    outbound = { url, init };
    return new Response(null, { status: 202 });
  });

  const response = await worker.fetch(request(validContact), env);
  const result = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(result, {
    ok: true,
    message: "Dziękujemy. Wiadomość została wysłana.",
  });
  assert.equal(outbound.url, "https://api.resend.com/emails");
  assert.equal(outbound.init.headers.Authorization, "Bearer resend-secret");
  assert.equal(outbound.init.headers["User-Agent"], "faz.org.pl-contact-worker/1.0");
  const payload = JSON.parse(outbound.init.body);
  assert.equal(payload.reply_to, validContact.email);
  assert.match(payload.subject, /^\[faz\.org\.pl\]/);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
});

test("invalid contact returns field errors without an outbound call", async (t) => {
  const fetchMock = t.mock.method(globalThis, "fetch", async () => {
    throw new Error("outbound fetch must not run");
  });

  const response = await worker.fetch(
    request({ ...validContact, name: "J", email: "bad", consent: false }),
    env,
  );
  const result = await response.json();

  assert.equal(response.status, 400);
  assert.equal(result.ok, false);
  assert.equal(result.message, "Popraw wskazane pola.");
  assert.deepEqual(Object.keys(result.errors).sort(), ["consent", "email", "name"]);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("missing secrets fail closed without an outbound call", async (t) => {
  const fetchMock = t.mock.method(globalThis, "fetch", async () => {
    throw new Error("outbound fetch must not run");
  });

  const response = await worker.fetch(request(validContact), {});
  const result = await response.json();

  assert.equal(response.status, 503);
  assert.deepEqual(result, {
    ok: false,
    message:
      "Formularz jest chwilowo niedostępny. Skontaktuj się z nami telefonicznie lub e-mailem.",
  });
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("filled honeypot returns success without validation or outbound call", async (t) => {
  const fetchMock = t.mock.method(globalThis, "fetch", async () => {
    throw new Error("outbound fetch must not run");
  });

  const response = await worker.fetch(
    request({ name: "", email: "", subject: "", message: "", consent: false, website: "bot" }),
    {},
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    ok: true,
    message: "Dziękujemy. Wiadomość została wysłana.",
  });
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("Resend failure returns a generic 502 without reading its body", async (t) => {
  let bodyRead = false;
  t.mock.method(console, "error", () => {});
  t.mock.method(globalThis, "fetch", async () => ({
    ok: false,
    status: 429,
    text: async () => {
      bodyRead = true;
      return "sensitive upstream body";
    },
  }));

  const response = await worker.fetch(request(validContact), env);

  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), {
    ok: false,
    message: "Nie udało się wysłać wiadomości. Spróbuj ponownie później.",
  });
  assert.equal(bodyRead, false);
});
