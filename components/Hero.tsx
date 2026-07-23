"use client";

import Image from "next/image";
import { ArrowUpRight, Download } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { socials } from "@/lib/portfolio";
import { Button } from "./Button";

type PortraitTransitionEvent = CustomEvent<{ theme: "light" | "dark" }>;
const heroSocialOrder = ["GitHub", "LinkedIn", "Facebook"];

export function Hero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [videoSource, setVideoSource] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDark = mounted ? resolvedTheme !== "light" : true;

  const finishVideo = () => {
    setVideoSource(null);
    window.dispatchEvent(new Event("portrait-transition-end"));
  };

  useEffect(() => {
    setMounted(true);
    const startVideo = (event: Event) => {
      const { theme } = (event as PortraitTransitionEvent).detail;
      setVideoSource(theme === "dark" ? "/media/shades-on.mp4" : "/media/shades-off.mp4");
    };
    window.addEventListener("portrait-theme-transition", startVideo);
    return () => window.removeEventListener("portrait-theme-transition", startVideo);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSource) return;
    video.currentTime = 0;
    video.playbackRate = 1.15;
    void video.play().catch(finishVideo);
  }, [videoSource]);

  return <section id="hero" className="relative flex min-h-svh items-center overflow-hidden pt-[4.5rem] lg:pt-0">
    <div aria-hidden="true" className="absolute -right-16 -top-16 size-[min(52vw,30rem)] opacity-[0.24] [background-image:radial-gradient(hsl(var(--foreground))_0.9px,transparent_0.9px)] [background-size:8px_8px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
    <div className="relative mx-auto grid w-[min(100%-2rem,68rem)] items-center gap-10 py-16 sm:py-24 lg:grid-cols-[minmax(0,1fr)_28rem] lg:gap-16 xl:gap-20"><div className="max-w-xl animate-fade-up">
      <p className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-subtle">01 / Hero</p>
      <h1 className="text-5xl font-bold leading-[0.98] tracking-[-0.045em] sm:text-6xl xl:text-7xl">Covie B. Marfil</h1>
      <p className="mt-5 text-base text-muted sm:text-lg">Bachelor of Science in Information Technology Graduate</p>
      <p className="mt-6 max-w-lg text-base leading-7 text-muted">A recent IT graduate with hands-on experience from academic projects, database support, and customer-focused work. I&apos;m eager to contribute, learn quickly, and build dependable digital experiences with a collaborative team.</p>
      <div className="mt-7"><Button href="/documents/Marfil_Covie_Resume.pdf" download><Download className="mr-2 size-4" aria-hidden="true" />Download resume</Button></div>
      <div className="mt-7 border-t border-border pt-3"><div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.75rem] tracking-[0.04em] text-subtle">{heroSocialOrder.map((label) => socials.find((social) => social.label === label)).filter((social): social is (typeof socials)[number] => Boolean(social)).map((social) => <a key={social.label} className="group inline-flex min-h-10 items-center gap-1 hover:text-foreground" href={social.href} target="_blank" rel="noreferrer">{social.label}<ArrowUpRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" /></a>)}</div></div>
    </div><div className="relative order-first mx-auto aspect-square w-[min(86vw,22rem)] overflow-hidden rounded-[1.5rem] border border-border bg-surface p-2 shadow-2xl shadow-black/10 transition-transform duration-500 dark:bg-zinc-900 motion-safe:animate-fade-up motion-safe:[animation-delay:120ms] sm:w-96 lg:order-none lg:justify-self-end lg:w-[28rem] lg:hover:-translate-y-1">
      <div className="absolute inset-1 overflow-hidden rounded-[1.125rem] outline outline-1 outline-border/80">
        <Image src={isDark ? "/media/portrait-dark.jpg" : "/media/portrait-light.jpg"} alt={isDark ? "Covie Marfil wearing sunglasses" : "Covie Marfil in graduation attire"} fill priority sizes="(min-width: 1024px) 28rem, (min-width: 640px) 24rem, 22rem" className="scale-[1.15] object-cover object-[center_45%]" />
        {videoSource && <video ref={videoRef} src={videoSource} muted playsInline preload="auto" onEnded={finishVideo} onError={finishVideo} className="absolute inset-0 z-10 size-full scale-[1.15] object-cover object-[center_45%]" />}
      </div>
    </div><div className="hidden" aria-hidden="true"><video preload="auto" muted playsInline src="/media/shades-on.mp4" /><video preload="auto" muted playsInline src="/media/shades-off.mp4" /></div></div>
  </section>;
}
