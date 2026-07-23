"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, type MouseEvent } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const finishTransition = () => setIsTransitioning(false);
    window.addEventListener("portrait-transition-end", finishTransition);
    return () => window.removeEventListener("portrait-transition-end", finishTransition);
  }, []);
  if (!mounted) return <div className="h-10 w-[5.25rem]" aria-hidden="true" />;
  const isDark = resolvedTheme === "dark";
  const optionClass = (active: boolean) => `grid size-8 place-items-center rounded-full transition ${active ? "bg-foreground/5 text-foreground ring-1 ring-border" : "text-subtle hover:text-foreground"}`;
  const changeTheme = (theme: "light" | "dark", event: MouseEvent<HTMLButtonElement>) => {
    if (theme === resolvedTheme || isTransitioning) return;
    setIsTransitioning(true);
    window.dispatchEvent(new CustomEvent("portrait-theme-transition", { detail: { theme } }));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || prefersReducedMotion) {
      setTheme(theme);
      return;
    }

    const button = event.currentTarget.getBoundingClientRect();
    document.documentElement.style.setProperty("--theme-reveal-x", `${button.left + button.width / 2}px`);
    document.documentElement.style.setProperty("--theme-reveal-y", `${button.top + button.height / 2}px`);
    document.startViewTransition(() => setTheme(theme));
  };
  return <div className="inline-flex items-center rounded-full border border-border bg-surface p-1" role="group" aria-label="Color theme">
    <button type="button" onClick={(event) => changeTheme("light", event)} disabled={isTransitioning} aria-label="Use light mode" aria-pressed={!isDark} className={optionClass(!isDark)}><Sun className="size-4 stroke-[1.5]" aria-hidden="true" /></button>
    <button type="button" onClick={(event) => changeTheme("dark", event)} disabled={isTransitioning} aria-label="Use dark mode" aria-pressed={isDark} className={optionClass(isDark)}><Moon className="size-4 stroke-[1.5]" aria-hidden="true" /></button>
  </div>;
}
