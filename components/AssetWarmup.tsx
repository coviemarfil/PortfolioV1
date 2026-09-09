"use client";

import { useEffect } from "react";
import { projects } from "@/lib/portfolio";

const galleryImages = projects.flatMap((project) => project.screenshots);

export function AssetWarmup() {
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;

    const warmGallery = () => {
      galleryImages.forEach((src) => {
        const image = new Image();
        image.decoding = "async";
        image.src = src;
      });
    };

    if (document.readyState === "complete") {
      const timeout = window.setTimeout(warmGallery, 0);
      return () => window.clearTimeout(timeout);
    }

    window.addEventListener("load", warmGallery, { once: true });
    return () => window.removeEventListener("load", warmGallery);
  }, []);

  return null;
}
