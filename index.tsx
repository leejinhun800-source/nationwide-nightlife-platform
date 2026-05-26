import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Crown, MessageCircle, Phone, Search, ShieldCheck, Sparkles, Zap } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { JOBS, REGIONS, type RegionId } from "@/data/jobs";
import { JobCard } from "@/components/JobCard";
import { RegionFilter } from "@/components/RegionFilter";

const SITE_TITLE = "폭스알바 · 전국 밤알바 1위 | 평택·일산·수원·천안·청주";
const SITE_DESC =
  "전국 밤알바 구인구직 No.1 폭스알바. 평택, 고덕, 송탄, 일산, 수원, 천안, 청주 지역 텐프로·룸·라운지·호빠 고소득 알바 정보. 카카오톡·전화 24시간 무료 상담.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESC },
      {
        name: "keywords",
        content:
          "밤알바, 폭스알바, 전국 밤알바, 평택 밤알바, 고덕 밤알바, 송탄 밤알바, 일산 밤알바, 수원 밤알바, 천안 밤알바, 청주 밤알바, 텐프로, 룸알바, 노래주점, 고소득알바",
      },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ko_KR" },
      { property: "og:image", content: heroImg },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "폭스알바",
          alternateName: "FoxAlba",
          url: "/",
          inLanguage: "ko-KR",
          description: SITE_DESC,
          areaServed: REGIONS.filter((r) => r.id !== "all").map((r) => ({
            "@type": "City",
            name: r.name,
            alternateName: r.en,
          })),
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [region, setRegion] = useState<RegionId>("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: JOBS.length };
    for (const j of JOBS) c[j.region] = (c[j.region] ?? 0) + 1;
    return c;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return JOBS.filter((j) => {
      const r = region === "all" || j.region === region;
      if (!r) return false;
      if (!q) return true;
      return (
        j.title.toLowerCase().includes(q) ||
        j.venue.toLowerCase().includes(q) ||
        j.regionName.includes(q) ||
        j.type.toLowerCase().includes(q)
      );
    });
  }, [region, query]);

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold-gradient text-primary-foreground">
              <Crown className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <div className="font-display text-base font-bold text-gold-gradient">FOX ALBA</div>
              <div className="text-[10px] tracking-widest text-muted-foreground">전국 밤알바 1위</div>
            </div>
          </a>
          <a
            href="https://open.kakao.com/o/foxalba"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-kakao px-3.5 py-1.5 text-xs font-bold text-[#3a1d1d]"
          >
            <MessageCircle className="h-3.5 w-3.5" /> 24시 상담
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="전국 밤알바 럭셔리 라운지"
            width={1920}
            height={1024}
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-card/60 px-3 py-1 text-xs text-primary backdrop-blur">
            <Sparkles className="h-3 w-3" /> 전국 7대 핵심지역 실시간 구인
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-foreground sm:text-6xl">
            <span className="text-gold-gradient">전국 밤알바</span>
            <br />
            검증된 매장만 모았다
          </h1>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
            평택 · 고덕 · 송탄 · 일산 · 수원 · 천안 · 청주.
            마담이 직접 검증한 고소득 매장만 소개합니다. 24시간 무료 상담.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href="https://open.kakao.com/o/foxalba"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-kakao px-5 py-3 text-sm font-bold text-[#3a1d1d] shadow-gold transition-transform hover:scale-[1.02]"
            >
              <MessageCircle className="h-4 w-4" /> 카카오톡 상담하기
            </a>
            <a
              href="tel:1800-0000"
              className="inline-flex items-center gap-2 rounded-xl bg-gold-gradient px-5 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              <Phone className="h-4 w-4" /> 1800-0000
            </a>
          </div>

          <dl className="mt-10 grid max-w-2xl grid-cols-3 gap-3 text-center">
            {[
              { icon: ShieldCheck, label: "검증매장", value: "100%" },
              { icon: Zap, label: "당일출근", value: "OK" },
              { icon: Crown, label: "최고일당", value: "100만+" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-card/60 p-4 backdrop-blur"
              >
                <s.icon className="mx-auto h-4 w-4 text-primary" />
                <dt className="mt-1 text-[10px] tracking-widest text-muted-foreground">{s.label}</dt>
                <dd className="font-display text-lg font-bold text-gold-gradient">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Filters + listings */}
      <main className="mx-auto max-w-6xl px-4 pt-2">
        <section aria-labelledby="region-heading" className="mt-6">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 id="region-heading" className="font-display text-xl font-bold sm:text-2xl">
                지역별 채용공고
              </h2>
              <p className="text-xs text-muted-foreground">실시간 업데이트 · {JOBS.length}건</p>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <RegionFilter active={region} onChange={setRegion} counts={counts} />
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="매장명, 업종, 지역 검색..."
                className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                aria-label="채용공고 검색"
              />
            </label>
          </div>
        </section>

        <section aria-label="채용공고 목록" className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </section>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-2xl border border-border bg-card p-10 text-center">
            <p className="font-display text-lg">검색 결과가 없습니다</p>
            <p className="mt-1 text-sm text-muted-foreground">다른 지역이나 키워드로 검색해보세요.</p>
          </div>
        )}

        {/* Region SEO links */}
        <section className="mt-14 rounded-2xl border border-border bg-card/60 p-6">
          <h2 className="font-display text-lg font-bold">전국 지역별 밤알바</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            폭스알바는 강남에만 국한되지 않은 전국구 밤알바 플랫폼입니다.
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
            {REGIONS.filter((r) => r.id !== "all").map((r) => (
              <li key={r.id}>
                <button
                  onClick={() => setRegion(r.id)}
                  className="w-full rounded-lg border border-border bg-secondary/40 px-3 py-2 text-left text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  {r.name} 밤알바 <span className="text-xs text-muted-foreground">({counts[r.id] ?? 0})</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="mx-auto mt-16 max-w-6xl border-t border-border px-4 pt-8 text-center">
        <div className="text-gold-gradient font-display text-lg font-bold">FOX ALBA</div>
        <p className="mt-2 text-xs text-muted-foreground">
          © {new Date().getFullYear()} 폭스알바. 19세 미만 이용 불가. 본 사이트는 성인 구인구직 정보 제공 플랫폼입니다.
        </p>
        <p className="mt-1 text-[10px] text-muted-foreground/70">
          평택 · 고덕 · 송탄 · 일산 · 수원 · 천안 · 청주 외 전국 주요 지역 서비스 중
        </p>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-xl sm:hidden">
        <div className="grid grid-cols-2 gap-2">
          <a
            href="https://open.kakao.com/o/foxalba"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-kakao py-3 text-sm font-bold text-[#3a1d1d]"
          >
            <MessageCircle className="h-4 w-4" /> 카톡상담
          </a>
          <a
            href="tel:18000000"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gold-gradient py-3 text-sm font-bold text-primary-foreground"
          >
            <Phone className="h-4 w-4" /> 전화상담
          </a>
        </div>
      </div>
    </div>
  );
}
