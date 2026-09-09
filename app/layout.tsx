import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Covie Marfil | BSIT Graduate",
  description: "Covie B. Marfil - BSIT graduate and web developer based in Muntinlupa City, Philippines.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning>
    <head>
      {/* Keep the theme transition instant; the gallery is warmed after the page has loaded. */}
      <link rel="preload" href="/media/portrait-light.jpg" as="image" />
      <link rel="preload" href="/media/portrait-dark.jpg" as="image" />
      <link rel="preload" href="/media/shades-on.mp4" as="video" type="video/mp4" />
      <link rel="preload" href="/media/shades-off.mp4" as="video" type="video/mp4" />
    </head>
    <body className={`${geist.variable} ${geistMono.variable}`}>{children}</body>
  </html>;
}
