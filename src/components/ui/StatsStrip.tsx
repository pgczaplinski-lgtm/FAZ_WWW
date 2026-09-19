import type { Stat } from "../../lib/content/types.ts";

export function StatsStrip({
  groups,
}: {
  groups: { period: string; stats: Stat[] }[];
}) {
  return (
    <div className="mt-8 divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
      {groups.map((group) => (
        <div
          key={group.period}
          className="grid items-center gap-4 px-5 py-5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8 sm:px-8 sm:py-6"
        >
          <h3 className="text-sm font-semibold tracking-wide text-brand">{group.period}:</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4 sm:gap-6">
            {group.stats.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <p className="text-2xl font-extrabold tabular-nums leading-none text-brand sm:text-[1.75rem]">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
