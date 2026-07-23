import { socials } from "@/lib/portfolio";

export function Footer() { return <footer className="border-t border-border"><div className="mx-auto flex w-[min(100%-2rem,72rem)] flex-col gap-3 py-7 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Covie B. Marfil</p><div className="flex flex-wrap gap-4">{socials.map((social) => <a key={social.label} className="hover:text-foreground" href={social.href} target={social.external ? "_blank" : undefined} rel={social.external ? "noreferrer" : undefined}>{social.label}</a>)}</div></div></footer>; }
