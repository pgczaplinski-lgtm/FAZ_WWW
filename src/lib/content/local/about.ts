import type { History, Report, RichBlock, Statute } from "../types.ts";
import { orgInfo } from "./org.ts";

export const about: string[] = [
  "Fundacja Aktywności Zawodowej wspiera przede wszystkim osoby z\u00a0niepełnosprawnościami w\u00a0rozwoju zawodowym, rehabilitacji oraz\u00a0pełniejszym uczestnictwie w\u00a0życiu społecznym.",
  "Organizujemy giełdy pracy, prowadzimy doradztwo zawodowe i\u00a0prawne oraz\u00a0szkolenia dla pracodawców i\u00a0Warsztatów Terapii Zajęciowej.",
  "Jesteśmy organizacją pożytku publicznego. Działamy non profit i\u00a0nie\u00a0prowadzimy działalności gospodarczej.",
];

export const history: History = {
  intro:
    "Działamy od 2008 roku, wspierając osoby w trudnej sytuacji na rynku pracy, zwłaszcza osoby z niepełnosprawnościami. Od początku stawiamy na indywidualne podejście, rozwijając programy i projekty, które pomagają uczestnikom odnaleźć swoją drogę zawodową. Po ponad 15 latach działalności nadal realizujemy naszą misję, wspierając aktywizację zawodową i społeczną.",
  events: [
    {
      date: "2008-01-01",
      title: "Powstanie Fundacji",
      text: "Fundacja Aktywności Zawodowej rozpoczyna działalność. Od początku stawiamy na indywidualne podejście do osób w trudnej sytuacji na rynku pracy, zwłaszcza osób z niepełnosprawnościami.",
    },
    {
      date: "2015-01-01",
      title: "Rozwój programów aktywizacji",
      text: "Rozwijamy programy i projekty, które pomagają uczestnikom odnaleźć swoją drogę zawodową — doradztwo, szkolenia, staże i współpracę z pracodawcami.",
    },
    {
      date: "2024-01-01",
      title: "Rok pełen rezultatów",
      text: "W jednym roku 127 osób znalazło zatrudnienie, a 240 uczestniczyło w naszych działaniach.",
    },
    {
      date: "2024-12-31",
      title: "Łączny bilans",
      text: "Od początku działalności łącznie 435 zatrudnionych i 643 uczestników programów Fundacji.",
    },
  ],
};

export const statute: Statute = {
  sections: [
    {
      title: "Postanowienia ogólne",
      text: "Statut określa nazwę, siedzibę i charakter Fundacji Aktywności Zawodowej jako niezależnej organizacji non profit, działającej na rzecz osób zagrożonych wykluczeniem na rynku pracy. Fundacja nie prowadzi działalności gospodarczej i działa jako organizacja pożytku publicznego.",
    },
    {
      title: "Cele Fundacji",
      text: "Celem jest aktywizacja zawodowa i społeczna osób z niepełnosprawnościami oraz innych osób w trudnej sytuacji na rynku pracy. Fundacja dąży do zwiększenia ich samodzielności, udziału w życiu społecznym i szans na godne zatrudnienie.",
    },
    {
      title: "Sposoby realizacji celów",
      text: "Cele realizowane są przez doradztwo zawodowe i prawne, szkolenia, staże, giełdy pracy, współpracę z pracodawcami i Warsztatami Terapii Zajęciowej oraz projekty finansowane ze środków publicznych i prywatnych. Działania prowadzone są z poszanowaniem godności uczestników i zasady równego traktowania.",
    },
    {
      title: "Organy Fundacji",
      text: "Statut przewiduje Zarząd, który prowadzi sprawy Fundacji i reprezentuje ją na zewnątrz, oraz Radę Fundacji, która sprawuje nadzór i wspiera strategię. Skład organów i zasady ich powoływania określa pełny tekst statutu.",
    },
    {
      title: "Majątek Fundacji",
      text: "Majątek tworzą środki przekazane przez fundatorów, darowizny, dotacje, 1,5% podatku oraz inne wpływy zgodne z prawem. Środki przeznaczane są wyłącznie na cele statutowe. Zasady gospodarki finansowej i sprawozdawczości wynikają z przepisów o organizacjach pożytku publicznego.",
    },
  ],
  pdfUrl: null,
};

export const reports: Report[] = [
  { year: "2023", title: "Sprawozdanie za 2023", pdfUrl: null },
  { year: "2022", title: "Sprawozdanie za 2022", pdfUrl: null },
  { year: "2021", title: "Sprawozdanie za 2021", pdfUrl: null },
];

export const accessibility: RichBlock[] = [
  {
    type: "paragraph",
    text: `Serwis internetowy ${orgInfo.name} stara się spełniać wymagania WCAG 2.1 na poziomie AA. Strona jest zbudowana semantycznie, działa z klawiatury i nie opiera komunikacji wyłącznie na kolorze.`,
  },
  { type: "heading", text: "Ułatwienia na tej stronie" },
  {
    type: "list",
    items: [
      "Pasek dostępności: zmiana kontrastu, powiększenie czcionki i podkreślenie odnośników.",
      "Nawigacja z klawiatury — logiczna kolejność fokusu i widoczny stan focus.",
      "Nagłówki, listy i etykiety formularzy zgodne z rolą treści.",
      "Teksty alternatywne przy treściach graficznych, gdy obraz niesie informację.",
    ],
  },
  { type: "heading", text: "Zgłoś problem z dostępnością" },
  {
    type: "paragraph",
    text: `Jeśli natrafisz na barierę, napisz na ${orgInfo.email} lub zadzwoń pod ${orgInfo.phones[0]}. Opisz stronę, urządzenie i to, co utrudnia korzystanie — odpowiemy i poprawimy serwis, gdy to możliwe.`,
  },
];
