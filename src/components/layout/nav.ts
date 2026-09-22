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
  { label: "O nas", to: "/o-nas" },
  {
    label: "Działalność",
    to: "/dzialalnosc",
    children: [
      { label: "Wszystkie informacje", to: "/dzialalnosc" },
      { label: "Projekty aktualne", to: "/dzialalnosc#projekty-aktualne" },
      { label: "Projekty zrealizowane", to: "/dzialalnosc#projekty-zrealizowane" },
      { label: "Aktualności", to: "/dzialalnosc#aktualnosci" },
    ],
  },
  { label: "Baza wiedzy", to: "/baza-wiedzy" },
  { label: "Instytut", to: "https://instytut.faz.org.pl/", external: true },
  { label: "Kontakt", to: "/kontakt" },
];
