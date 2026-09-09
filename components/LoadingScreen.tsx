"use client";

import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useTransitionMedia } from "./TransitionMedia";

export function LoadingScreen() {
  const { isLoaded } = useTransitionMedia();
  const [displayProgress, setDisplayProgress] = useState(0);
  const complete = isLoaded && displayProgress === 100;

  useEffect(() => {
    if (isLoaded) {
      setDisplayProgress(100);
      return;
    }
    if (displayProgress >= 99) return;

    const increment = displayProgress >= 85 && displayProgress % 3 === 0 ? 2 : 1;
    const delay = displayProgress >= 85 ? 120 : 65;
    const timer = window.setTimeout(() => setDisplayProgress((current) => Math.min(current + increment, 99)), delay);
    return () => window.clearTimeout(timer);
  }, [displayProgress, isLoaded]);

  return <div className={`fixed inset-0 z-[100] grid place-items-center bg-background transition-opacity duration-500 ${complete ? "pointer-events-none opacity-0" : "opacity-100"}`} aria-hidden={complete} aria-label="Loading" role="status">
    <div className="w-[min(100%-3rem,17rem)]">
      <div className="flex items-center justify-between font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
        <span className="inline-flex items-center gap-2 text-foreground"><LoaderCircle className="size-3.5 animate-spin" strokeWidth={1.5} aria-hidden="true" />Portfolio website</span>
        <span className="tabular-nums text-subtle">{displayProgress}%</span>
      </div>
      <div className="mt-3 h-px overflow-hidden bg-border" aria-label={`${displayProgress}% loaded`} aria-valuemax={100} aria-valuemin={0} aria-valuenow={displayProgress} role="progressbar">
        <div className="h-full bg-foreground transition-[width] duration-100 ease-linear" style={{ width: `${displayProgress}%` }} />
      </div>
      <p className="mt-3 text-xs text-subtle">Just a moment</p>
    </div>
  </div>;
}
