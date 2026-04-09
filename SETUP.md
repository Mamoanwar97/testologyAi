# Setup Guide

Step-by-step instructions to get TestologyAI running locally for development.

## Prerequisites

Make sure the following are installed on your machine:

| Tool        | Version    | Notes                                    |
| ----------- | ---------- | ---------------------------------------- |
| **Node.js** | `>= 20.x`  | Required by Vite 7 and TanStack Start    |
| **npm**     | `>= 10.x`  | Ships with Node.js                       |
| **Git**     | Any recent | For cloning the repository               |
| **Bun**     | Optional   | A `bun.lock` is committed if you prefer it |

Check your versions:

```bash
node --version
npm --version
git --version
```

## 1. Clone the Repository

```bash
git clone https://github.com/Mamoanwar97/testologyAi.git
cd testologyAi
```

### (Optional) Add additional remotes

If you're collaborating across forks, you can add extra remotes:

```bash
git remote add omar https://github.com/OmarKhaledzidann/TestologyAi-Website.git
git remote -v
```

## 2. Install Dependencies

Using **npm** (recommended):

```bash
npm install
```

Or using **Bun**:

```bash
bun install
```

## 3. Start the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

The dev server supports hot module replacement (HMR), so edits will reflect instantly.

## 4. Verify the Setup

Run the test suite to confirm everything is wired up correctly:

```bash
npm run test
```

Check formatting:

```bash
npm run format:check
```

## Available Scripts

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start dev server on port 3000            |
| `npm run build`        | Create production build                  |
| `npm run preview`      | Preview the production build locally     |
| `npm run test`         | Run the Vitest test suite                |
| `npm run format`       | Auto-format all files with Prettier      |
| `npm run format:check` | Report formatting issues without fixing  |

## Production Build

To build and preview the production bundle:

```bash
npm run build
npm run preview
```

## Manual Deployment

To deploy manually to a server:

1. Run the production build:

   ```bash
   npm run build
   ```

2. Upload the contents of the `dist/client` folder to your server's web root.

## Project Layout

```
src/
├── components/       # Shared UI components (shadcn/ui + Base UI)
├── data/             # JSON question banks and certificate metadata
│   └── chapters/     # Per-certification chapter data
├── hooks/            # Custom React hooks
├── routes/           # File-based routes (TanStack Router)
├── types/            # TypeScript type definitions
└── utils/            # Data access helpers, SEO utilities
```

The `#/*` import alias maps to `./src/*` (configured in [package.json](package.json#L5-L7)).

## Troubleshooting

**Port 3000 already in use**
Change the port in [package.json](package.json#L9) or stop the process using the port.

**Dependencies fail to install**
Delete `node_modules` and the lockfile, then reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors after pulling changes**
Restart the TypeScript server in your editor, or run:

```bash
npm run build
```

to surface any type errors.

## Next Steps

- Read the [README](README.md) for an overview of features and tech stack.
- Explore [src/routes](src/routes) to see how pages are structured.
- Check [src/data/chapters](src/data/chapters) to understand the question bank format.
