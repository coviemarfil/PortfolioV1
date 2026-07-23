import type { AnchorHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> { children: ReactNode; variant?: "primary" | "ghost"; }

export function Button({ children, className = "", variant = "primary", ...props }: ButtonProps) {
  const variantClass = variant === "primary" ? "border-foreground bg-foreground text-background hover:bg-foreground/85" : "border-border text-foreground hover:border-foreground/25 hover:bg-foreground/[0.04]";
  return <a className={`inline-flex min-h-11 items-center justify-center rounded-xl border px-5 py-3 text-[0.9375rem] font-medium transition hover:-translate-y-0.5 ${variantClass} ${className}`} {...props}>{children}</a>;
}
