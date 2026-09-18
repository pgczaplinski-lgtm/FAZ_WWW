import type { Stat } from "../types.ts";

export const statGroups: { period: string; stats: Stat[] }[] = [
  {
    period: "W 2024",
    stats: [
      { value: "127", label: "zatrudnionych" },
      { value: "55", label: "staży" },
      { value: "63", label: "szkolenia" },
      { value: "240", label: "uczestników" },
    ],
  },
  {
    period: "od 2008",
    stats: [
      { value: "435", label: "zatrudnionych" },
      { value: "161", label: "staży" },
      { value: "204", label: "szkoleń" },
      { value: "643", label: "uczestników" },
    ],
  },
];
