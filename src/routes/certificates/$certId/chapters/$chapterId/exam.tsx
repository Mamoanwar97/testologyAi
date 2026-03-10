import { useState, useEffect } from 'react'
import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import ExamQuestionCard from '#/components/ExamQuestionCard'
import Timer from '#/components/Timer'
import { Button } from '#/components/ui/button'
import { useExitConfirmation } from '#/hooks/useExitConfirmation'
import { useExamState, clearExamData } from '#/hooks/useExamState'
import { getCertificateById, getChapterById } from '#/utils/data'

export const Route = createFileRoute(
  '/certificates/$certId/chapters/$chapterId/exam',
)({
  loader: ({ params }) => {
    const certificate = getCertificateById(params.certId)
    if (!certificate) throw notFound()
    const chapter = getChapterById(params.certId, params.chapterId)
    if (!chapter) throw notFound()
    return { certificate, chapter }
  },
  head: ({ loaderData }) => {
    const certTitle = loaderData?.certificate.title ?? 'Certificate'
    const chTitle = loaderData?.chapter.title ?? 'Exam'
    return {
      meta: [
        { title: `Exam: ${chTitle} — ${certTitle} — Testology` },
        {
          name: 'description',
          content: `Timed exam for ${chTitle} — ${certTitle}. 60-minute countdown with exam simulation.`,
        },
        { property: 'og:title', content: `Exam: ${chTitle} — ${certTitle} — Testology` },
        { property: 'og:description', content: `Timed exam for ${chTitle} — ${certTitle}.` },
        { property: 'og:image', content: `${import.meta.env.BASE_URL}favicon-logo.png` },
      ],
    }
  },
  notFoundComponent: NotFoundComponent,
  component: ExamPage,
})

function NotFoundComponent() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <img
        src={`${import.meta.env.BASE_URL}halfRobot.png`}
        alt="Za'atar — Testology mascot"
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
  )
}

function ExamPage() {
  const { certificate, chapter } = Route.useLoaderData()
  const { certId, chapterId } = Route.useParams()
  const exam = useExamState(certId, chapterId, chapter.questions)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showTimesUp, setShowTimesUp] = useState(false)

  // Block navigation while exam is running
  const blocker = useExitConfirmation(exam.status === 'running')

  // Auto-submit on timer expiry
  useEffect(() => {
    if (exam.status === 'expired') {
      setShowTimesUp(true)
      const timeout = setTimeout(() => {
        submitExam()
      }, 3000)
      return () => clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exam.status])

  function submitExam() {
    // Save final answers for results page
    const key = `testology:${certId}:${chapterId}:exam`
    localStorage.setItem(
      key,
      JSON.stringify({
        answers: exam.answers,
        questions: exam.questions,
      }),
    )
    window.location.href = `${import.meta.env.BASE_URL}certificates/${certId}/chapters/${chapterId}/results?mode=exam`
  }

  // Resume/Restart prompt
  if (exam.status === 'prompt') {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="mb-2 text-2xl font-bold text-foreground">
          Resume Exam?
        </h1>
        <p className="mb-8 max-w-md text-muted-foreground">
          You have an in-progress attempt for{' '}
          <strong>{chapter.title}</strong>. Would you like to resume or
          start a new exam?
        </p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={exam.startNew}>
            Start New
          </Button>
          <Button onClick={exam.resume}>Resume Exam</Button>
        </div>
      </main>
    )
  }

  // Time's up modal
  if (showTimesUp) {
    return (
      <>
        <Timer timeRemaining={0} />
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="rounded-xl bg-card p-8 text-center shadow-lg">
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              Time's Up!
            </h2>
            <p className="text-muted-foreground">
              Submitting your answers automatically...
            </p>
          </div>
        </div>
      </>
    )
  }

  // Empty state — chapter has no questions
  if (chapter.questions.length === 0) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
        <img
          src={`${import.meta.env.BASE_URL}halfRobot.png`}
          alt="Za'atar — Testology mascot"
          className="mb-6 h-40 w-auto opacity-80"
        />
        <p className="text-lg font-medium text-foreground">No questions available yet</p>
        <p className="mt-1 text-sm text-muted-foreground">Check back later for new content.</p>
      </main>
    )
  }

  // Waiting for questions to load
  if (exam.questions.length === 0) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </main>
    )
  }

  return (
    <>
      <Timer timeRemaining={exam.timeRemaining} />

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
              Exam: {chapter.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {exam.answeredCount}/{exam.totalQuestions} answered
            </p>
          </div>

          {/* Questions */}
          <section aria-label="Exam questions" className="space-y-6">
            {exam.questions.map((question, index) => (
              <ExamQuestionCard
                key={question.id}
                question={question}
                index={index}
                selectedAnswer={exam.answers[question.id]}
                onSelect={exam.selectAnswer}
              />
            ))}
          </section>

          {/* Submit */}
          <div className="mt-10 flex justify-center">
            <Button size="lg" onClick={() => setShowReviewModal(true)}>
              Submit Exam
            </Button>
          </div>
        </div>
      </main>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" role="dialog" aria-modal="true" aria-labelledby="review-title">
          <div className="mx-4 w-full max-w-md rounded-xl bg-card p-6 shadow-lg">
            <h2 id="review-title" className="mb-4 text-xl font-bold text-foreground">
              Review Submission
            </h2>
            <div className="mb-6 space-y-2 text-sm">
              <p className="text-foreground">
                Answered:{' '}
                <strong className="text-primary">{exam.answeredCount}</strong> /{' '}
                {exam.totalQuestions}
              </p>
              {exam.unansweredCount > 0 && (
                <p className="text-testology-error">
                  {exam.unansweredCount} question
                  {exam.unansweredCount === 1 ? '' : 's'} unanswered
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowReviewModal(false)}
              >
                Go Back
              </Button>
              <Button className="flex-1" onClick={submitExam}>
                Confirm Submit
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Confirmation Modal */}
      {blocker.status === 'blocked' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" role="dialog" aria-modal="true" aria-labelledby="exit-title">
          <div className="mx-4 w-full max-w-md rounded-xl bg-card p-6 shadow-lg">
            <h2 id="exit-title" className="mb-2 text-xl font-bold text-foreground">
              Leave Exam?
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Are you sure you want to leave? Your progress will be lost.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={blocker.reset}
              >
                Stay
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => {
                  clearExamData(certId, chapterId)
                  blocker.proceed()
                }}
              >
                Leave
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
