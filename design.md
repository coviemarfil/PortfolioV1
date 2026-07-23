# Design notes

The look is intentionally quiet. Dark background (`#0A0A0A`), slightly lifted surfaces (`#111111`), grayscale text, no accent colors. I didn't want it to read as "template" or chase trends â€” no glass effects, no loud gradients. Geist for body copy, Geist Mono for the small section labels (`01 / HERO`, `02 / ABOUT`, and so on). Typography carries the hierarchy more than decoration.

Layout stays centered around ~1100px with a lot of breathing room. Grids and flex where it makes sense; sizing through `clamp()` and `rem` so it scales without hard breakpoints everywhere. It should work from a small phone up to a wide monitor â€” no horizontal scroll, ever.

Navigation sticks to the top, blurs slightly on scroll. Desktop gets a simple horizontal nav; mobile collapses into a hamburger. Sections scroll smoothly, and the active section updates as you move through the page.

Motion is kept small â€” fade-up on load, a little stagger, nothing bouncy. If someone has reduced motion enabled, that all backs off. Same idea for the halftone dot texture in the hero: low opacity, grayscale, purely decorative.

Project cards are plain cards â€” border, dark fill, soft lift on hover. Each one links out to GitHub and a live demo where I have one.

A few things I cared about beyond how it looks: semantic markup, visible keyboard focus, touch targets that aren't tiny, and keeping JavaScript to what the page actually needs. Animations live in CSS where possible.
