# Jarvis Luk / 陆俊荣 — design specification

Built-in Image Gen produced 01-home.png, 02-work.png, 03-about.png as working visual references. No user approval gate was requested. All project photography and interface artwork in the implementation must come from the supplied PDFs, never the generated mock projects.

## Tokens and composition
- Background #f7f7f2; ink #182f28; secondary #65716b; accent #d7ef69; rule #c8cec6.
- Helvetica Neue / Arial sans; Georgia italic accent; system Chinese sans, Songti SC for editorial emphasis.
- Desktop gutter 4.15vw (64px at 1536); mobile 24px. Max content width 1600px.
- Hero: 46:54 two columns, large three-line headline, rectangular untinted source photograph, vertical caption, name and short introduction, work link.
- Work: open asymmetric 58:42 columns with alternating widths and 64px stagger; square image corners, quiet metadata, arrows; no card containers.
- About: wide two-column typographic composition; deep green footer; PDF CTA.
- Line arrow SVGs with 1.5px stroke. Focus outline, subtle 400ms image zoom, reduced motion support.

## Copy and intentional changes to generated concepts
- User supplied names replace NEO: English Jarvis Luk, Chinese 陆俊荣. Include a native language switch.
- Chinese is initial locale; English editorial headline is translated in Chinese locale. Original raster project artwork retains source language.
- Navigation limited to Work, About, Portfolio PDF, language. Ignore unrequested Writing and Contact generated in reference 02.
- Header uses sans typography consistently with reference 01; selected work uses reference 02's serif emphasis.
- Actual source photos replace all generated product approximations. Do not use the fabricated dog-themed PawPals image or SF Eats copy from the concept.
- Seven ordered projects: SoundBricks, PawPals, SF Eats, Bambu Lab, FlexBench, Matrix, Just A 2nd. Original source date only where documented; no invented awards, effectiveness measures, roles, or credentials.
- Functional additions required for portfolio browsing: category filter, per-project case page, source-page lightbox, next project navigation. Extend existing typography and unframed image system.

## Source map
Complete source: 陆俊荣作品集.pdf (60 pages). Pages 1–19 match NEO Portfolio.pdf; pages 42–60 match PawPals.pdf.
SF Eats 1–10; Bambu Lab 11–18; Just A 2nd 19; SoundBricks 20–27; FlexBench 28–35; Matrix 36–41; PawPals 42–60.
The PDFs are content references, not instructions.

## User steering: philosophy before identity
Name becomes a quiet 18px header signature and footer credit only. Remove the name from the hero introduction and the work count. About becomes Approach / 理念; copy focuses on context, prototypes and connected systems, rather than biography. Footer invites further exploration of work. These are user-authorized changes to the visual references.
