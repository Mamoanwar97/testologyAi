# Testology — Agent Guide

## What Is This Project?

Testology is an IT certification practice exam platform (SSG, no backend, no auth). Users browse certificates, pick chapters, then take practice quizzes (instant feedback) or timed exams (60-min, no feedback until submit). Built with TanStack Start + React 19.

**PRD**: See `PRD.md` for full requirements.
**Progress**: See `PROGRESS.md` for implementation status (step-by-step checklist).

---

## Tech Stack

| Layer       | Tool                                                                            |
| ----------- | ------------------------------------------------------------------------------- |
| Framework   | TanStack Start (`@tanstack/react-start`) — NOT the deprecated `@tanstack/start` |
| React       | React 19                                                                        |
| Router      | TanStack Router (file-based routing, auto-generates `src/routeTree.gen.ts`)     |
| Styling     | Tailwind CSS v4 (CSS `@theme` directives, NOT `tailwind.config.ts`)             |
| Components  | shadcn/ui (uses `@base-ui/react`, NOT Radix — no `asChild` prop)                |
| Bundler     | Vite 7                                                                          |
| Package Mgr | Bun — run `bun --bun run dev`, install with `bun add`                           |
| Confetti    | `canvas-confetti`                                                               |
| TypeScript  | Strict mode, `noUnusedLocals`, `noUnusedParameters`                             |

---

## Project Structure

```
testolgyAi/
├── public/                          # Static assets (served as-is)
│   ├── favicon-logo.png             # Za'atar logo (navbar, favicon, og:image)
│   ├── halfRobot.png                # Za'atar half-body (hero, results, empty states)
│   ├── robot.png                    # Za'atar full-body (error boundary)
│   ├── robots.txt                   # SEO robots file
│   └── manifest.json               # PWA manifest
│
├── src/
│   ├── routes/                      # File-based routing (TanStack Router)
│   │   ├── __root.tsx               # Root layout: <html>, <head>, Header, ErrorBoundary, Footer
│   │   └── index.tsx                # Landing page (/)
│   │                                # Future routes:
│   │                                #   certificates/index.tsx → /certificates
│   │                                #   certificates/$certId/index.tsx → /certificates/:certId
│   │                                #   certificates/$certId/chapters/$chapterId/practice.tsx
│   │                                #   certificates/$certId/chapters/$chapterId/exam.tsx
│   │                                #   certificates/$certId/chapters/$chapterId/results.tsx
│   │
│   ├── components/
│   │   ├── Header.tsx               # Sticky navbar: logo, Home link, Certificates link, timer slot, ThemeToggle
│   │   ├── Footer.tsx               # Simple footer with copyright
│   │   ├── ThemeToggle.tsx          # Light/Dark/Auto toggle (localStorage-backed)
│   │   ├── ErrorBoundary.tsx        # Class component, shows Za'atar (robot.png) on error
│   │   └── ui/
│   │       └── button.tsx           # shadcn Button (base-ui, CVA variants)
│   │
│   ├── data/
│   │   ├── certificates.json        # Array of Certificate objects (3 certs)
│   │   └── chapters/
│   │       ├── aws-cloud-practitioner.json
│   │       ├── azure-fundamentals.json
│   │       └── comptia-a-plus.json
│   │
│   ├── utils/
│   │   └── data.ts                  # getCertificates(), getCertificateById(), getChapters(), getChapterById()
│   │
│   ├── lib/
│   │   └── utils.ts                 # cn() — clsx + tailwind-merge
│   │
│   ├── types.ts                     # Certificate, Chapter, Question, Option interfaces
│   ├── router.tsx                   # TanStack Router config (scroll restoration, preload)
│   ├── styles.css                   # Tailwind v4 imports, brand colors, shadcn tokens, dark mode
│   └── routeTree.gen.ts             # AUTO-GENERATED — never edit manually
│
├── vite.config.ts                   # Vite plugins: devtools, tsconfig paths, tailwind, tanstackStart (SSG), react, sitemap
├── tsconfig.json                    # Strict TS, path aliases: #/ and @/ → src/
├── components.json                  # shadcn/ui config
├── PRD.md                           # Full product requirements
└── PROGRESS.md                      # Step-by-step implementation checklist
```

---

## Path Aliases

Both `#/` and `@/` map to `src/`. Convention: **use `#/`**.

```ts
import { getCertificates } from "#/utils/data";
import { Button } from "#/components/ui/button";
import type { Certificate } from "#/types";
```

---

## Brand Colors (Tailwind Utilities)

Available as `bg-testology-navy`, `text-testology-blue`, `border-testology-cyan`, etc.

| Utility class          | Hex       | Usage                 |
| ---------------------- | --------- | --------------------- |
| `testology-navy`       | `#1A2744` | Dark backgrounds      |
| `testology-blue`       | `#2563EB` | Primary buttons/links |
| `testology-cyan`       | `#00B4FF` | Accent highlights     |
| `testology-light-blue` | `#60A5FA` | Secondary accents     |
| `testology-sky`        | `#E0F2FE` | Light backgrounds     |
| `testology-slate`      | `#64748B` | Muted text            |
| `testology-dark`       | `#0F172A` | Primary text          |
| `testology-success`    | `#16A34A` | Correct answers       |
| `testology-error`      | `#DC2626` | Wrong answers         |

Also available: shadcn semantic tokens (`bg-primary`, `text-foreground`, `border-border`, `bg-muted`, etc.)

---

## Key Conventions

### shadcn Button — No `asChild`

The Button component uses `@base-ui/react`, NOT Radix. There is **no `asChild` prop**. To render a link styled as a button, use `buttonVariants()`:

```tsx
import { buttonVariants } from "#/components/ui/button";

<a href="/path" className={buttonVariants({ size: "lg" }) + " no-underline"}>
  Click Me
</a>;
```

### TanStack Router Type-Safe Links

`<Link to="...">` only accepts routes that exist in the route tree. If a route file doesn't exist yet, use `<a href="...">` instead. Convert to `<Link>` once the route file is created.

### SSG / Prerendering

Configured in `vite.config.ts` via `tanstackStart({ prerender: { enabled: true, crawlLinks: true } })`. All pages are statically generated at build.

### "All Chapters" Data

The "all" chapter has its own **curated question set** — it is NOT an aggregation of other chapters' questions.

### Theme System

Light/dark/auto modes stored in localStorage. A blocking `<script>` in `__root.tsx` prevents flash of wrong theme. ThemeToggle cycles: auto → light → dark → auto.

### Exam Timer Slot

The Header has an empty `<div id="exam-timer-slot" />` reserved for the exam countdown timer (rendered via portal in Step 7).

---

## Data Types

```ts
interface Option {
  id: string;
  text: string;
}
interface Question {
  id: string;
  text: string;
  options: Option[];
  correctAnswer: string;
  explanation?: string;
}
interface Chapter {
  id: string;
  title: string;
  questions: Question[];
}
interface Certificate {
  id: string;
  title: string;
  description: string;
  logo: string;
  chapters: string[];
}
```

---

## Routes (Current & Planned)

| Route                                                | File                                        | Status  |
| ---------------------------------------------------- | ------------------------------------------- | ------- |
| `/`                                                  | `src/routes/index.tsx`                      | Done    |
| `/certificates`                                      | `src/routes/certificates/index.tsx`         | Planned |
| `/certificates/$certId`                              | `src/routes/certificates/$certId/index.tsx` | Planned |
| `/certificates/$certId/chapters/$chapterId/practice` | `...practice.tsx`                           | Planned |
| `/certificates/$certId/chapters/$chapterId/exam`     | `...exam.tsx`                               | Planned |
| `/certificates/$certId/chapters/$chapterId/results`  | `...results.tsx`                            | Planned |

---

## Commands

```bash
bun --bun run dev       # Start dev server (port 3000)
bun --bun run build     # Production build (SSG)
bun --bun run preview   # Preview production build
bun run tsc --noEmit    # Type check
```

---

## WSL Note

This project runs inside WSL (Ubuntu). When running commands from Windows terminal, use:

```bash
wsl -e bash -c "export PATH=\$HOME/.bun/bin:\$PATH; cd /home/mamoanwar97/code/testolgyAi && <command>"
```
