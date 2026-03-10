# Testology - Product Requirements Document (PRD)

## Context

Testology is a quiz and certification practice platform. Users browse available certificates, select one, then practice or take exams on its chapters. The goal is to provide a clean, distraction-free, accessible study experience with exam simulation (timed MCQs) and instant-feedback practice mode.

The app is statically generated (SSG) at build time and deployed to GitHub Pages — no runtime server, no authentication.

---

## Brand Identity & Mascot

### Za'atar — The Robot Mascot

**Za'atar** is Testology's friendly AI robot mascot who guides users through their certification journey. Za'atar appears across the website as a supportive study companion — encouraging users, celebrating their wins, and keeping the experience fun and approachable.

#### Character Assets

| Asset              | File               | Usage                                                     |
| ------------------ | ------------------ | --------------------------------------------------------- |
| Favicon / Logo     | `favicon-logo.png` | Browser tab favicon, navbar logo, OpenGraph image         |
| Half-body (waving) | `halfRobot.png`    | Landing page hero, empty states, encouragement moments    |
| Full-body (tablet) | `robot.png`        | Certificates page, results page, onboarding illustrations |

#### Za'atar's Appearances

| Page / Context           | Asset Used         | Role                                                       |
| ------------------------ | ------------------ | ---------------------------------------------------------- |
| **Landing page hero**    | `halfRobot.png`    | Waving hello, welcoming users to the platform              |
| **Navbar logo**          | `favicon-logo.png` | Persistent brand presence in the navigation bar            |
| **Certificates page**    | `robot.png`        | Standing beside the certificate grid, holding a tablet     |
| **Empty states**         | `halfRobot.png`    | Friendly "no questions yet" or "nothing here" illustration |
| **Exam results (pass)**  | `halfRobot.png`    | Celebrating with the user alongside confetti               |
| **Exam results (fail)**  | `halfRobot.png`    | Encouraging "keep practicing!" companion                   |
| **Error boundary / 404** | `halfRobot.png`    | Apologetic "oops, something went wrong" illustration       |

### Color Palette

Derived from the Za'atar robot character assets — a modern blue-and-white tech palette:

| Token              | Hex       | Usage                                                |
| ------------------ | --------- | ---------------------------------------------------- |
| **Navy (Primary)** | `#1A2744` | Dark backgrounds, navbar, footer, robot visor/screen |
| **Blue (Brand)**   | `#2563EB` | Primary buttons, links, active states, brand accent  |
| **Cyan (Accent)**  | `#00B4FF` | Glowing highlights, hover states, Za'atar's eye glow |
| **Light Blue**     | `#60A5FA` | Secondary buttons, tags, lighter accents             |
| **Sky**            | `#E0F2FE` | Light card backgrounds, highlight areas              |
| **White**          | `#FFFFFF` | Page backgrounds, card surfaces, robot body          |
| **Light Gray**     | `#F1F5F9` | Alternate section backgrounds, input fields          |
| **Slate**          | `#64748B` | Secondary text, descriptions, muted elements         |
| **Dark Text**      | `#0F172A` | Primary text, headings                               |
| **Success**        | `#16A34A` | Correct answers (green with checkmark)               |
| **Error**          | `#DC2626` | Incorrect answers (red with X icon)                  |

#### Tailwind CSS Configuration

These colors should be configured as custom Tailwind theme colors under a `testology` namespace:

```ts
// tailwind.config.ts (theme.extend.colors)
testology: {
  navy: '#1A2744',
  blue: '#2563EB',
  cyan: '#00B4FF',
  'light-blue': '#60A5FA',
  sky: '#E0F2FE',
  slate: '#64748B',
  dark: '#0F172A',
}
```

---

## Tech Stack

| Layer           | Choice                                                       |
| --------------- | ------------------------------------------------------------ |
| Language        | TypeScript (strict mode)                                     |
| Framework       | TanStack Start (SSG via Nitro static preset)                 |
| UI Library      | shadcn/ui                                                    |
| Styling         | Tailwind CSS                                                 |
| Data            | Static JSON files                                            |
| State           | TanStack Router + React state (localStorage for persistence) |
| Animations      | CSS animations / canvas-confetti for celebration             |
| Package Manager | Bun                                                          |
| Linting         | ESLint                                                       |
| Formatting      | Prettier                                                     |
| Deployment      | GitHub Pages                                                 |

---

## Pages & Routes

| Route                                                                   | Page          |
| ----------------------------------------------------------------------- | ------------- |
| `/`                                                                     | Landing Page  |
| `/certificates`                                                         | Certificates  |
| `/certificates/$certId`                                                 | Chapters      |
| `/certificates/$certId/chapters/$chapterId/practice`                    | Practice Mode |
| `/certificates/$certId/chapters/$chapterId/exam`                        | Exam Mode     |
| `/certificates/$certId/chapters/all/practice`                           | Practice All  |
| `/certificates/$certId/chapters/all/exam`                               | Exam All      |
| `/certificates/$certId/chapters/$chapterId/results?mode=practice\|exam` | Results Page  |

---

## Accessibility Requirements

All pages and interactive components must meet the following accessibility standards:

- All interactive elements must be fully **keyboard navigable** (answer selection, submit, navigation)
- **Focus management**: when navigating between sections, focus must shift appropriately
- Correct/incorrect answer states must be communicated with **icons and text labels**, not color alone (supports colorblind users)
- Use **ARIA live regions** for dynamic feedback (correct/incorrect answers, timer warnings)
- Semantic HTML elements throughout (`<main>`, `<nav>`, `<section>`, `<button>`, etc.)
- Sufficient color contrast ratios per WCAG 2.1 AA

---

## SEO Requirements

- Each route must have a unique `<title>` and `<meta name="description">`
- OpenGraph tags (`og:title`, `og:description`, `og:image`) on key pages (landing, certificates, chapters)
- Generate `sitemap.xml` at build time
- Semantic HTML for crawlability

---

## Page-by-Page Requirements

### 1. Landing Page (`/`)

- Hero section with the app name "Testology" and a short tagline
- **Za'atar (halfRobot.png)** displayed in the hero section, waving to welcome users
- Brief description of what the platform offers
- CTA button → navigates to `/certificates`
- Clean, modern layout using the brand color palette (navy hero background, white text, cyan CTA button)

### 2. Certificates Page (`/certificates`)

- Grid of certificate cards
- Each card displays:
  - **Logo/icon** (image or icon)
  - **Title** (e.g., "AWS Cloud Practitioner")
  - **Description** (1-2 sentence summary)
  - **Number of chapters** (e.g., "6 Chapters")
  - **"Let's Start" button** → navigates to `/certificates/$certId`
- Responsive grid: 1 col on mobile, 2 on tablet, 3 on desktop

### 3. Chapters Page (`/certificates/$certId`)

- Certificate title and description at top
- Two sections:
  1. **"All Chapters" card** — option to quiz across all chapters
     - Shows "Practice" and "Exam" buttons
  2. **Individual chapter cards** — listed below
     - Each card shows: chapter title, number of questions
     - Each card has two buttons: **Practice** and **Exam**
- Practice button → navigates to practice route
- Exam button → navigates to exam route

### 4. Practice Mode (`/certificates/$certId/chapters/$chapterId/practice`)

- **All questions displayed on a single scrollable page**
- All questions are fully visible and answerable in any order
- **No timer**
- After selecting an answer for any question:
  - Immediately highlight correct answer in green (with checkmark icon)
  - If user chose wrong, highlight their choice in red (with X icon)
  - Show brief explanation below the question (if available in data)
- User can scroll through and answer all questions at their own pace
- **Submit button** at the bottom of the page → navigates to results page (`?mode=practice`)
- "All chapters" practice mode → uses its own dedicated, curated question set that covers topics from all chapters but is distinct from individual chapter question sets

### 5. Exam Mode (`/certificates/$certId/chapters/$chapterId/exam`)

- **All questions displayed on a single scrollable page**
- **60-minute countdown timer** displayed in the top-right corner of the navigation bar
- User selects one answer per question — **no feedback shown until submit**
- **Question & choice shuffling**: Both question order and answer choice order are shuffled on every new exam attempt
- **Persistence**: Save selected answers to `localStorage` on every change
  - On page refresh, restore all previously selected answers and remaining time
- **Resume or restart prompt**: When navigating to exam from chapters page with existing saved data, show a prompt: "You have an in-progress attempt. Resume or start new?"
- **Exit confirmation**:
  - **In-app navigation**: Show confirmation modal: "Are you sure you want to leave? Your progress will be lost." using TanStack Router navigation blocker. On confirm, clear exam localStorage data.
  - **Browser close/refresh**: Use `beforeunload` event as a soft guard (browsers show a generic message). Data persists via localStorage on refresh so no actual data loss.
- **Submit flow**:
  - Submit button at the bottom of the page
  - On click, show a **review modal** displaying the count of answered vs unanswered questions, with "Go Back" and "Confirm Submit" options
  - On confirm, navigate to results page (`?mode=exam`)
- **Auto-submit on timer expiry**: When the timer reaches zero, show a non-dismissable "Time's up!" modal that auto-closes after 3 seconds, then automatically submit and navigate to results
- "All chapters" exam → uses its own dedicated, curated question set that covers topics from all chapters but is distinct from individual chapter question sets

### 6. Results Page (`/certificates/$certId/chapters/$chapterId/results?mode=practice|exam`)

The results page serves both practice and exam modes, differentiated by the `mode` query parameter.

**If no exam/practice data exists in localStorage, redirect to chapters page.**

#### Exam Results (`?mode=exam`)

- Display overall score: **X / N** and **percentage** (where N is total questions in the set)
- Pass threshold: **80%**
- If passed (>= 80%):
  - Show "Congratulations!" message with **Za'atar (halfRobot.png)** celebrating
  - Trigger **confetti/celebration animation** (canvas-confetti library)
- If failed (< 80%):
  - Show "Keep practicing!" encouragement message with **Za'atar (halfRobot.png)** in a supportive pose
- **Wrong answers review section**:
  - For each incorrectly answered question, show:
    - The question text
    - The user's chosen answer (highlighted in red with X icon)
    - The correct answer (highlighted in green with checkmark icon)
- "Try Again" button → clears localStorage exam data, navigates back to exam
- "Back to Chapters" button → navigates to chapters page

#### Practice Results (`?mode=practice`)

- Display overall score: **X / N** and **percentage**
- No pass/fail threshold, no confetti
- **No wrong answers review** (user already saw instant feedback)
- "Practice Again" button → navigates back to practice
- "Back to Chapters" button → navigates to chapters page

---

## Data Model (Static JSON)

### `certificates.json`

```json
[
  {
    "id": "aws-cloud-practitioner",
    "title": "AWS Cloud Practitioner",
    "description": "Validate your cloud knowledge...",
    "logo": "/logos/aws.png",
    "chapters": ["all", "chapter-1", "chapter-2", "chapter-3"]
  }
]
```

### `chapters/$certId.json`

> **Note**: The `"all"` chapter contains a curated set of cross-chapter questions that cover topics from all chapters but are distinct from individual chapter question sets. It is **not** an aggregation of questions from other chapters.

```json
[
  {
    "id": "all",
    "title": "All Chapters",
    "questions": [
      {
        "id": "all-q1",
        "text": "A curated cross-chapter question...",
        "options": [
          { "id": "a", "text": "Option A" },
          { "id": "b", "text": "Option B" },
          { "id": "c", "text": "Option C" },
          { "id": "d", "text": "Option D" }
        ],
        "correctAnswer": "b",
        "explanation": "Because..."
      }
    ]
  },
  {
    "id": "chapter-1",
    "title": "Cloud Concepts",
    "questions": [
      {
        "id": "q1",
        "text": "What is cloud computing?",
        "options": [
          { "id": "a", "text": "Option A" },
          { "id": "b", "text": "Option B" },
          { "id": "c", "text": "Option C" },
          { "id": "d", "text": "Option D" }
        ],
        "correctAnswer": "a",
        "explanation": "Cloud computing is..."
      }
    ]
  }
]
```

---

## Key UX Behaviors

| Behavior                    | Implementation                                                                                                                                              |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Answer persistence (exam)   | `localStorage` keyed by `certId + chapterId + mode`; save on every answer change                                                                            |
| Timer persistence           | Save remaining seconds to `localStorage`; restore on refresh                                                                                                |
| Resume/restart prompt       | When navigating to exam with existing saved data, prompt user to resume or start new                                                                        |
| Exit confirmation (browser) | `window.beforeunload` event as soft guard; data persists via localStorage                                                                                   |
| Exit confirmation (in-app)  | TanStack Router navigation blocker with custom modal; clears exam data on confirm                                                                           |
| Submit review modal         | Modal showing answered/unanswered count with confirm or go back options                                                                                     |
| Auto-submit on timer expiry | "Time's up!" modal (3 seconds, non-dismissable) → auto-navigate to results                                                                                  |
| Celebration animation       | `canvas-confetti` npm package on exam results page when score >= 80%                                                                                        |
| Exam shuffling              | Shuffle both question order and answer choice order on every new exam attempt                                                                               |
| 404 / Invalid routes        | Validate `certId` and `chapterId` in route loaders; redirect to `/certificates` if not found                                                                |
| Results without data        | Redirect to chapters page if no practice/exam data exists in localStorage                                                                                   |
| localStorage cleanup        | "Try Again" clears stored data; new exam attempt from chapters clears if user chooses "Start New"                                                           |
| Loading states              | Skeleton UI on quiz pages during hydration; static pages render instantly                                                                                   |
| Error handling              | Global error boundary with Za'atar illustration + friendly message + link to home; empty question sets show Za'atar with "No questions available yet" state |

---

## Implementation Plan

### Step 1: Project Setup

- Initialize TanStack Start project with Vite
- Configure Nitro for static site generation (GitHub Pages preset)
- Install dependencies: Tailwind CSS, shadcn/ui, canvas-confetti
- Initialize shadcn/ui (`npx shadcn@latest init`) and configure `components.json`
- Configure file-based routing with TanStack Router
- Add `favicon-logo.png` as the site favicon and store Za'atar assets (`favicon-logo.png`, `halfRobot.png`, `robot.png`) in `/public`
- Configure the Testology brand color palette in Tailwind theme
- **Files**: `package.json`, `vite.config.ts`, `app.config.ts`, `tailwind.config.ts`, `components.json`

### Step 2: Static Data & Types

- Create TypeScript types for Certificate, Chapter, Question
- Create sample JSON data files (1 certificate, 2-3 chapters, ~10 questions each as seed data)
- Create data utility functions to load and query the JSON
- Ensure all question ID references in code are scoped by `certId + chapterId`
- **Files**: `src/data/certificates.json`, `src/data/chapters/`, `src/types.ts`, `src/utils/data.ts`

### Step 3: Layout, SEO & Landing Page

- Create root layout with navigation bar (**Za'atar favicon-logo.png** as navbar logo, nav links, exam timer slot in top-right)
- Configure head management for per-route `<title>`, meta descriptions, and OpenGraph tags (use `favicon-logo.png` as `og:image`)
- Set up sitemap generation at build time
- Build landing page with hero section featuring **Za'atar (halfRobot.png)** and CTA
- Add global error boundary with **Za'atar (halfRobot.png)** illustration
- **Files**: `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/components/ErrorBoundary.tsx`

### Step 4: Certificates Page

- Build responsive card grid
- Each card pulls from static JSON
- "Let's Start" links to chapters page
- **Files**: `src/routes/certificates/index.tsx`, `src/components/CertificateCard.tsx`

### Step 5: Chapters Page

- Display certificate info + chapter list
- "All Chapters" card at top
- Each chapter card with Practice / Exam buttons
- **Files**: `src/routes/certificates/$certId/index.tsx`, `src/components/ChapterCard.tsx`

### Step 6: Practice Mode

- All questions on a single scrollable page
- Instant feedback on answer selection (green/red highlighting with icons + explanation)
- Submit button at bottom → navigates to results (`?mode=practice`)
- Skeleton loading state during hydration
- **Files**: `src/routes/certificates/$certId/chapters/$chapterId/practice.tsx`, `src/components/QuestionCard.tsx`

### Step 7: Exam Mode

- All questions on a single scrollable page with answer selection
- 60-minute countdown timer in navbar (top-right)
- localStorage persistence for answers + timer
- Resume/restart prompt when returning to an in-progress exam
- Submit button at bottom with review modal (answered/unanswered count)
- Auto-submit with "Time's up!" modal on timer expiry
- Question and answer choice shuffling on new attempts
- Skeleton loading state during hydration
- **Files**: `src/routes/certificates/$certId/chapters/$chapterId/exam.tsx`, `src/components/ExamQuestionCard.tsx`, `src/components/Timer.tsx`, `src/hooks/useExamState.ts`

### Step 8: Exit Confirmation

- `beforeunload` handler for browser close/refresh
- TanStack Router navigation blocker for in-app navigation
- Confirmation modal component
- **Files**: `src/hooks/useExitConfirmation.ts`, `src/components/ConfirmModal.tsx`

### Step 9: Results Page

- Shared results route with `?mode=exam|practice` query parameter
- Exam results: score with pass/fail, wrong answers review, canvas-confetti on >= 80%
- Practice results: score summary only (no wrong answers, no confetti)
- Redirect to chapters if no data in localStorage
- Try Again / Practice Again / Back navigation buttons (clears localStorage on retry)
- **Files**: `src/routes/certificates/$certId/chapters/$chapterId/results.tsx`, `src/components/ResultsSummary.tsx`, `src/components/WrongAnswerReview.tsx`

### Step 10: Polish & Responsiveness

- Ensure mobile responsiveness across all pages
- Verify accessibility: keyboard navigation, focus management, ARIA live regions, icon+text feedback
- Verify localStorage behavior (cleanup on new attempt, resume prompt)
- Test all navigation guards
- Verify SEO: titles, meta tags, sitemap, OpenGraph

---

## Verification

1. **Landing page** loads and CTA navigates to certificates
2. **Certificates page** shows cards from JSON, "Let's Start" navigates correctly
3. **Chapters page** shows all chapters + "All Chapters" option
4. **Practice mode**: all questions on one page, answer → instant green/red + icon feedback → submit → score summary on results page
5. **Exam mode**: all questions on one page, timer in navbar counts down, answers persist on refresh, resume prompt works
6. **Submit flow**: review modal shows answered/unanswered count, confirm navigates to results
7. **Timer expiry**: "Time's up!" modal appears, auto-submits after 3 seconds
8. **Exit confirmation**: modal on in-app navigation; `beforeunload` on tab close
9. **Results (exam)**: correct score shown, wrong answers reviewed with icons, confetti at 80%+
10. **Results (practice)**: score summary only, no wrong answers section
11. **All chapters**: uses its own curated cross-chapter question set, works in both practice and exam modes
12. **Responsive**: test on mobile, tablet, desktop viewports
13. **Accessibility**: keyboard navigation, screen reader support, colorblind-friendly feedback
14. **SEO**: unique page titles, meta descriptions, sitemap generated, OpenGraph tags present
15. **Error handling**: invalid routes redirect, missing data shows error boundary, empty chapters show empty state
16. **Static build**: site builds and deploys correctly to GitHub Pages
