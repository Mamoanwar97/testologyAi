# TestologyAI

Free IT certification practice platform. Study with instant feedback or simulate real exam conditions — no account required.

## Features

- **Practice Mode** — Answer questions one at a time with immediate feedback and explanations
- **Exam Simulation** — Timed 60-minute exams that mirror the real test experience
- **Results & Review** — Score breakdown with wrong answer review after each session
- **Resume Support** — In-progress exams are saved locally so you can pick up where you left off

## Tech Stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [TanStack Start](https://tanstack.com/start) — file-based routing with SSR support
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) + [Base UI](https://base-ui.com)
- [Vite 7](https://vite.dev)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/       # Shared UI components
├── data/             # JSON question banks and certificate metadata
│   └── chapters/     # Per-certification chapter data
├── hooks/            # Custom React hooks (exam state, exit confirmation)
├── routes/           # File-based routes (TanStack Router)
│   └── certificates/
│       └── $certId/
│           └── chapters/
│               └── $chapterId/
│                   ├── practice.tsx
│                   ├── exam.tsx
│                   └── results.tsx
├── types/            # TypeScript types
└── utils/            # Data access helpers, SEO utilities
```

## Scripts

| Command                | Description                   |
| ---------------------- | ----------------------------- |
| `npm run dev`          | Start dev server on port 3000 |
| `npm run build`        | Production build              |
| `npm run preview`      | Preview production build      |
| `npm run test`         | Run tests with Vitest         |
| `npm run format`       | Format code with Prettier     |
| `npm run format:check` | Check formatting              |
