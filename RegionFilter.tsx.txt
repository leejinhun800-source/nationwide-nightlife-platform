import { REGIONS, type RegionId } from "@/data/jobs";

export function RegionFilter({
  active,
  onChange,
  counts,
}: {
  active: RegionId;
  onChange: (id: RegionId) => void;
  counts: Record<string, number>;
}) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <ul className="flex gap-2 sm:flex-wrap">
        {REGIONS.map((r) => {
          const isActive = active === r.id;
          const count = r.id === "all" ? counts.all : counts[r.id] ?? 0;
          return (
            <li key={r.id} className="shrink-0">
              <button
                type="button"
                onClick={() => onChange(r.id)}
                aria-pressed={isActive}
                className={`group inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "border-transparent bg-gold-gradient text-primary-foreground shadow-gold"
                    : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                <span>{r.name}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    isActive ? "bg-background/20 text-primary-foreground" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
