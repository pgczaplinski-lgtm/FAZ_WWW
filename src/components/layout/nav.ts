export interface NavChild {
  label: string;
  to: string;
}

export interface NavItem {
  label: string;
  to: string;
  external?: boolean;
  children?: NavChild[];
}

export const navItems: NavItem[] = [
  {
    label: "O nas",
    to: "/o-nas",
    children: [
      { label: "O nas", to: "/o-nas" },
      { label: "Zespół", to: "/zespol" },
      { label: "Historia", to: "/historia" },
      { label: "Statut fundacji", to: "/statut-fundacji" },
      { label: "Sprawozdania", to: "/sprawozdania" },
      { label: "Deklaracja różnorodności", to: "/deklaracja-roznorodnosci" },
      { label: "Deklaracja dostępności", to: "/deklaracja-dostepnosci" },
      { label: "Dołącz do nas", to: "/dolacz-do-nas" },
    ],
  },
  {
    label: "Działalność",
    to: "/projekty",
    children: [
      { label: "Projekty", to: "/projekty" },
      { label: "Aktualności", to: "/aktualnosci" },
    ],
  },
  { label: "Baza wiedzy", to: "/baza-wiedzy" },
  { label: "Instytut", to: "https://instytut.faz.org.pl/", external: true },
  { label: "Kontakt", to: "/kontakt" },
];
