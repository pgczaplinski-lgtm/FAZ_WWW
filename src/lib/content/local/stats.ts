import type { Stat } from "../types.ts";

export const statGroups: { period: string; stats: Stat[] }[] = [
  {
    period: "W bieżącym roku",
    stats: [
      { value: "127", label: "zatrudnionych" },
      { value: "55", label: "staży" },
      { value: "63", label: "szkolenia" },
      { value: "240", label: "uczestników" },
      { value: "2", label: "startupów" },
    ],
  },
  {
    period: "Od 2008 roku",
    stats: [
      { value: "435", label: "zatrudnionych" },
      { value: "161", label: "staży" },
      { value: "204", label: "szkoleń" },
      { value: "643", label: "uczestników" },
      { value: "11", label: "startupów" },
    ],
  },
];
