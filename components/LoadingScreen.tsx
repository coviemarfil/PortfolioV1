"use client";

import { useTransitionMedia } from "./TransitionMedia";

export function LoadingScreen() {
  const { isLoaded } = useTransitionMedia();

  return <div className={`fixed inset-0 z-[100] grid place-items-center bg-background px-6 transition-opacity duration-500 ${isLoaded ? "pointer-events-none opacity-0" : "opacity-100"}`} aria-hidden={isLoaded} aria-label="Loading portfolio" role="status">
    <div className="flex flex-col items-center text-center">
      <span className="font-mono text-xl font-medium tracking-[0.1em] text-foreground">Covie Marfil</span>
      <div className="mt-6 h-px w-40 overflow-hidden bg-border"><div className="h-full w-1/2 animate-loader bg-foreground" /></div>
      <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-subtle">Preparing portfolio</p>
    </div>
  </div>;
}
