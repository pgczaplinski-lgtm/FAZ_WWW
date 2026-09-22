import type { Stat } from "../../lib/content/types.ts";

export function StatsStrip({
  groups,
}: {
  groups: { period: string; stats: Stat[] }[];
}) {
  const columns = groups[0]?.stats.length ?? 0;

  return (
    <div className="mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
      {groups.map((group) => (
        <div
          key={group.period}
          className="grid grid-cols-2 items-baseline gap-x-4 gap-y-1 px-5 py-2.5 sm:gap-x-0 sm:px-8 sm:py-3 sm:[grid-template-columns:minmax(11rem,max-content)_repeat(var(--stat-cols),minmax(0,1fr))]"
          style={{ ["--stat-cols" as string]: columns }}
        >
          <h3 className="col-span-2 text-sm font-semibold tracking-wide text-brand sm:col-span-1">
            {group.period}:
          </h3>
          {group.stats.map((stat) => (
            <p key={stat.label} className="min-w-0 sm:pl-4">
              <span className="inline-block min-w-[2.5ch] text-lg font-extrabold tabular-nums text-brand sm:text-xl">
                {stat.value}
              </span>
              <span className="ml-1.5 text-xs text-muted sm:text-sm">{stat.label}</span>
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
