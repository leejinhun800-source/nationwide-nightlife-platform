import { MessageCircle, Phone, Clock, MapPin, Sparkles } from "lucide-react";
import type { Job } from "@/data/jobs";

const badgeStyles: Record<string, string> = {
  VIP: "bg-gold-gradient text-primary-foreground",
  신규: "bg-accent text-accent-foreground",
  추천: "bg-primary/20 text-primary border border-primary/40",
  긴급: "bg-destructive text-destructive-foreground animate-pulse",
};

export function JobCard({ job }: { job: Job }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/60 hover:shadow-gold">
      <div className="absolute inset-x-0 top-0 h-px bg-gold-gradient opacity-60" />

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span className="font-medium text-foreground">{job.regionName}</span>
            <span aria-hidden>·</span>
            <span>{job.type}</span>
          </div>
          {job.badge && (
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider ${
                badgeStyles[job.badge] ?? "bg-secondary"
              }`}
            >
              {job.badge}
            </span>
          )}
        </div>

        <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-foreground sm:text-xl">
          {job.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{job.venue}</p>

        <div className="mt-4 flex items-baseline gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-gold-gradient font-display text-2xl font-bold">{job.pay}</span>
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>{job.hours}</span>
        </div>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {job.perks.map((p) => (
            <li
              key={p}
              className="rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-[11px] text-muted-foreground"
            >
              #{p}
            </li>
          ))}
        </ul>

        <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">{job.description}</p>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <a
            href={`https://open.kakao.com/o/${job.kakao}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-kakao px-3 py-3 text-sm font-bold text-[#3a1d1d] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            aria-label={`${job.venue} 카카오톡 상담`}
          >
            <MessageCircle className="h-4 w-4" />
            카카오 상담
          </a>
          <a
            href={`tel:${job.phone.replace(/-/g, "")}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gold-gradient px-3 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
            aria-label={`${job.venue} 전화 문의`}
          >
            <Phone className="h-4 w-4" />
            전화 문의
          </a>
        </div>
      </div>
    </article>
  );
}
