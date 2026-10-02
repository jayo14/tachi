import { Link } from "wouter";

export default function TachiMark({ href = "/", compact = false }: { href?: string; compact?: boolean }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2.5 group" aria-label="Tachi home">
      <span className="relative grid h-8 w-8 place-items-center border border-primary/75 bg-primary/[.08] text-primary transition-transform duration-150 group-hover:-rotate-6 group-active:scale-95">
        <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" aria-hidden="true">
          <path d="M6 8h9v8h11" stroke="currentColor" strokeWidth="1.65" strokeLinecap="square" />
          <path d="M15 16v8h8" stroke="currentColor" strokeWidth="1.65" strokeLinecap="square" />
          <circle cx="6" cy="8" r="2.15" fill="currentColor" />
          <circle cx="26" cy="16" r="2.15" fill="currentColor" />
          <circle cx="23" cy="24" r="2.15" fill="currentColor" />
        </svg>
      </span>
      {!compact && <span className="text-[17px] font-extrabold tracking-[-0.045em] text-foreground">tachi</span>}
    </Link>
  );
}
