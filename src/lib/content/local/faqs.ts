import type { Faq } from "../types.ts";

export const faqs: Faq[] = [
  {
    question: "Jakie są różne rodzaje niepełnosprawności uznawane prawnie?",
    answer: [
      {
        type: "paragraph",
        text: "W Polsce prawnie uznawane są różne rodzaje niepełnosprawności, oznaczane symbolami w orzeczeniach o niepełnosprawności. Symbole te określają przyczyny niepełnosprawności i są zdefiniowane w Rozporządzeniu Ministra Gospodarki, Pracy i Polityki Społecznej z dnia 15 lipca 2003 roku.",
      },
      {
        type: "list",
        items: [
          "01-U: Upośledzenie umysłowe",
          "02-P: Choroby psychiczne",
          "03-L: Zaburzenia głosu, mowy i choroby słuchu",
          "04-O: Choroby narządu wzroku",
          "05-R: Upośledzenie narządu ruchu",
          "06-E: Epilepsja",
          "07-S: Choroby układu oddechowego i krążenia",
          "08-T: Choroby układu pokarmowego",
          "09-M: Choroby układu moczowo-płciowego",
          "10-N: Choroby neurologiczne",
          "11-I: Inne, w tym schorzenia endokrynologiczne, metaboliczne, zaburzenia enzymatyczne, choroby zakaźne i odzwierzęce, zeszpecenia, choroby układu krwiotwórczego",
          "12-C: Całościowe zaburzenia rozwojowe",
        ],
      },
      {
        type: "paragraph",
        text: "Orzeczenia mogą zawierać więcej niż jeden symbol, ale nie więcej niż trzy. Stopnie niepełnosprawności klasyfikowane są jako znaczny, umiarkowany i lekki, co wpływa na zakres ulg i uprawnień oraz ewentualne dofinansowania z PFRON.",
      },
    ],
  },
  {
    question: 'Czym jest "PFRON" i jakie są jego zadania?',
    answer: [
      {
        type: "paragraph",
        text: "Państwowy Fundusz Rehabilitacji Osób Niepełnosprawnych (PFRON) to instytucja publiczna, której głównym celem jest wspieranie osób niepełnosprawnych w zakresie rehabilitacji oraz integracji społecznej i zawodowej. Działa na podstawie ustawy z dnia 27 sierpnia 1997 roku o rehabilitacji zawodowej i społecznej oraz zatrudnianiu osób niepełnosprawnych.",
      },
      { type: "heading", text: "Zadania PFRON" },
      {
        type: "list",
        items: [
          "Dofinansowanie oprocentowania kredytów bankowych na cele związane z rehabilitacją",
          "Finansowanie szkoleń i kursów dla osób niepełnosprawnych",
          "Refundacja kosztów ponoszonych przez pracodawców",
          "Wsparcie organizacji pozarządowych poprzez otwarte konkursy projektów",
          "Usuwanie barier w życiu codziennym, nauce, pracy i pełnieniu ról społecznych",
        ],
      },
    ],
  },
  {
    question: 'Co oznacza termin "integracja społeczna i zawodowa"?',
    answer: [
      {
        type: "paragraph",
        text: "Termin „integracja społeczna i zawodowa” odnosi się do procesów i działań mających na celu włączenie osób z niepełnosprawnościami w życie społeczne i zawodowe na równych zasadach z osobami pełnosprawnymi.",
      },
      { type: "heading", text: "Integracja społeczna obejmuje" },
      {
        type: "list",
        items: [
          "Tworzenie warunków umożliwiających nawiązywanie relacji społecznych i uczestnictwo w życiu publicznym",
          "Zmniejszanie barier społecznych i mentalnych",
          "Promowanie akceptacji i gotowości społeczeństwa do współpracy",
        ],
      },
      { type: "heading", text: "Integracja zawodowa polega na" },
      {
        type: "list",
        items: [
          "Umożliwieniu dostępu do rynku pracy poprzez szkolenia, doradztwo i dostosowanie miejsc pracy",
          "Usuwaniu barier architektonicznych, technicznych i komunikacyjnych",
          "Wspieraniu pracodawców w zatrudnianiu osób z niepełnosprawnościami",
        ],
      },
    ],
  },
];
