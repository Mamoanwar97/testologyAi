import { useEffect, useRef } from "react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import confetti from "canvas-confetti";
import ResultsSummary from "#/components/ResultsSummary";
import WrongAnswerReview from "#/components/WrongAnswerReview";
import { Button } from "#/components/ui/button";
import type { Question } from "#/types";
import { getCertificateById, getChapterById } from "#/utils/data";
import { seo, seoLinks } from "#/utils/seo";

const PASS_THRESHOLD = 0.8;

interface ExamData {
  answers: Record<string, string>;
  questions: Question[];
}

export const Route = createFileRoute(
  "/certificates/$certId/chapters/$chapterId/results",
)({
  validateSearch: (search: Record<string, unknown>) => ({
    mode: (search.mode as "exam" | "practice") || "exam",
  }),
  loader: ({ params }) => {
    const certificate = getCertificateById(params.certId);
    if (!certificate) throw notFound();
    const chapter = getChapterById(params.certId, params.chapterId);
    if (!chapter) throw notFound();
    return { certificate, chapter };
  },
  head: ({ loaderData, params }) => {
    const certTitle = loaderData?.certificate.title ?? "Certificate";
    const chTitle = loaderData?.chapter.title ?? "Results";
    const path = `/certificates/${params.certId}/chapters/${params.chapterId}/results`;
    return {
      meta: seo({
        title: `Results: ${chTitle} — ${certTitle} — TestologyAI`,
        description: `Results for ${chTitle} — ${certTitle}.`,
        image: `${import.meta.env.BASE_URL}thumbnail.png`,
        path,
      }),
      links: seoLinks(path),
    };
  },
  notFoundComponent: NotFoundComponent,
  component: ResultsPage,
});

function NotFoundComponent() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <img
        src={`${import.meta.env.BASE_URL}halfRobot.png`}
        alt="Za'atar — testologyAI mascot"
        className="mb-6 h-48 w-auto opacity-80"
      />
      <h1 className="mb-2 text-2xl font-bold text-foreground">
        Chapter not found
      </h1>
      <p className="mb-6 text-muted-foreground">
        This chapter doesn't exist. Let's get you back on track.
      </p>
      <a
        href={`${import.meta.env.BASE_URL}certificates`}
        className="text-sm font-medium text-primary hover:underline"
      >
        Back to Certificates
      </a>
    </main>
  );
}

function ResultsPage() {
  const { certificate, chapter } = Route.useLoaderData();
  const { certId, chapterId } = Route.useParams();
  const { mode } = Route.useSearch();
  const confettiFired = useRef(false);

  const storageKey = `testology:${certId}:${chapterId}:${mode}`;
  const raw =
    typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;

  // Redirect if no data
  useEffect(() => {
    if (!raw) {
      window.location.href = `${import.meta.env.BASE_URL}certificates/${certId}`;
    }
  }, [raw, certId]);

  // Parse stored data
  let answers: Record<string, string> = {};
  let questions: Question[] = mode === "exam" ? chapter.examQuestions : chapter.practiceQuestions;

  if (raw) {
    const parsed: ExamData = JSON.parse(raw);
    answers = parsed.answers;
    questions = parsed.questions;
  }

  // Calculate score
  const total = questions.length;
  const score = questions.filter(
    (q) => answers[q.id] === q.correctAnswer,
  ).length;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const passed =
    mode === "exam" ? percentage >= PASS_THRESHOLD * 100 : undefined;

  // Fire confetti on pass (respect reduced motion)
  useEffect(() => {
    if (mode === "exam" && passed && !confettiFired.current) {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;
      confettiFired.current = true;
      const end = Date.now() + 2000;
      const colors = ["#2563EB", "#00B4FF", "#16A34A", "#60A5FA"];

      function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }
      frame();
    }
  }, [mode, passed]);

  if (!raw) return null;

  function handleTryAgain() {
    localStorage.removeItem(storageKey);
    window.location.href = `${import.meta.env.BASE_URL}certificates/${certId}/chapters/${chapterId}/${mode}`;
  }

  return (
    <main className="px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        {/* Back link */}
        <Link
          to="/certificates/$certId"
          params={{ certId }}
          className="mb-8 inline-block text-sm text-muted-foreground hover:text-foreground"
        >
          &larr; Back to {certificate.title}
        </Link>

        {/* Za'atar mascot */}
        <div className="mb-6 flex justify-center">
          <img
            src={`${import.meta.env.BASE_URL}halfRobot.png`}
            alt="Za'atar — testologyAI mascot"
            className="h-40 w-auto"
          />
        </div>

        {/* Score summary */}
        <ResultsSummary
          score={score}
          total={total}
          percentage={percentage}
          mode={mode}
          passed={passed}
        />

        {/* Action buttons */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          <Button variant="outline" onClick={handleTryAgain}>
            {mode === "exam" ? "Try Again" : "Practice Again"}
          </Button>
          <Link to="/certificates/$certId" params={{ certId }}>
            <Button variant="secondary">Back to Chapters</Button>
          </Link>
        </div>

        {/* Wrong answers review */}
        <WrongAnswerReview questions={questions} answers={answers} />
      </div>
    </main>
  );
}
