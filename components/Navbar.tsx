"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navigation } from "@/lib/portfolio";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const links = navigation.map((label) => ({ label, href: `#${label.toLowerCase()}-heading` }));
  const navLinks = (onNavigate?: () => void) => links.map((link) => <a key={link.href} href={link.href} onClick={(event) => {
    event.preventDefault();
    const target = document.getElementById(link.href.slice(1));
    if (target) {
      const offset = window.innerWidth >= 1024 ? 16 : 88;
      window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset), behavior: "smooth" });
      window.history.replaceState(null, "", link.href);
    }
    onNavigate?.();
  }} className="rounded-xl px-3 py-2.5 text-sm text-muted transition hover:bg-foreground/[0.05] hover:text-foreground">{link.label}</a>);

  return <>
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-72 flex-col border-r border-border bg-background px-7 py-8 lg:flex">
      <a href="#hero" className="font-mono text-base font-medium tracking-[0.06em]">CBM</a>
      <nav className="mt-12 flex flex-col gap-1" aria-label="Main navigation">{navLinks()}</nav>
      <div className="mt-auto border-t border-border pt-6">
        <ThemeToggle />
        <p className="mt-6 text-sm leading-6 text-muted">For work, opportunities, and everything else, reach me at</p>
        <a href="mailto:coviemarfil1@gmail.com" className="mt-2 inline-flex text-sm font-medium hover:text-muted">coviemarfil1@gmail.com</a>
      </div>
    </aside>

    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md lg:hidden">
    <div className="mx-auto flex h-[4.5rem] w-[min(100%-2rem,72rem)] items-center">
      <a href="#hero" className="inline-flex min-h-11 items-center font-mono text-sm font-medium tracking-[0.06em]">CBM</a>
      <div className="ml-auto flex items-center gap-2"><ThemeToggle /><button type="button" className="grid size-11 place-items-center" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation">{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button></div>
    </div>
    </header>
    <nav id="mobile-navigation" aria-label="Mobile navigation" className={`fixed inset-x-0 bottom-0 top-[4.5rem] z-40 isolate overflow-y-auto bg-background !opacity-100 p-6 shadow-2xl shadow-black/20 transition-transform duration-300 lg:hidden before:absolute before:inset-0 before:-z-10 before:bg-background ${open ? "translate-x-0" : "translate-x-full"}`}>
      <div className="relative z-10 flex flex-col gap-1">{navLinks(() => setOpen(false))}</div>
    </nav>
  </>;
}
