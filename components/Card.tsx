import type { ReactNode } from "react";

interface CardProps { children: ReactNode; className?: string; }

export function Card({ children, className = "" }: CardProps) {
  return <article className={`rounded-xl border border-border bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-2xl hover:shadow-black/15 ${className}`}>{children}</article>;
}
