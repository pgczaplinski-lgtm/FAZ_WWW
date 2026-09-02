export type ProjectStatus = 'active' | 'completed'

export type Project = {
  slug: string
  title: string
  lead: string
  audience: string
  area: string
  period?: string
  status: ProjectStatus
  criteria?: string
  support?: string[]
  steps?: string[]
}

export type NewsItem = {
  slug: string
  title: string
  lead: string
  date: string
}

export const projects: Project[] = [
  {
    slug: 'inspiratorium-zawodowe',
    title: 'Inspiratorium Zawodowe',
    lead: 'Towarzyszymy osobom z niepełnosprawnościami w drodze do zatrudnienia.',
    audience: 'Osoby z niepełnosprawnością bez zatrudnienia, w wieku produkcyjnym.',
    area: 'Województwa pomorskie i śląskie',
    period: '01.04.2024–31.03.2027',
    status: 'active',
    criteria: 'Rekrutacja ciągła. Projekt obejmie 480 osób i zakłada 60 zatrudnień rocznie.',
    support: ['doradztwo zawodowe', 'przygotowanie do podjęcia pracy', 'wsparcie na drodze do zatrudnienia'],
    steps: ['Napisz lub zadzwoń do nas.', 'Porozmawiamy o Twojej sytuacji i potrzebach.', 'Wspólnie wybierzemy kolejne kroki.'],
  },
  {
    slug: 'inspiratorium-kariery-iii',
    title: 'Inspiratorium Kariery III',
    lead: 'Wsparcie w aktywizacji zawodowej studentów i absolwentów z niepełnosprawnością.',
    audience: 'Studenci ostatniego roku oraz absolwenci do 5 lat z niepełnosprawnością.',
    area: 'Ogólnopolski',
    period: '01.01.2025–30.09.2027',
    status: 'active',
    criteria: 'Projekt wspiera aktywizację zawodową wskazanej grupy odbiorców.',
    support: ['aktywizacja zawodowa'],
    steps: ['Skontaktuj się z FAZ.', 'Opowiedz nam o swoich planach zawodowych.', 'Ustalimy możliwy zakres wsparcia.'],
  },
  {
    slug: 'inspiratorium-wspolpracy',
    title: 'Inspiratorium Współpracy',
    lead: 'Projekt łączy wsparcie osób z niepełnosprawnościami z potrzebami rynku pracy.',
    audience: 'Szczegółowe informacje o odbiorcach uzyskasz, kontaktując się z FAZ.',
    area: 'Brak potwierdzonej lokalizacji w opisie projektu',
    period: '01.03.2026–28.02.2029',
    status: 'active',
    criteria: 'Rekrutacja ciągła. Cel projektu to co najmniej 55 zatrudnionych i 48 staży.',
    support: ['aktywizacja zawodowa', 'staże'],
    steps: ['Napisz do nas lub zadzwoń.', 'Poznajemy Twoją sytuację.', 'Wspólnie planujemy dalsze działania.'],
  },
  {
    slug: 'wtz-w-dobrych-rekach',
    title: 'WTZ w dobrych rękach',
    lead: 'Rozwijamy wiedzę i kompetencje kadry warsztatów terapii zajęciowej.',
    audience: '192 uczestników kadry WTZ.',
    area: 'Brak potwierdzonej lokalizacji w opisie projektu',
    period: '01.01.2026–31.01.2027',
    status: 'active',
    criteria: 'Projekt skierowany do kadry warsztatów terapii zajęciowej.',
    support: ['wsparcie rozwoju kadry WTZ'],
  },
  {
    slug: 'dyrektywa-eaa-przystepnie-o-dostepnosci-cyfrowej',
    title: 'Dyrektywa EAA – przystępnie o dostępności cyfrowej',
    lead: 'Pomagamy przedsiębiorstwom lepiej rozumieć i wdrażać dostępność cyfrową.',
    audience: 'Pracownicy przedsiębiorstw.',
    area: 'Brak potwierdzonej lokalizacji w opisie projektu',
    status: 'active',
    criteria: 'Zakres obejmuje szkolenia i doradztwo dotyczące dostępności cyfrowej.',
    support: ['szkolenia', 'doradztwo'],
  },
  {
    slug: 'dostep-do-wiedzy-kluczem',
    title: 'Dostęp do wiedzy kluczem do zwiększenia Dostępności – edycja III',
    lead: 'Dzielimy się wiedzą o dostępności i projektowaniu uniwersalnym.',
    audience: 'Szczegółowe informacje o odbiorcach uzyskasz, kontaktując się z FAZ.',
    area: 'Brak potwierdzonej lokalizacji w opisie projektu',
    status: 'active',
    criteria: 'Zakres obejmuje szkolenia i doradztwo z dostępności i projektowania uniwersalnego.',
    support: ['szkolenia', 'doradztwo'],
  },
  { slug: 'inspiratorium-aktywnosci-zawodowej-plus', title: 'Inspiratorium aktywności zawodowej PLUS', lead: 'Zakończony projekt FAZ.', audience: 'Projekt historyczny.', area: '—', status: 'completed' },
  { slug: 'inspiratorium-kariery-ii', title: 'Inspiratorium kariery II', lead: 'Zakończony projekt FAZ.', audience: 'Projekt historyczny.', area: '—', status: 'completed' },
]

export const news: NewsItem[] = [
  { slug: 'ai-w-ipr', title: 'AI w IPR – jak skutecznie tworzyć IPR z pomocą sztucznej inteligencji', lead: 'Przyglądamy się możliwościom wykorzystania sztucznej inteligencji w tworzeniu indywidualnego planu rozwoju.', date: 'Aktualność FAZ' },
  { slug: 'wtz-w-dobrych-rekach-w-opatowie', title: 'WTZ w dobrych rękach w Opatowie', lead: 'Informujemy o działaniach projektu WTZ w dobrych rękach realizowanych w Opatowie.', date: 'Aktualność FAZ' },
  { slug: 'sukcesy-w-inspiratorium-wspolpracy', title: 'Sukcesy w Inspiratorium Współpracy', lead: 'Dzielimy się informacjami o sukcesach projektu Inspiratorium Współpracy.', date: 'Aktualność FAZ' },
  { slug: 'inspiratorium-kariery-iii-podsumowanie', title: 'Inspiratorium Kariery III – podsumowanie pierwszego etapu', lead: 'Podsumowujemy pierwszy etap projektu Inspiratorium Kariery III.', date: 'Aktualność FAZ' },
]

export const contact = {
  email: 'biuro@faz.org.pl',
  bankAccount: '18 1750 0012 0000 0000 3261 7678',
  offices: [
    { city: 'Gdańsk', address: 'ul. Romana Dmowskiego 12/3.12, 80-264 Gdańsk', phones: ['736 858 551', '791 002 412'], hours: 'pn–pt 8:00–16:00' },
    { city: 'Katowice', address: 'ul. Opolska 17 lok. 218, 40-084 Katowice', phones: ['737 303 140'], hours: 'pn–pt 7:30–15:30' },
  ],
  branches: ['Człuchów, ul. Zamkowa 15a/6', 'Olsztyn, ul. Marka Kotańskiego 1'],
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/fundacja_aktywnosci_zawodowej/' },
    { label: 'Facebook', href: 'https://www.facebook.com/FundacjaAktywnosciZawodowej/' },
    { label: 'LinkedIn', href: 'https://pl.linkedin.com/company/fundacja-aktywnosci-zawodowej' },
  ],
}

export const impact2024 = [
  { value: '127', label: 'zatrudnionych' },
  { value: '55', label: 'staży' },
  { value: '63', label: 'szkolenia' },
  { value: '240', label: 'uczestników' },
]

export const impactSince2008 = [
  { value: '435', label: 'zatrudnionych' },
  { value: '161', label: 'staży' },
  { value: '204', label: 'szkolenia' },
  { value: '643', label: 'uczestników' },
]

export const team = [
  { name: 'Paweł Czapliński', role: 'Prezes' },
  { name: 'Hania Czaplińska', role: 'Wiceprezeska' },
  { name: 'Michał Czapiewski', role: 'Wiceprezes' },
  { name: 'Supeł', role: 'Specjalista ds. dobrej atmosfery' },
]
