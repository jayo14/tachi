import TachiMark from "@/components/TachiMark";
import { ArrowUpRight, ChevronLeft, FileText, ShieldCheck, Sparkles } from "lucide-react";
import { Link, useLocation } from "wouter";

const pages: Record<string, { eyebrow: string; title: string; body: string; points: string[] }> = {
  "/pricing": { eyebrow: "Plans", title: "Scale on signal, not surprises.", body: "Tachi pricing is designed around transparent, measurable web work. Begin with a small surface area and move into higher-volume crawling when your workflows prove out.", points: ["A generous starting tier for testing deterministic extraction", "Clear usage signals for pages processed and fields emitted", "Controls for team access, privacy, and data retention"] },
  "/docs": { eyebrow: "Developers", title: "Build on a visible execution model.", body: "Use Tachi to submit a target, select a deterministic mode, inspect every result, and integrate structured outputs where your stack needs them.", points: ["Create a project and configure a target surface", "Run extraction or crawl jobs with predictable states", "Inspect structural evidence before using an output"] },
  "/changelog": { eyebrow: "Changelog", title: "A record of deliberate progress.", body: "Tachi records product changes with the same clarity it brings to extraction. Follow new workflow capabilities, interface improvements, and stability work here.", points: ["Extraction diagnostics refinements", "Project workspace usability updates", "Transparent run state improvements"] },
  "/blog": { eyebrow: "Field notes", title: "Notes from the structured web.", body: "Practical essays for teams building reliable web data workflows: rendering, DOM semantics, extraction confidence, and operational design.", points: ["Why deterministic extraction is a product decision", "How to think about web page structure", "Building a debuggable crawler workflow"] },
  "/about": { eyebrow: "About Tachi", title: "Web intelligence without the black box.", body: "Tachi exists for developers who need web data they can reason about. The product emphasizes deterministic techniques, inspectable evidence, and clear system boundaries.", points: ["Predictability before novelty", "Clear controls before clever defaults", "Developer experience as infrastructure"] },
  "/security": { eyebrow: "Security", title: "Data boundaries that stay visible.", body: "Tachi is designed around discrete projects, explicit targets, and inspectable run records so teams can understand where their web data comes from and how it moved.", points: ["Project-scoped operational records", "Traceable deterministic extraction evidence", "Clear status, error, and completion states"] },
  "/contact": { eyebrow: "Contact", title: "Bring a difficult web workflow.", body: "Talk through your crawling, extraction, or documentation pipeline. We will help clarify the surface area and the operational model before you automate it.", points: ["Developer data workflows", "Large and changing documentation sites", "Structured web intelligence pipelines"] },
};

export default function MarketingPage() {
  const [location] = useLocation();
  const page = pages[location] ?? pages["/about"];
  const Icon = location === "/security" ? ShieldCheck : location === "/docs" ? FileText : Sparkles;
  return (
    <div className="min-h-screen bg-background text-foreground tachi-noise">
      <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <TachiMark />
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"><ChevronLeft size={16} /> Back to home</Link>
      </header>
      <main className="mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <div className="mb-7 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.18em] text-primary"><span className="h-px w-9 bg-primary" />{page.eyebrow}</div>
            <h1 className="max-w-3xl text-5xl font-extrabold leading-[.97] tracking-[-.065em] sm:text-6xl lg:text-7xl">{page.title}</h1>
          </div>
          <p className="max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">{page.body}</p>
        </div>
        <section className="mt-20 grid border-y border-border lg:grid-cols-3">
          {page.points.map((point, index) => <article key={point} className="group min-h-56 border-border p-7 first:border-b last:border-t lg:border-b-0 lg:border-l lg:first:border-l-0 lg:last:border-t-0">
            <div className="mb-14 flex items-center justify-between font-mono text-xs text-primary/70"><span>0{index + 1}</span><Icon size={18} strokeWidth={1.4} /></div>
            <h2 className="max-w-xs text-lg font-bold leading-7 tracking-[-.025em]">{point}</h2>
          </article>)}
        </section>
        <div className="mt-14 flex flex-wrap items-center gap-4">
          <Link href="/app" className="inline-flex items-center gap-3 bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform duration-150 hover:-translate-y-0.5 active:scale-[.97]">Open Tachi workspace <ArrowUpRight size={17} /></Link>
          <Link href="/docs" className="inline-flex items-center gap-3 border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/60 hover:bg-primary/5">Read developer docs</Link>
        </div>
      </main>
    </div>
  );
}
