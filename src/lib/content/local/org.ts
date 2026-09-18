import type { OrgInfo } from "../types.ts";

export const orgInfo: OrgInfo = {
  name: "Fundacja Aktywności Zawodowej",
  shortName: "FAZ",
  tagline: "Wspieramy w budowaniu tożsamości zawodowej poprzez inspiracje",
  krs: "0000314083",
  regon: "220679576",
  nip: "583 305 54 18",
  bankName: "BNP Paribas Bank Polska SA",
  bankAccount: "18 1750 0012 0000 0000 3261 7678",
  email: "biuro@faz.org.pl",
  phones: ["736 858 551", "730 840 050"],
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    linkedin: "https://www.linkedin.com/",
  },
  offices: [
    {
      city: "Gdańsk",
      address: "ul. Romana Dmowskiego 12/3.12, 80-264 Gdańsk",
      phones: ["736 858 551", "791 002 412"],
      email: "biuro@faz.org.pl",
      hours: "Zapraszamy od poniedziałku do piątku między 8:00 a 16:00.",
      kind: "main",
    },
    {
      city: "Katowice",
      address: "ul. Opolska 17 lok. 218, 40-084 Katowice",
      phones: ["737 303 140"],
      email: "katowice@faz.org.pl",
      hours: "Zapraszamy od poniedziałku do piątku między 7:30 a 15:30.",
      kind: "branch",
    },
    {
      city: "Filia Człuchów",
      address: "ul. Zamkowa 15a/6, 77-300 Człuchów",
      phones: [],
      email: "czluchow@faz.org.pl",
      kind: "branch",
    },
    {
      city: "Filia Olsztyn",
      address: "ul. Marka Kotańskiego 1, 10-166 Olsztyn",
      phones: [],
      email: "olsztyn@faz.org.pl",
      kind: "branch",
    },
  ],
};
