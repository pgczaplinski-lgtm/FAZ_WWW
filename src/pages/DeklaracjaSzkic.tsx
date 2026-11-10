import type { ReactNode } from "react";
import { content } from "../lib/content/index.ts";

/**
 * Draft accessibility statement following the Ministry of Digital Affairs template,
 * "Warunki techniczne publikacji oraz struktura dokumentu elektronicznego deklaracji
 * dostępności" v2.0 (2024-07-31). Only data confirmed by the Foundation is filled in;
 * everything else is a visible `Missing` marker. Rendered only in development or when
 * `PUBLISH_DRAFT_DECLARATION` in `Deklaracja.tsx` is enabled.
 */

const SITE_URL = "https://faz.org.pl";

function Missing({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded bg-yellow-200 px-1 font-semibold text-ink">DO UZUPEŁNIENIA: {children}</mark>
  );
}

const h2 = "pt-4 text-2xl font-bold text-ink";
const h3 = "pt-2 text-xl font-bold text-ink";
const p = "leading-relaxed text-muted";
const ul = "list-disc space-y-1 pl-6 text-muted";
const a = "break-words font-semibold text-brand underline";

export function DeklaracjaSzkic() {
  const org = content.getOrgInfo();
  const main = org.offices.find((o) => o.kind === "main");
  const phone = org.phones[0];

  return (
    <div className="space-y-4">
      <p role="note" className="rounded-xl border-2 border-yellow-500 bg-yellow-50 p-4 font-semibold text-ink">
        Szkic deklaracji – widoczny tylko w podglądzie. Nie publikować, dopóki wszystkie pola „DO UZUPEŁNIENIA” nie
        zostaną uzupełnione danymi Fundacji.
      </p>

      <section id="a11y-wstep" className="space-y-4">
        <p className={p}>
          <span id="a11y-podmiot">{org.name}</span> zobowiązuje się zapewnić dostępność swojej{" "}
          <span id="a11y-zakres">strony internetowej</span> zgodnie z ustawą z dnia 4 kwietnia 2019 r. o dostępności
          cyfrowej stron internetowych i aplikacji mobilnych podmiotów publicznych.
        </p>
        <p className={p}>
          Deklaracja dostępności dotyczy strony{" "}
          <a id="a11y-url" href={SITE_URL} className={a}>
            {SITE_URL.replace(/^https:\/\//, "")}
          </a>
          .
        </p>
      </section>
      <ul className={ul}>
        <li>
          Data publikacji strony internetowej:{" "}
          <time id="a11y-data-publikacja">
            <Missing>data publikacji (format „5 lutego 2020 r.”, atrybut datetime rrrr-mm-dd)</Missing>
          </time>
        </li>
        <li>
          Data ostatniej istotnej aktualizacji:{" "}
          <time id="a11y-data-aktualizacja">
            <Missing>data ostatniej istotnej aktualizacji</Missing>
          </time>
        </li>
      </ul>

      <h2 className={h2}>Stan dostępności cyfrowej</h2>
      <p id="a11y-status" className={p}>
        <Missing>
          status zgodności wybrany na podstawie oceny (częściowo zgodna / niezgodna / w pełni zgodna) – w brzmieniu
          wzoru Ministerstwa Cyfryzacji
        </Missing>
      </p>

      <h2 className={h2}>Niedostępne treści</h2>
      <h3 className={h3}>Niezgodność z załącznikiem</h3>
      <p className={p}>
        <Missing>
          opis pozostałych barier na podstawie oceny – elementy, adresy podstron, opis błędu i alternatywny sposób
          dostępu (m.in. pliki PDF sprawozdań i statutu wskazane w raporcie z testów)
        </Missing>
      </p>
      <h3 className={h3}>Treści nieobjęte przepisami</h3>
      <p className={p}>
        <Missing>wyłączenia na podstawie art. 3 ustawy, jeśli dotyczą (np. dokumenty sprzed 23 września 2018 r.)</Missing>
      </p>

      <h2 className={h2}>Przygotowanie deklaracji dostępności i jej aktualizacja</h2>
      <ul className={ul}>
        <li>
          Data sporządzenia deklaracji:{" "}
          <time id="a11y-data-sporzadzenie">
            <Missing>data sporządzenia deklaracji</Missing>
          </time>
        </li>
      </ul>
      <p className={p}>
        <Missing>
          podstawa oceny: samoocena (metoda i link do raportu) albo audyt zewnętrzny (nazwa audytora i link do raportu)
        </Missing>
      </p>

      <h2 className={h2}>Informacje zwrotne i dane kontaktowe</h2>
      <p className={p}>
        Wszystkie problemy z dostępnością cyfrową tej strony internetowej możesz zgłosić do{" "}
        <span id="a11y-kontakt">
          <Missing>imię i nazwisko osoby lub nazwa komórki odpowiedzialnej</Missing>
        </span>{" "}
        — mejlowo{" "}
        <a id="a11y-email" href={`mailto:${org.email}`} className={a}>
          {org.email}
        </a>
        {phone ? (
          <>
            {" "}
            lub telefonicznie{" "}
            <a id="a11y-telefon" href={`tel:+48${phone.replace(/\s+/g, "")}`} className={a}>
              {phone}
            </a>
          </>
        ) : null}
        .
      </p>
      <p className={p}>
        Każdy ma prawo wystąpić z żądaniem zapewnienia dostępności cyfrowej tej strony internetowej lub jej elementów.
      </p>
      <p className={p}>Zgłaszając takie żądanie podaj:</p>
      <ul className={ul}>
        <li>swoje imię i nazwisko,</li>
        <li>swoje dane kontaktowe (np. numer telefonu, e-mail),</li>
        <li>dokładny adres strony internetowej, na której jest niedostępny cyfrowo element lub treść,</li>
        <li>opis na czym polega problem i jaki sposób jego rozwiązania byłby dla Ciebie najwygodniejszy.</li>
      </ul>
      <p className={p}>
        Na Twoje zgłoszenie odpowiemy najszybciej jak to możliwe, nie później niż w ciągu 7 dni od jego otrzymania.
      </p>
      <p className={p}>
        Jeżeli ten termin będzie dla nas zbyt krótki poinformujemy Cię o tym. W tej informacji podamy nowy termin, do
        którego poprawimy zgłoszone przez Ciebie błędy lub przygotujemy informacje w alternatywny sposób. Ten nowy
        termin nie będzie dłuższy niż 2 miesiące.
      </p>
      <p className={p}>
        Jeżeli nie będziemy w stanie zapewnić dostępności cyfrowej strony internetowej lub treści, wskazanej w Twoim
        żądaniu, zaproponujemy Ci dostęp do nich w alternatywny sposób.
      </p>

      <section id="a11y-procedura" className="space-y-4">
        <h3 className={h3}>Obsługa wniosków i skarg związanych z dostępnością</h3>
        <p className={p}>
          Jeżeli w odpowiedzi na Twój wniosek o zapewnienie dostępności cyfrowej, odmówimy zapewnienia żądanej przez
          Ciebie dostępności cyfrowej, a Ty nie zgadzasz się z tą odmową, masz prawo złożyć skargę.
        </p>
        <p className={p}>
          Skargę masz prawo złożyć także, jeśli nie zgadzasz się na skorzystanie z alternatywnego sposobu dostępu,
          który zaproponowaliśmy Ci w odpowiedzi na Twój wniosek o zapewnienie dostępności cyfrowej.
        </p>
        <p className={p}>Ewentualną skargę złóż listownie lub mailem do Zarządu Fundacji:</p>
        <ul className={ul}>
          <li>
            <Missing>imię, nazwisko i funkcja osoby przyjmującej skargi</Missing>
          </li>
          {main ? <li>Adres: {main.address},</li> : null}
          <li>
            mejl:{" "}
            <a href={`mailto:${org.email}`} className={a}>
              {org.email}
            </a>
            .
          </li>
        </ul>
        <p className={p}>
          <a
            href="https://www.gov.pl/web/gov/zloz-wniosek-o-zapewnienie-dostepnosci-cyfrowej-strony-internetowej-lub-aplikacji-mobilnej"
            className={a}
          >
            Pomocne mogą być informacje, które można znaleźć na rządowym portalu gov.pl
          </a>
          .
        </p>
        <p className={p}>
          Możesz także poinformować o tej sytuacji{" "}
          <a href="https://bip.brpo.gov.pl/" className={a}>
            Rzecznika Praw Obywatelskich
          </a>{" "}
          i poprosić o interwencję w Twojej sprawie.
        </p>
      </section>

      <h2 className={h2}>Pozostałe informacje</h2>
      <p className={p}>
        <Missing>czy Fundacja udostępnia aplikacje mobilne – jeśli tak, sekcja „Aplikacje mobilne” (a11y-aplikacje)</Missing>
      </p>

      <section id="a11y-architektura" className="space-y-4">
        <h3 className={h3}>Dostępność architektoniczna</h3>
        {org.offices.map((office) => (
          <div key={`${office.city}-${office.address}`} className="space-y-2">
            <h4 className="font-bold text-ink">
              {org.name} — {office.address}
            </h4>
            <p className={p}>
              <Missing>
                opis dostępności architektonicznej: wejście i podjazd, winda, toaleta, parking, oznaczenia, pies
                asystujący
              </Missing>
            </p>
          </div>
        ))}
      </section>

      <section id="a11y-komunikacja" className="space-y-4">
        <h3 className={h3}>Dostępność komunikacyjno-informacyjna</h3>
        <p className={p}>
          <Missing>możliwość skorzystania z tłumacza PJM (także online) oraz informacja o pętlach indukcyjnych</Missing>
        </p>
      </section>
    </div>
  );
}
