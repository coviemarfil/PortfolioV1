# Project Overview

## Purpose

PortfolioV1 is Covie B. Marfil's single-page professional portfolio. It presents education, practical experience, projects, skills, social profiles, and a downloadable PDF resume for entry-level developer and IT opportunities.

## Current goals

- Keep the portfolio minimal, responsive, accessible, and credible to employers.
- Use a production-quality Next.js/React/TypeScript/Tailwind architecture.
- Preserve a quiet grayscale visual language while adding carefully restrained interaction.
- Continue refining the hero layout and theme-driven portrait interaction through visual QA.

## Overall design philosophy

The project follows `design.md`: dark-first, minimal, typography-led, grayscale only, generous spacing, small motion, no gradients/glass/loud accent colors, and no template-like ornamentation. The desktop sidebar is a deliberate structural adaptation inspired by a user-provided reference; it does not copy the reference's content.

# Current State

## Completed

- Migrated the original static HTML/CSS/JS portfolio to Next.js App Router with React, TypeScript, and Tailwind CSS.
- Created reusable components and a typed portfolio data module.
- Replaced the desktop top navigation with a fixed desktop sidebar; retained a mobile top bar and hamburger menu.
- Implemented dark/light mode through `next-themes`.
- Added a View Transitions circular theme reveal from the clicked sun/moon control.
- Added a theme-aware hero portrait and video transition: sunglasses-on for dark mode and reverse video for light mode.
- Added an opaque mobile navigation overlay and corrected its DOM placement so it is viewport-fixed rather than constrained by the blurred header.
- Converted/added a PDF resume at `public/documents/Marfil_Covie_Resume.pdf`.
- Added current stack skills: Next.js, React, TypeScript, Tailwind CSS.
- Replaced personal phone/location contact surfaces with GitHub, Facebook, LinkedIn, and email.
- Updated hero copy to avoid listing the technical stack before the user scrolls.
- Removed legacy static entry files and legacy assets; added `.gitignore`.

## Currently in progress

- Ongoing visual tuning of the hero portrait frame and proportionality. The latest state uses a lifted dark surface, minimal equal inset around the portrait, and an inner outline.

## Unfinished

- A clean production build has not been confirmed in this environment after refactoring.
- The user must approve pnpm's `sharp` build script locally before `dev`/`build` reliably run.
- No automated tests, lint script, active-section highlighting, or scroll-reveal observer have been reimplemented in React.
- The current project is not deployed.

# Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 3
- PostCSS + Autoprefixer
- `next/font` with Geist and Geist Mono
- `next/image` for the hero portrait
- `next-themes` for class-based light/dark mode persistence
- `lucide-react` for UI icons
- pnpm/Corepack for package management

# Project Structure

```text
PortfolioV1/
├─ app/
│  ├─ globals.css          # Tailwind layers, theme CSS variables, global view-transition CSS
│  ├─ layout.tsx           # Root layout, Geist fonts, metadata
│  └─ page.tsx             # Single-page composition
├─ components/
│  ├─ About.tsx
│  ├─ Button.tsx
│  ├─ Card.tsx
│  ├─ Contact.tsx
│  ├─ Experience.tsx
│  ├─ Footer.tsx
│  ├─ Hero.tsx
│  ├─ Navbar.tsx
│  ├─ Projects.tsx
│  ├─ SectionHeading.tsx
│  ├─ Skills.tsx
│  ├─ ThemeProvider.tsx
│  └─ ThemeToggle.tsx
├─ lib/
│  └─ portfolio.ts         # Typed site content, social links, projects, experience, skills
├─ public/
│  ├─ documents/
│  │  └─ Marfil_Covie_Resume.pdf
│  └─ media/
│     ├─ portrait-light.jpg
│     ├─ portrait-dark.jpg
│     ├─ shades-on.mp4
│     └─ shades-off.mp4
├─ design.md               # Original design direction; remains the visual authority
├─ package.json
├─ pnpm-lock.yaml
├─ tailwind.config.ts
├─ tsconfig.json
├─ next.config.ts
├─ postcss.config.mjs
└─ .gitignore
```

`node_modules/` is generated and ignored. Do not commit it. The original `index.html` and `assets/` static-site files were intentionally removed after the migration.

# Architecture Decisions

- **App Router single page:** The portfolio remains one long-scroll page, composed in `app/page.tsx`. This preserves the original information architecture and smooth-scrolling intent.
- **Typed content module:** Repeated content lives in `lib/portfolio.ts` to avoid duplication across components. Social links are shared by hero, contact, footer, and sidebar.
- **Component composition:** Each section has a dedicated component; `Card`, `Button`, and `SectionHeading` are reusable primitives.
- **Tailwind-first styling:** Layout and component styling use Tailwind utility classes. `app/globals.css` is limited to Tailwind layers, semantic theme variables, focus/selection defaults, and the global View Transition animation.
- **Class-based themes:** `next-themes` sets the `dark` class on the root. Theme tokens use CSS custom properties so all Tailwind semantic colors update together.
- **Client boundaries only where needed:** `Navbar`, `ThemeToggle`, and `Hero` are client components due to interaction/theme/video state. Content sections remain server components.
- **Mobile nav as sibling of header:** The mobile overlay is intentionally outside the `backdrop-blur` header. A fixed descendant of a blurred element may use the header as its containing block and render incorrectly.
- **Hydration-safe portrait:** `Hero` renders the dark portrait on server and initial client pass, then reads the resolved saved theme after mount. This fixes the previous `next-themes` hydration mismatch.
- **Media from `public/`:** User-provided photos/videos live under `public/media/` and are referenced by root paths. The portrait uses `next/image`; video is native HTML `<video>` for no extra dependency.

# Design System

## From `design.md`

- Background: near-black `#0A0A0A` in dark mode; light mode is an off-white neutral.
- Surface: slightly lifted grayscale, never colorful.
- Type: Geist for body/headlines, Geist Mono for labels and small navigation details.
- Layout: approximately 1100px content width, strong whitespace, responsive grids/flex, no horizontal scroll.
- Motion: small fade-up, gentle hover movement, reduced-motion fallbacks; no bouncy or flashy animation.
- Components: plain dark/surface cards, low-contrast borders, rounded corners, visible focus states.

## Additional decisions

- Desktop uses a 18rem (`w-72`) fixed left sidebar. Main content has `lg:pl-72`.
- Mobile/tablet uses a 4.5rem top bar with an opaque full-viewport overlay menu.
- Hero uses a portrait-first mobile order and text-first desktop order.
- The hero portrait card uses `bg-surface`, but `dark:bg-zinc-900` for clearer contrast in dark mode; it has a thin border, a soft shadow, minimal equal inset, and a subtle inner outline.
- Hero social links are monospace arrow links in this exact order: GitHub, LinkedIn, Facebook.
- No new metrics or fake accomplishments should be added.

# Components

| Component | Responsibility |
| --- | --- |
| `ThemeProvider` | Wraps `next-themes` with forced class-based theme behavior and a dark default. |
| `ThemeToggle` | Sun/moon segmented control; persists theme, triggers circle reveal, emits portrait transition events, blocks repeated click while video plays. |
| `Navbar` | Desktop left sidebar and mobile header/menu. Contains sidebar email only; mobile menu remains opaque. |
| `Hero` | Employer-focused introduction, portrait, preloaded theme-transition videos, hero social arrow links, and theme event handling. |
| `About` | About copy plus education/social summary metadata. |
| `Projects` | Renders typed project cards from `lib/portfolio.ts`. |
| `Experience` | Renders experience timeline and education history. |
| `Skills` | Renders grouped technical/tool/fundamental skill cards. |
| `Contact` | Renders GitHub, Facebook, LinkedIn, and email contact cards plus email CTA. |
| `Footer` | Copyright and social links. |
| `Button` | Reusable styled anchor in primary or ghost variant. |
| `Card` | Reusable project card container. |
| `SectionHeading` | Shared numbered section label, title, and optional description. |

# Features

## Implemented

- Responsive single-page portfolio
- Desktop fixed sidebar / mobile hamburger menu
- Fully opaque mobile menu overlay
- Light/dark theme persistence
- Button-origin circular View Transition for theme changes
- Theme-aware hero portrait
- Theme-change videos: `shades-on.mp4` for light-to-dark, `shades-off.mp4` for dark-to-light
- Video preloading, muted inline playback, 1.15x playback rate, repeated-toggle lock until completion
- Reduced-motion fallback for View Transition animation
- `next/image` hero image optimization
- PDF resume available from `/documents/Marfil_Covie_Resume.pdf` (not currently linked from the hero)
- GitHub, Facebook, LinkedIn, and email contact links
- Hover/fade-up micro-interactions
- Keyboard focus styling and semantic navigation/sections

## Planned/discussed but not implemented

- Restore active-section highlighting while scrolling.
- Restore scroll-triggered reveal/stagger for sections (only basic hero fade-up currently exists).
- Add a real lint script and tests.
- Optional production deployment.

# Dependencies

Declared in `package.json`:

| Package | Purpose |
| --- | --- |
| `next` | App Router framework and production build/runtime. |
| `react`, `react-dom` | UI runtime. |
| `next-themes` | Persistent class-based light/dark theme management. |
| `lucide-react` | Sun, moon, menu, close, and arrow-link icons. |
| `tailwindcss` | Utility-first styling. |
| `postcss`, `autoprefixer` | Tailwind processing and browser CSS compatibility. |
| `typescript` | Static typing. |
| `@types/node`, `@types/react`, `@types/react-dom` | Type declarations. |

No dependency is clearly unnecessary at present. `sharp` is a transitive Next.js image dependency; it must be approved in pnpm when prompted.

# Configuration

- **`package.json`**: Uses `pnpm dev`, `pnpm build`, and `pnpm start`; includes the Next/React/Tailwind stack above.
- **`next.config.ts`**: Enables `reactStrictMode` only; no remote image configuration is needed because assets are local.
- **`tailwind.config.ts`**: Scans `app/` and `components/`; defines semantic `background`, `surface`, `foreground`, `muted`, `subtle`, and `border` colors backed by CSS variables. Defines Geist font families, `max-w-content`, and `fade-up` animation.
- **`tsconfig.json`**: Strict TypeScript, bundler module resolution, Next plugin, `@/*` alias to project root.
- **`postcss.config.mjs`**: Tailwind + Autoprefixer.
- **`app/globals.css`**: Light/dark token values, Tailwind directives, global focus/selection style, View Transition circle animation, reduced-motion override.
- **`.gitignore`**: Ignores `node_modules`, `.next`, `.pnpm-store`, env files, `tmp`, and OS files.

# Important Decisions

- Preserve portfolio content; do not invent projects, achievements, or metrics.
- Avoid showing the tech stack in the hero paragraph; skills are intentionally lower on the page.
- Do not show the user’s phone number or personal location as contact information. The About location sentence was also removed.
- Hero should not show email or resume links. It only shows GitHub, LinkedIn, and Facebook arrow links.
- The sidebar should show only `coviemarfil1@gmail.com` as its contact link, not a social list.
- The desktop sidebar structure should remain; do not revert to a desktop top nav unless asked.
- The portrait card is intentionally not transparent in dark mode. It should remain lifted from the page with `dark:bg-zinc-900`.
- Do not remove the photos/videos or change the video direction mappings without user approval.
- Use Lucide icons; do not use emoji for interface icons.

# Known Issues

- **pnpm/Sharp gate:** The user ran `corepack pnpm install` successfully but then pnpm blocked commands because `sharp`'s build script was ignored. Run `corepack pnpm approve-builds`, select `sharp`, then run `corepack pnpm install` and `corepack pnpm dev`. The exact user-side completion has not been confirmed.
- **Build status:** `next build` has not been verified after the final changes because of the pnpm issue above.
- **Hero visual QA:** The portrait/card spacing and dark-mode contrast have been revised multiple times from screenshots. Verify live at mobile, tablet, laptop, and ultrawide widths before further hero changes.
- **Video compatibility:** Clips are MP4, muted, inline, and preloaded; test Safari/iOS and lower-bandwidth scenarios. On playback failure, the theme still changes and the toggle unlocks.
- **Font build network:** `next/font/google` may require access during initial build. If a build environment is offline, consider self-hosting Geist only after explicit approval.
- **Project formatting:** Several components are intentionally compact one-line JSX due to prior edits. They work conceptually but can be reformatted for maintainability without changing behavior.
- **Potential content mismatch:** `Projects` still describes the original portfolio as plain HTML/CSS/JS/no frameworks. The site is now Next.js/React/TypeScript/Tailwind; update this description and tags when approved.

# Next Recommended Tasks

1. Run and verify the app locally: approve `sharp`, then `corepack pnpm dev` and inspect `http://localhost:3000`.
2. Test the hero at mobile, tablet, desktop, and ultrawide widths; tune only with screenshots/clear user direction.
3. Update the Portfolio Website project card description and tags to the current Next.js/React/TypeScript/Tailwind stack.
4. Run `corepack pnpm build` after local dev works; resolve any TypeScript/Tailwind errors.
5. Add `lint` support (Next 15 no longer provides `next lint` by default) and format the compact components.
6. Optionally restore active nav/scroll reveal behavior using a small `IntersectionObserver` client hook.
7. Deploy only when the user explicitly asks.

# Coding Guidelines

- Use TypeScript; avoid `any`.
- Prefer small functional components and typed props.
- Store repeated content/data in `lib/portfolio.ts`, not duplicated component constants.
- Use Tailwind utility classes first. Only add global CSS for genuine global behavior/tokens.
- Preserve semantic HTML, keyboard support, descriptive alt text, `aria-label`s for controls, and external-link `rel="noreferrer"`.
- Keep animation short, purposeful, and reduced-motion aware.
- Use `next/image` for raster images displayed in React UI.
- Keep external media under `public/media/` and files under `public/documents/`.
- Use `apply_patch` for source edits. Do not edit generated `node_modules` or lockfiles manually.

# Do Not Change

- The Next.js App Router + React + TypeScript + Tailwind architecture.
- The top-level `app/`, `components/`, `lib/`, and `public/` organization.
- `design.md` as the source of truth for the restrained grayscale design direction.
- The fixed desktop sidebar and mobile-only top navigation pattern.
- The dark-first default, semantic theme tokens, and `next-themes` class-based theme mechanism.
- The theme-video direction mapping: light-to-dark uses `shades-on.mp4`; dark-to-light uses `shades-off.mp4`.
- The user privacy decision: no phone number or personal location in contact surfaces.
- Hero social order: GitHub, LinkedIn, Facebook.
- Sidebar contact policy: email only.
- Avoid fake projects, metrics, credentials, or employer claims.

# START HERE

Continue work on `C:\xampp\htdocs\PortfolioV1`, a Next.js 15 App Router portfolio using React, TypeScript, Tailwind CSS, `next-themes`, and Lucide. Read `HANDOFF.md` and `design.md` first. Preserve the current architecture, desktop sidebar/mobile header pattern, grayscale design language, privacy choices, and hero theme-video behavior unless a change is explicitly requested. First verify the user can run the app with `corepack pnpm approve-builds` (approve `sharp`), `corepack pnpm install`, and `corepack pnpm dev`; then address the user’s next request with focused, minimal edits.
