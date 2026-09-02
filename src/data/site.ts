export interface NavigationItem {
	label: string;
	href: string;
}

export interface Audience {
	title: string;
	description: string;
	href: string;
}

export interface Stat {
	value: string;
	label: string;
	source: string;
}

export interface MethodStage {
	title: string;
	description: string;
	outcomes?: string[];
}

export interface Project {
	title: string;
	href: string;
	summary: string;
	audience: string;
	location: string;
	period: string;
}

export interface Story {
	name: string;
	before: string;
	process: string;
	outcome: string;
	insight: string;
}

export interface Location {
	city: string;
	address: string;
	scope: string;
}

export interface Leader {
	name: string;
	role: string;
	expertise: string;
}

export const navigation: NavigationItem[] = [
	{ label: 'Start', href: '/' },
	{ label: 'Jak działamy', href: '/jak-dzialamy/' },
	{ label: 'Dla Ciebie', href: '/dla-ciebie/' },
	{ label: 'Projekty', href: '/projekty/' },
	{ label: 'Historie zmiany', href: '/historie-zmiany/' },
	{ label: 'Wiedza', href: '/wiedza/' },
	{ label: 'O Fundacji', href: '/o-fundacji/' },
	{ label: 'Kontakt', href: '/kontakt/' },
];

export const audiences: Audience[] = [
	{
		title: 'Szukam wsparcia',
		description: 'Chcesz znaleźć pracę lub świadomie wybrać kierunek zawodowy? Zobacz, jak możemy pracować razem.',
		href: '/dla-ciebie/',
	},
	{
		title: 'Reprezentuję WTZ lub instytucję',
		description: 'Wzmacniaj zespół praktyczną metodą, szkoleniami i narzędziami wypracowanymi w codziennej pracy.',
		href: '/dla-instytucji/',
	},
	{
		title: 'Jestem pracodawcą',
		description: 'Przygotuj dostępne miejsce pracy i poznaj kandydatów, których kompetencje mogą rozwijać Twój zespół.',
		href: '/dla-pracodawcow/',
	},
];

const foundationSource = 'Publikacje i strona Fundacji Aktywności Zawodowej; dane własne, nie audyt zewnętrzny.';

export const stats: Stat[] = [
	{ value: '60–83%', label: 'wskaźnik zatrudnienia w zakończonych projektach Fundacji', source: foundationSource },
	{ value: '435', label: 'osób zatrudnionych od 2008 roku', source: foundationSource },
	{ value: '161', label: 'zrealizowanych staży', source: foundationSource },
	{ value: '204', label: 'zrealizowane szkolenia', source: foundationSource },
	{ value: '643', label: 'osoby uczestniczące w działaniach', source: foundationSource },
	{ value: 'blisko 300', label: 'przeszkolonych placówek WTZ', source: foundationSource },
];

export const methodStages: MethodStage[] = [
	{
		title: 'Fundamenty',
		description: 'Poczucie zaufania, akceptacja zasobów i akceptacja deficytów pozwalają zobaczyć siebie uczciwie i bez lęku.',
		outcomes: ['Poczucie zaufania', 'Akceptacja zasobów', 'Akceptacja deficytów'],
	},
	{
		title: 'Proaktywność',
		description: 'Odpowiedzialność za uzgodnione działania i jasne kontrakty zamieniają wsparcie w samodzielne decyzje.',
	},
	{
		title: 'Rutyna',
		description: 'Długofalowe powtarzanie, jeden kierunek zawodowy, małe kroki i mikro-nagrody utrwalają doświadczenie.',
	},
	{
		title: 'Tożsamość zawodowa',
		description: 'Realne doświadczenie buduje motywację, poczucie własnej wartości i prawo do popełniania błędów.',
		outcomes: ['Motywacja', 'Poczucie własnej wartości', 'Prawo do błędu'],
	},
];

export const activeProjects: Project[] = [
	{
		title: 'Inspiratorium Zawodowe',
		href: '/projekty/inspiratorium-zawodowe/',
		summary: 'Wsparcie 480 osób, z celem zatrudnienia 60 osób każdego roku.',
		audience: 'Osoby z niepełnosprawnościami',
		location: 'woj. pomorskie i śląskie',
		period: '2024–2027',
	},
	{
		title: 'Inspiratorium Kariery III',
		href: '/projekty/inspiratorium-kariery-iii/',
		summary: 'Intensywne, indywidualne wsparcie trenera pracy na drodze do zatrudnienia.',
		audience: 'Osoby wymagające intensywnego wsparcia',
		location: 'Lokalizacje opisane na stronie projektu',
		period: '2025–2027',
	},
	{
		title: 'Inspiratorium Współpracy',
		href: '/projekty/inspiratorium-wspolpracy/',
		summary: 'Przygotowanie do rynku pracy, którego celem jest zatrudnienie co najmniej 55 osób.',
		audience: 'Uczestnicy projektu',
		location: 'Lokalizacje opisane na stronie projektu',
		period: '2026–2029',
	},
	{
		title: 'WTZ w dobrych rękach',
		href: '/projekty/wtz-w-dobrych-rekach/',
		summary: 'Program szkoleniowy, w którym udział wezmą 192 osoby.',
		audience: '192 osoby uczestniczące w szkoleniach',
		location: 'Lokalizacje opisane na stronie projektu',
		period: '2026–2027',
	},
	{
		title: 'Dyrektywa EAA',
		href: '/projekty/dyrektywa-eaa/',
		summary: 'Aktywny projekt Fundacji dotyczący Dyrektywy EAA.',
		audience: 'Odbiorcy wskazani na stronie projektu',
		location: 'Lokalizacje opisane na stronie projektu',
		period: 'projekt aktywny',
	},
	{
		title: 'Dostęp do wiedzy III',
		href: '/projekty/dostep-do-wiedzy-iii/',
		summary: 'Trzecia edycja aktywnego projektu „Dostęp do wiedzy”.',
		audience: 'Odbiorcy wskazani na stronie projektu',
		location: 'Lokalizacje opisane na stronie projektu',
		period: 'edycja III',
	},
];

export const stories: Story[] = [
	{
		name: 'Pan Jacek',
		before: 'Brak słuchu, mowy, czytania i pisania przesłaniał otoczeniu jego rzeczywiste możliwości zawodowe.',
		process: 'Diagnoza w realnym zadaniu ujawniła wyjątkową koncentrację, tempo i konsekwencję w pracach przy ceramice.',
		outcome: 'Pracuje od 2014 roku, a po jego zatrudnieniu produkcja zakładu wzrosła o około połowę.',
		insight: 'Dopiero diagnoza funkcjonalna pozwala zobaczyć zasoby, których nie pokazuje lista deficytów.',
	},
	{
		name: 'Pan Łukasz',
		before: 'Nie było jasne, w jakiej pracy jego możliwości staną się realnym atutem.',
		process: 'Podczas praktycznych zadań odkrył siłę i sprawność w czyszczeniu szkła.',
		outcome: 'Podjął pracę w 2018 roku i nadal pracuje.',
		insight: 'Dobrze dobrane zadanie ujawnia kompetencje, których nie pokaże sama rozmowa.',
	},
	{
		name: 'Pani Marta',
		before: 'Praca w tartaku była możliwa, ale przeszkodą pozostawał dojazd.',
		process: 'Zespół i otoczenie wspólnie wypracowali rozwiązanie bariery transportowej.',
		outcome: 'Rozwiązanie umożliwiło jej trwałe zatrudnienie.',
		insight: 'Czasem to otoczenie, a nie człowiek, musi zmienić sposób działania.',
	},
];

export const locations: Location[] = [
	{
		city: 'Gdańsk',
		address: 'ul. Romana Dmowskiego 12/3.12, 80-264 Gdańsk',
		scope: 'Siedziba Fundacji i kontakt z zespołem',
	},
	{
		city: 'Województwo pomorskie',
		address: 'działania projektowe w regionie',
		scope: 'Wsparcie osób, instytucji i pracodawców',
	},
	{
		city: 'Województwo śląskie',
		address: 'działania projektowe w regionie',
		scope: 'Wsparcie w ramach Inspiratorium Zawodowego',
	},
];

export const teamLeadership: Leader[] = [
	{
		name: 'Hanna Czaplińska',
		role: 'Wiceprezeska Fundacji',
		expertise: 'Na co dzień współkieruje pracą Fundacji.',
	},
	{
		name: 'Paweł Czapliński',
		role: 'Prezes Fundacji',
		expertise: 'Prawnik i socjolog, związany z sektorem od 2006 roku; ponad 9400 godzin pracy szkoleniowej.',
	},
	{
		name: 'Michał Czapiewski',
		role: 'Wiceprezes Fundacji',
		expertise: 'Trener pracy i doradca z ponad 18-letnim doświadczeniem; ponad 8600 godzin pracy szkoleniowej.',
	},
];
