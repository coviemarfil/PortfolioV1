"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { projects } from "@/lib/portfolio";
import { Card } from "./Card";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  const [activeScreenshots, setActiveScreenshots] = useState<Record<string, number>>({});
  const [openProject, setOpenProject] = useState<string | null>(null);
  const selectedProject = projects.find((project) => project.title === openProject);
  const selectedScreenshot = selectedProject ? activeScreenshots[selectedProject.title] ?? 0 : 0;

  const changeScreenshot = (title: string, total: number, direction: number) => {
    setActiveScreenshots((current) => ({
      ...current,
      [title]: ((current[title] ?? 0) + direction + total) % total,
    }));
  };

  return <>
    <section id="projects" className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
      <div className="mx-auto w-[min(100%-2rem,72rem)]">
        <SectionHeading id="projects-heading" label="03 / Projects" title="Selected work" description="Projects that demonstrate my frontend, API integration, database, and full-stack development skills." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const hasScreenshots = project.screenshots.length > 0;
            const activeScreenshot = activeScreenshots[project.title] ?? 0;
            const screenshot = project.screenshots[activeScreenshot];
            const openGallery = () => hasScreenshots && setOpenProject(project.title);

            return <Card key={project.title} className="flex h-full flex-col">
              {hasScreenshots && <div className="relative mb-5 overflow-hidden rounded-lg border border-border bg-background" style={{ height: "9rem" }}>
                <button type="button" onClick={openGallery} className="absolute inset-0 z-0 cursor-zoom-in" aria-label={`Open ${project.title} screenshot gallery`}>
                  <img src={screenshot} alt={`${project.title} screenshot ${activeScreenshot + 1} of ${project.screenshots.length}`} className="size-full object-contain" />
                </button>
                {project.screenshots.length > 1 && <>
                  <button type="button" onClick={() => changeScreenshot(project.title, project.screenshots.length, -1)} className="absolute left-2 top-1/2 z-10 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/95 text-foreground shadow-sm transition hover:bg-foreground hover:text-background" aria-label="Show previous screenshot"><ArrowLeft className="size-4" aria-hidden="true" /></button>
                  <button type="button" onClick={() => changeScreenshot(project.title, project.screenshots.length, 1)} className="absolute right-2 top-1/2 z-10 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/95 text-foreground shadow-sm transition hover:bg-foreground hover:text-background" aria-label="Show next screenshot"><ArrowRight className="size-4" aria-hidden="true" /></button>
                  <span className="absolute bottom-2 right-2 z-10 rounded-full bg-background/90 px-2 py-1 font-mono text-[0.625rem] text-subtle">{activeScreenshot + 1} / {project.screenshots.length}</span>
                </>}
              </div>}
              <div role={hasScreenshots ? "button" : undefined} tabIndex={hasScreenshots ? 0 : undefined} onClick={openGallery} onKeyDown={(event) => {
                if (hasScreenshots && (event.key === "Enter" || event.key === " ")) {
                  event.preventDefault();
                  openGallery();
                }
              }} className={hasScreenshots ? "flex flex-1 cursor-zoom-in flex-col rounded-md outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground" : "flex flex-1 flex-col"}>
                <span className="w-fit rounded-full border border-border px-2 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">{project.type}</span>
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em]">{project.title}</h3>
                <p className="mt-3 text-sm text-muted">{project.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">{project.tags.map((tag) => <li key={tag} className="rounded-md bg-foreground/[0.04] px-2 py-1 font-mono text-[0.6875rem] text-subtle">{tag}</li>)}</ul>
              </div>
              {project.links.length > 0 && <div className="mt-5 flex flex-wrap gap-4">{project.links.map((link) => <a key={link.label} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined} className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-foreground">{link.label}<ArrowUpRight className="size-4" aria-hidden="true" /></a>)}</div>}
            </Card>;
          })}
        </div>
      </div>
    </section>

    {selectedProject && <div className="fixed inset-0 z-[60] grid place-items-center bg-black/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`${selectedProject.title} screenshot gallery`} onClick={() => setOpenProject(null)}>
      <div className="relative flex max-h-[90vh] w-full max-w-6xl flex-col rounded-2xl border border-border bg-surface p-3 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between gap-4 px-1">
          <div><p className="font-mono text-xs uppercase tracking-[0.12em] text-subtle">Project gallery</p><h3 className="mt-1 text-lg font-semibold">{selectedProject.title}</h3></div>
          <button type="button" onClick={() => setOpenProject(null)} className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted transition hover:bg-foreground hover:text-background" aria-label="Close screenshot gallery"><X className="size-5" aria-hidden="true" /></button>
        </div>
        <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl bg-background">
          <img src={selectedProject.screenshots[selectedScreenshot]} alt={`${selectedProject.title} screenshot ${selectedScreenshot + 1} of ${selectedProject.screenshots.length}`} className="max-h-[72vh] w-full object-contain" />
          {selectedProject.screenshots.length > 1 && <>
            <button type="button" onClick={() => changeScreenshot(selectedProject.title, selectedProject.screenshots.length, -1)} className="absolute left-3 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/95 text-foreground shadow-lg transition hover:bg-foreground hover:text-background" aria-label="Show previous screenshot"><ArrowLeft className="size-5" aria-hidden="true" /></button>
            <button type="button" onClick={() => changeScreenshot(selectedProject.title, selectedProject.screenshots.length, 1)} className="absolute right-3 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/95 text-foreground shadow-lg transition hover:bg-foreground hover:text-background" aria-label="Show next screenshot"><ArrowRight className="size-5" aria-hidden="true" /></button>
            <span className="absolute bottom-3 right-3 rounded-full bg-background/90 px-3 py-1.5 font-mono text-xs text-subtle">{selectedScreenshot + 1} / {selectedProject.screenshots.length}</span>
          </>}
        </div>
      </div>
    </div>}
  </>;
}
