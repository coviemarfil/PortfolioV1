interface SectionHeadingProps { id?: string; label: string; title: string; description?: string; }

export function SectionHeading({ id, label, title, description }: SectionHeadingProps) {
  return <div id={id} className="animate-fade-up scroll-mt-24 lg:scroll-mt-4">
    <p className="mb-6 font-mono text-xs font-medium uppercase tracking-[0.12em] text-subtle">{label}</p>
    <h2 className="text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl">{title}</h2>
    {description && <p className="mt-4 max-w-2xl text-base text-muted sm:text-[1.0625rem]">{description}</p>}
  </div>;
}
