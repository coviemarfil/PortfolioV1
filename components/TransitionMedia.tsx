"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type ThemeName = "light" | "dark";
type Readiness = Record<ThemeName, boolean>;

const TransitionMediaContext = createContext<{
  canPlay: Readiness;
  isLoaded: boolean;
  markLoaded: (theme: ThemeName) => void;
  markPlayable: (theme: ThemeName) => void;
  markFailed: (theme: ThemeName) => void;
} | null>(null);

export function TransitionMediaProvider({ children }: { children: ReactNode }) {
  const [canPlay, setCanPlay] = useState<Readiness>({ light: false, dark: false });
  const [settled, setSettled] = useState<Readiness>({ light: false, dark: false });

  const markLoaded = useCallback((theme: ThemeName) => {
    setSettled((current) => ({ ...current, [theme]: true }));
  }, []);
  const markPlayable = useCallback((theme: ThemeName) => {
    setCanPlay((current) => ({ ...current, [theme]: true }));
    setSettled((current) => ({ ...current, [theme]: true }));
  }, []);
  const markFailed = useCallback((theme: ThemeName) => {
    setSettled((current) => ({ ...current, [theme]: true }));
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setSettled({ light: true, dark: true }), 10000);
    return () => window.clearTimeout(timeout);
  }, []);

  const value = useMemo(() => ({ canPlay, isLoaded: settled.light && settled.dark, markLoaded, markPlayable, markFailed }), [canPlay, settled, markLoaded, markPlayable, markFailed]);
  return <TransitionMediaContext.Provider value={value}>{children}</TransitionMediaContext.Provider>;
}

export function useTransitionMedia() {
  const context = useContext(TransitionMediaContext);
  if (!context) throw new Error("useTransitionMedia must be used within TransitionMediaProvider");
  return context;
}
