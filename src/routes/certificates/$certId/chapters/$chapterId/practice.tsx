import { useState, useCallback } from "react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import QuestionCard from "#/components/QuestionCard";
import { Button } from "#/components/ui/button";
import { getCertificateById, getChapterById } from "#/utils/data";
import { seo, seoLinks } from "#/utils/seo";

export const Route = createFileRoute(
  "/certificates/$certId/chapters/$chapterId/practice",
)({
  loader: ({ params }) => {
    const certificate = getCertificateById(params.certId);
    if (!certificate) throw notFound();
    const chapter = getChapterById(params.certId, params.chapterId);
    if (!chapter) throw notFound();
    return { certificate, chapter };
  },
  head: ({ loaderData, params }) => {
    const certTitle = loaderData?.certificate.title ?? "Certificate";
    const chTitle = loaderData?.chapter.title ?? "Practice";
    const path = `/certificates/${params.certId}/chapters/${params.chapterId}/practice`;
    return {
      meta: seo({
        title: `Practice: ${chTitle} — ${certTitle} — TestologyAI`,
        description: `Practice ${chTitle} questions for ${certTitle}. Review your answers after submission.`,
        image: `${import.meta.env.BASE_URL}thumbnail.png`,
        path,
      }),
      links: seoLinks(path),
    };
  },
  notFoundComponent: NotFoundComponent,
  component: PracticePage,
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

function PracticePage() {
  const { certificate, chapter } = Route.useLoaderData();
  const { certId, chapterId } = Route.useParams();
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = useCallback((questionId: string, answerId: string) => {
    setAnswers((prev) => {
      const updated = { ...prev, [questionId]: answerId };
      return updated;
    });
  }, []);

  const totalQuestions = chapter.practiceQuestions.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === totalQuestions;

  function handleSubmit() {
    // Store answers and questions in localStorage for the results page
    const key = `testology:${certId}:${chapterId}:practice`;
    localStorage.setItem(
      key,
      JSON.stringify({ answers, questions: chapter.practiceQuestions }),
    );
    window.location.href = `${import.meta.env.BASE_URL}certificates/${certId}/chapters/${chapterId}/results?mode=practice`;
  }

  return (
    <main className="px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/certificates/$certId"
            params={{ certId }}
            className="mb-4 inline-block text-sm text-muted-foreground hover:text-foreground"
          >
            &larr; Back to {certificate.title}
          </Link>
          <h1 className="mb-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Practice: {chapter.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {answeredCount}/{totalQuestions} answered
          </p>
        </div>

        {/* Questions */}
        {totalQuestions === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <img
              src={`${import.meta.env.BASE_URL}halfRobot.png`}
              alt="Za'atar — testologyAI mascot"
              className="mb-6 h-40 w-auto opacity-80"
            />
            <p className="text-lg font-medium text-foreground">
              No questions available yet
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Check back later for new content.
            </p>
          </div>
        ) : (
          <>
            <section aria-label="Practice questions" className="space-y-6">
              {chapter.practiceQuestions.map((question, index) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  index={index}
                  selectedAnswer={answers[question.id]}
                  onAnswer={handleAnswer}
                />
              ))}
            </section>

            {/* Submit */}
            <div className="mt-10 flex justify-center">
              <Button size="lg" onClick={handleSubmit} disabled={!allAnswered}>
                {allAnswered
                  ? "Submit Answers"
                  : `Answer all questions (${answeredCount}/${totalQuestions})`}
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
