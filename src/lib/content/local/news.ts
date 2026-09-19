import type { NewsPost } from "../types.ts";

/** Turn a plain excerpt into a single-paragraph body block. */
const p = (text: string) => [{ type: "paragraph" as const, text }];

export const news: NewsPost[] = [
  {
    slug: "szkolenie-wtz-w-dobrych-rekach-w-chociwlu",
    title: "Szkolenie „WTZ w dobrych rękach” w Chociwlu: 14-15.09",
    date: "2025-09-15",
    categories: ["Aktualności"],
    isArticle: false,
    image: "/images/news/szkolenie-wtz-w-dobrych-rekach-w-chociwlu.jpeg",
    excerpt:
      "W dniach 14-15 września w Pałacu nad Jeziorem w Chociwlu odbyło się kolejne szkolenie w ramach projektu „WTZ w dobrych rękach”. Głównym tematem spotkania była nowa koncepcja funkcjonowania WTZ.",
    body: p(
      "W dniach 14-15 września w Pałacu nad Jeziorem w Chociwlu odbyło się kolejne szkolenie w ramach projektu „WTZ w dobrych rękach”. Głównym tematem spotkania była nowa koncepcja funkcjonowania WTZ – odejście od modelu czysto opiekuńczo-terapeutycznego na rzecz wsparcia aktywizacji społeczno-zawodowej uczestników.",
    ),
  },
  {
    slug: "jak-poradzic-sobie-z-odrzuceniem-w-procesie-rekrutacji",
    title: "Jak poradzić sobie z odrzuceniem w procesie rekrutacji?",
    date: "2025-09-10",
    categories: ["Artykuły", "Rynek pracy"],
    isArticle: true,
    image: "/images/news/jak-poradzic-sobie-z-odrzuceniem-w-procesie-rekrutacji.jpg",
    excerpt:
      "Proces poszukiwania pracy to często czasochłonny i wymagający okres. Warto pamiętać, że każda porażka może zostać przekuta w cenną lekcję.",
    body: p(
      "Proces poszukiwania pracy to często czasochłonny i wymagający okres. W trakcie spotkań z pracodawcami można spotkać się z wieloma odpowiedziami odmownymi. Powodować mogą zniechęcenie i wątpliwości co do jakości własnych umiejętności zawodowych. Warto jednak pamiętać, że każda porażka może zostać przekuta w cenną lekcję. Odmowa ze strony pracodawcy może pomóc zrozumieć własne mocne, jak i słabsze strony.",
    ),
  },
  {
    slug: "podsumowanie-miesiaca-sierpien",
    title: "Podsumowanie miesiąca: sierpień",
    date: "2025-08-31",
    categories: ["Aktualności"],
    isArticle: false,
    image: "/images/news/podsumowanie-miesiaca-sierpien.svg",
    excerpt:
      "Sierpień za nami i mimo urlopowego zwolnienia tempa u innych, u nas działo się naprawdę dużo. Nowe zatrudnienia, staże, wizyty studyjne i mnóstwo spotkań.",
    body: p(
      "Sierpień za nami i mimo urlopowego zwolnienia tempa u innych, u nas działo się naprawdę dużo. Nowe zatrudnienia, staże, wizyty studyjne i mnóstwo spotkań, które krok po kroku przybliżają naszych Uczestników do stabilnej pracy.",
    ),
  },
  {
    slug: "spotkanie-w-ministerstwie-rodziny-pracy-i-polityki-spolecznej",
    title: "Spotkanie w Ministerstwie Rodziny, Pracy i Polityki Społecznej – 31.08",
    date: "2025-08-31",
    categories: ["Aktualności"],
    isArticle: false,
    image: "/images/news/spotkanie-w-ministerstwie-rodziny-pracy-i-polityki-spolecznej.jpg",
    excerpt:
      "Odbyło się spotkanie w Ministerstwie Rodziny, Pracy i Polityki Społecznej poświęcone potrzebom i zmianom w obszarze zatrudnienia wspomaganego oraz jego standaryzacji.",
    body: p(
      "W poniedziałek odbyło się spotkanie w Ministerstwie Rodziny, Pracy i Polityki Społecznej poświęcone potrzebom i zmianom w obszarze zatrudnienia wspomaganego oraz jego standaryzacji. Panią Minister reprezentował dr Krzysztof Czechowski, Dyrektor Biura Pełnomocnika Rządu ds. Osób Niepełnosprawnych.",
    ),
  },
  {
    slug: "szkolenie-ai-w-ipr-w-wtz-w-chojnowie",
    title:
      "Szkolenie „AI w IPR – czyli jak skutecznie i efektywnie tworzyć IPR w oparciu o narzędzia sztucznej inteligencji” – 1-2.09",
    date: "2025-09-02",
    categories: ["Aktualności"],
    isArticle: false,
    image: "/images/news/szkolenie-ai-w-ipr-w-wtz-w-chojnowie.jpeg",
    excerpt:
      "Za nami dwa dni intensywnego szkolenia w WTZ Chojnów o tematyce wykorzystania sztucznej inteligencji w tworzeniu indywidualnych programów rehabilitacji.",
    body: p(
      "Za nami dwa dni intensywnego szkolenia w WTZ Chojnów o tematyce „AI w IPR – czyli jak skutecznie i efektywnie tworzyć IPR w oparciu o narzędzia sztucznej inteligencji”. Sztuczna inteligencja coraz śmielej wchodzi do pracy z osobami z niepełnosprawnościami.",
    ),
  },
  {
    slug: "szkolenie-wtz-w-dobrych-rekach-w-opatowie",
    title: "Szkolenie „WTZ w dobrych rękach” w Opatowie: 27-28.08",
    date: "2025-08-28",
    categories: ["Aktualności"],
    isArticle: false,
    image: "/images/news/szkolenie-wtz-w-dobrych-rekach-w-opatowie.jpeg",
    excerpt:
      "27 i 28 sierpnia w Hotelu Miodowy Młyn w Opatowie prowadziliśmy szkolenie dla 21 przedstawicieli warsztatów terapii zajęciowej z województwa świętokrzyskiego i lubelskiego.",
    body: p(
      "27 i 28 sierpnia w Hotelu Miodowy Młyn w Opatowie prowadziliśmy szkolenie w ramach projektu „WTZ w dobrych rękach”. Wzięło w nim udział 21 przedstawicieli warsztatów terapii zajęciowej z województwa świętokrzyskiego i lubelskiego. Dwa dni pracy, jeden cel: lepsza jakość wsparcia uczestników WTZ.",
    ),
  },
  {
    slug: "sukcesy-w-inspiratorium-wspolpracy",
    title: "Sukcesy w Inspiratorium Współpracy",
    date: "2025-08-25",
    categories: ["Aktualności"],
    isArticle: false,
    image: "/images/news/sukcesy-w-inspiratorium-wspolpracy.jpeg",
    excerpt:
      "Świętujemy sukces uczestnika projektu Inspiratorium Współpracy! Po kilku latach przerwy w zatrudnieniu Pan Karol powrócił na rynek pracy.",
    body: p(
      "Świętujemy sukces uczestnika projektu Inspiratorium Współpracy! Po kilku latach przerwy w zatrudnieniu Pan Karol powrócił na rynek pracy, rozpoczynając pracę w Dino w Wierzchucinie. Pierwsze dni pracy spędziła z nim nasza Trenerka Pracy Ewa Wiśniewska.",
    ),
  },
  {
    slug: "wizyta-studyjna-wfosigw-w-gdansku",
    title: "Wizyta studyjna: Wojewódzki Fundusz Ochrony Środowiska i Gospodarki Wodnej w Gdańsku – 19.08",
    date: "2025-08-19",
    categories: ["Aktualności"],
    isArticle: false,
    image: "/images/news/wizyta-studyjna-wfosigw-w-gdansku.jpeg",
    excerpt:
      "W ramach projektu Inspiratorium Zawodowe odwiedziliśmy WFOŚiGW w Gdańsku, by przyjrzeć się z bliska pracy w instytucji zajmującej się ochroną środowiska.",
    body: p(
      "19 sierpnia w ramach projektu Inspiratorium Zawodowe odwiedziliśmy Wojewódzki Fundusz Ochrony Środowiska i Gospodarki Wodnej w Gdańsku. Dzięki uprzejmości Pani Małgorzaty Cięciel mogliśmy przyjrzeć się z bliska, jak wygląda praca w instytucji zajmującej się ochroną środowiska.",
    ),
  },
  {
    slug: "spotkanie-z-biznesem-label-poland",
    title: "Spotkanie z biznesem: Label Poland – 18.08",
    date: "2025-08-18",
    categories: ["Aktualności"],
    isArticle: false,
    image: "/images/news/spotkanie-z-biznesem-label-poland.jpeg",
    excerpt:
      "Gościliśmy przedstawicielkę firmy Label Poland Szkolenia Graficzne, specjalizującej się w szkoleniach z grafiki komputerowej i kompetencji cyfrowych.",
    body: p(
      "18 sierpnia gościliśmy w naszej Fundacji przedstawicielkę firmy Label Poland Szkolenia Graficzne – Panią Dorotę Konopacką. Firma specjalizuje się w szkoleniach z zakresu grafiki komputerowej i kompetencji cyfrowych, a wśród jej kursantów byli już uczestnicy naszych projektów.",
    ),
  },
  {
    slug: "wizyta-studyjna-urzad-miasta-w-gdansku",
    title: "Wizyta studyjna: Urząd Miasta w Gdańsku – 13.08",
    date: "2025-08-13",
    categories: ["Aktualności"],
    isArticle: false,
    image: "/images/news/wizyta-studyjna-urzad-miasta-w-gdansku.jpeg",
    excerpt:
      "Przedstawiciele naszej Fundacji wzięli udział w wizycie studyjnej w Urzędzie Miejskim w Gdańsku wraz z Urzędem Pracy, MOPR i PFRON.",
    body: p(
      "13 sierpnia przedstawiciele naszej Fundacji (projekt Inspiratorium Zawodowe) wzięli udział w wizycie studyjnej w Urzędzie Miejskim w Gdańsku. W spotkaniu uczestniczyli także przedstawiciele Urzędu Pracy, Miejskiego Ośrodka Pomocy Rodzinie w Gdańsku oraz PFRON.",
    ),
  },
  {
    slug: "1-miejsce-w-rankingu-czytelnikow-trojmiasto-pl",
    title: "1. miejsce w Rankingu Czytelników 2026 portalu trójmiasto.pl!",
    date: "2025-08-05",
    categories: ["Aktualności"],
    isArticle: false,
    image: "/images/news/1-miejsce-w-rankingu-czytelnikow-trojmiasto-pl.jpg",
    excerpt:
      "Nasza Fundacja zajęła 1. miejsce w Rankingu Czytelników 2026 portalu trójmiasto.pl w kategorii „Fundacje i ośrodki”! Nasza aktualna ocena to 9.3!",
    body: p(
      "Z ogromną radością i dumą ogłaszamy, że nasza Fundacja zajęła 1. miejsce w Rankingu Czytelników 2026 portalu trójmiasto.pl w kategorii „Fundacje i ośrodki”! Nasza aktualna ocena to 9.3! To wyróżnienie jest dla nas tym cenniejsze, że liczby potwierdzają jakość naszej pracy.",
    ),
  },
  // ---- Evergreen articles (Baza wiedzy) ----
  {
    slug: "powrot-z-wakacji-powrot-do-pracy",
    title: "Powrót z wakacji, powrót do pracy – jak wyjść z letniego letargu?",
    date: "2025-09-01",
    categories: ["Artykuły"],
    isArticle: true,
    image: "/images/news/powrot-z-wakacji-powrot-do-pracy.jpg",
    excerpt:
      "Koniec wakacji dla wielu osób oznacza moment refleksji nad swoją sytuacją zawodową. Jak wrócić do aktywnego poszukiwania pracy?",
    body: p(
      "Koniec wakacji dla wielu osób oznacza nie tylko powrót do codziennych obowiązków, ale również moment refleksji nad swoją sytuacją zawodową. Procesy rekrutacyjne bywają rzadsze latem, a kandydaci często odkładają aktywne działania na okres jesieni. Warto wykorzystać ten moment na uporządkowanie celów zawodowych.",
    ),
  },
  {
    slug: "jak-zorganizowac-swoj-dzien-gdy-szukasz-pracy",
    title: "Jak zorganizować swój dzień, gdy szukasz pracy?",
    date: "2025-08-20",
    categories: ["Artykuły", "Aktualności"],
    isArticle: true,
    image: "/images/news/jak-zorganizowac-swoj-dzien-gdy-szukasz-pracy.svg",
    excerpt:
      "Poszukiwanie pracy to proces, który wymaga planowania, konsekwencji oraz umiejętnego zarządzania czasem. Warto potraktować je jak pełnoetatową pracę.",
    body: p(
      "Z jakimi czynnościami najczęściej kojarzy się poszukiwanie pracy? Zapewne wielu osobom z przeglądaniem ofert pracy i wysyłaniem CV. W praktyce jest to jednak proces, który wymaga nie tylko planowania, ale i konsekwentnego realizowania oraz umiejętnego zarządzania czasem. Dlatego warto potraktować szukanie zatrudnienia jak pełnoetatową pracę.",
    ),
  },
  {
    slug: "od-marzen-do-planu-realny-cel-zawodowy",
    title: "Od marzeń do planu – jak zamienić pomysł na realny cel zawodowy?",
    date: "2025-08-10",
    categories: ["Artykuły"],
    isArticle: true,
    image: "/images/news/od-marzen-do-planu-realny-cel-zawodowy.png",
    excerpt:
      "Każda zawodowa droga zaczyna się od marzenia. Marzenia pokazują kierunek, ale samo marzenie nie wystarczy, by osiągnąć sukces.",
    body: p(
      "Któż z nas nigdy nie marzył? O nowej pracy i zmianie kierunku zawodowego. Każda zawodowa droga zaczyna się od marzenia. Marzenia są ważne, ponieważ pokazują kierunek, w którym chcemy podążać. Jednak samo marzenie nie wystarczy, by osiągnąć sukces – potrzebny jest konkretny plan działania.",
    ),
  },
  {
    slug: "5-sposobow-jak-wykorzystac-ai-podczas-poszukiwania-pracy",
    title: "5 sposobów na to, jak wykorzystać AI podczas poszukiwania pracy",
    date: "2025-07-28",
    categories: ["Artykuły", "Rynek pracy"],
    isArticle: true,
    image: "/images/news/5-sposobow-jak-wykorzystac-ai-podczas-poszukiwania-pracy.png",
    excerpt:
      "Sztuczna inteligencja może pomóc w przygotowaniu dokumentów aplikacyjnych, analizie ofert pracy czy przygotowaniu się do rozmowy kwalifikacyjnej.",
    body: p(
      "Sztuczna inteligencja staje się coraz bardziej dostępna i znajduje zastosowanie w wielu obszarach życia, również podczas poszukiwania pracy. Odpowiednio wykorzystywana może pomóc w przygotowaniu dokumentów aplikacyjnych, analizie ofert pracy czy przygotowaniu do rozmowy. Warto pamiętać, że AI jest narzędziem wspierającym – nie zastąpi własnego doświadczenia i zaangażowania.",
    ),
  },
  {
    slug: "kompetencje-przyszlosci",
    title: "Kompetencje przyszłości – jakie umiejętności warto rozwijać już dziś?",
    date: "2025-07-15",
    categories: ["Artykuły", "Rynek pracy"],
    isArticle: true,
    image: "/images/news/kompetencje-przyszlosci.png",
    excerpt:
      "Automatyzacja, sztuczna inteligencja i transformacja cyfrowa powodują, że wiele zawodów ewoluuje. Które kompetencje warto rozwijać?",
    body: p(
      "Rynek pracy zmienia się szybciej niż kiedykolwiek wcześniej. Automatyzacja, sztuczna inteligencja, transformacja cyfrowa oraz zmiany potrzeb pracowników i pracodawców powodują, że wiele zawodów ewoluuje, a część kompetencji traci na znaczeniu. Jednocześnie rośnie zapotrzebowanie na umiejętności, które pozwalają odnaleźć się na obecnym rynku pracy.",
    ),
  },
];
