import TachiMark from "@/components/TachiMark";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { Activity, Box, ChevronLeft, FileSearch, FolderKanban, KeyRound, LogOut, Menu, Network, Settings2, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

const menuItems = [
  { icon: Box, label: "Overview", path: "/app" },
  { icon: FolderKanban, label: "Projects", path: "/app/projects" },
  { icon: FileSearch, label: "Extract", path: "/app/extract" },
  { icon: Network, label: "Crawl", path: "/app/crawl" },
  { icon: Activity, label: "Runs", path: "/app/jobs" },
  { icon: KeyRound, label: "Results", path: "/app/pages" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { loading, user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  if (loading) return <div className="grid min-h-screen place-items-center bg-background text-muted-foreground"><div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[.14em]"><span className="h-2 w-2 animate-pulse rounded-full bg-primary" /> Initializing workspace</div></div>;
  if (!user) return <div className="tachi-grid grid min-h-screen place-items-center bg-background px-5 text-foreground"><div className="w-full max-w-md border border-border bg-card p-7 text-center sm:p-9"><TachiMark /><div className="mx-auto mt-10 grid h-12 w-12 place-items-center border border-primary/35 bg-primary/5 text-primary"><KeyRound size={20} /></div><h1 className="mt-6 text-2xl font-extrabold tracking-[-.045em]">Enter the Tachi workspace.</h1><p className="mt-4 text-sm leading-6 text-muted-foreground">Sign in to create projects, record deterministic extraction runs, and inspect the result trail.</p><button onClick={() => startLogin()} className="mt-8 w-full bg-primary py-3 text-sm font-bold text-primary-foreground transition-transform active:scale-[.97]">Sign in to Tachi</button><Link href="/" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"><ChevronLeft size={16} /> Back to Tachi</Link></div></div>;

  return <div className="min-h-screen bg-background text-foreground lg:flex">
    <aside className={`fixed inset-y-0 left-0 z-50 flex w-[268px] flex-col border-r border-border bg-[#0d100e] transition-transform duration-200 lg:sticky lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex h-[76px] items-center justify-between border-b border-border px-5"><TachiMark href="/" /><button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center text-muted-foreground lg:hidden" aria-label="Close navigation"><X size={19} /></button></div>
      <div className="flex-1 p-4"><div className="mb-5 px-2 font-mono text-[10px] uppercase tracking-[.15em] text-muted-foreground">Workspace</div><nav className="space-y-1">{menuItems.map(item => { const active = location === item.path; return <Link key={item.path} href={item.path} onClick={() => setOpen(false)} className={`flex h-10 items-center gap-3 px-3 text-sm font-semibold transition-colors ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}><item.icon size={17} strokeWidth={1.7} /><span>{item.label}</span></Link> })}</nav><div className="mt-8 border-t border-border pt-6"><Link href="/app/settings" onClick={() => setOpen(false)} className="flex h-10 items-center gap-3 px-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"><Settings2 size={17} strokeWidth={1.7} />Settings</Link></div></div>
      <div className="border-t border-border p-4"><div className="flex items-center gap-3 px-2"><span className="grid h-8 w-8 place-items-center rounded-full border border-primary/30 bg-primary/10 text-xs font-bold text-primary">{user.name?.charAt(0).toUpperCase() || "T"}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{user.name || "Tachi operator"}</p><p className="truncate font-mono text-[10px] text-muted-foreground">{user.email || "signed-in workspace"}</p></div><button onClick={logout} className="grid h-8 w-8 place-items-center text-muted-foreground transition-colors hover:text-foreground" aria-label="Sign out"><LogOut size={16} /></button></div></div>
    </aside>
    {open && <button onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-black/65 lg:hidden" aria-label="Close navigation overlay" />}
    <section className="min-w-0 flex-1"><header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-border bg-background/85 px-5 backdrop-blur-xl sm:px-8"><div className="flex items-center gap-3"><button onClick={() => setOpen(true)} className="grid h-9 w-9 place-items-center border border-border text-muted-foreground lg:hidden" aria-label="Open navigation"><Menu size={18} /></button><div><p className="font-mono text-[10px] uppercase tracking-[.15em] text-primary">Tachi workspace</p><p className="mt-0.5 text-sm font-bold">Deterministic operations</p></div></div><Link href="/" className="hidden text-sm font-semibold text-muted-foreground hover:text-foreground sm:inline-flex">View site <ChevronLeft className="ml-1 rotate-180" size={15} /></Link></header><main className="p-5 sm:p-8 lg:p-10">{children}</main></section>
  </div>;
}
