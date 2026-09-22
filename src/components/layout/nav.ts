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
  { label: "Działalność", to: "/dzialalnosc" },
  { label: "Baza wiedzy", to: "/baza-wiedzy" },
  { label: "Instytut", to: "https://instytut.faz.org.pl/", external: true },
  { label: "Kontakt", to: "/kontakt" },
];
