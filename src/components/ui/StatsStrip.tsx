import type { Stat } from "../../lib/content/types.ts";

export function StatsStrip({
  groups,
}: {
  groups: { period: string; stats: Stat[] }[];
}) {
  return (
    <div className="mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
      {groups.map((group) => (
        <div
          key={group.period}
          className="grid items-baseline gap-2 px-5 py-2.5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6 sm:px-8 sm:py-3"
        >
          <h3 className="text-sm font-semibold tracking-wide text-brand">{group.period}:</h3>
          <div className="flex flex-wrap gap-x-6 gap-y-1 sm:gap-x-8">
            {group.stats.map((stat) => (
              <p key={stat.label} className="min-w-0">
                <span className="text-lg font-extrabold tabular-nums text-brand sm:text-xl">{stat.value}</span>
                <span className="ml-1.5 text-xs text-muted sm:text-sm">{stat.label}</span>
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
