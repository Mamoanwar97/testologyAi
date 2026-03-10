import { Check, X } from "lucide-react";
import type { Question } from "#/types";

interface WrongAnswerReviewProps {
  questions: Question[];
  answers: Record<string, string>;
}

export default function WrongAnswerReview({
  questions,
  answers,
}: WrongAnswerReviewProps) {
  const wrongQuestions = questions.filter(
    (q) => answers[q.id] && answers[q.id] !== q.correctAnswer,
  );

  if (wrongQuestions.length === 0) {
    return (
      <div className="rounded-xl border border-testology-success/30 bg-testology-success/5 p-6 text-center">
        <Check
          className="mx-auto mb-2 h-8 w-8 text-testology-success"
          aria-hidden="true"
        />
        <p className="font-medium text-testology-success">
          Perfect score! You got every question right.
        </p>
      </div>
    );
  }

  return (
    <section aria-label="Wrong answers review">
      <h3 className="mb-4 text-lg font-bold text-foreground">
        Review Wrong Answers ({wrongQuestions.length})
      </h3>
      <div className="space-y-4">
        {wrongQuestions.map((question) => {
          const userAnswerId = answers[question.id];
          const userAnswer = question.options.find(
            (o) => o.id === userAnswerId,
          );
          const correctAnswer = question.options.find(
            (o) => o.id === question.correctAnswer,
          );

          return (
            <div
              key={question.id}
              className="rounded-xl border border-border bg-card p-5"
            >
              <p className="mb-3 font-medium text-foreground">
                {question.text}
              </p>

              {/* User's wrong answer */}
              <div className="mb-2 flex items-start gap-2 rounded-lg border border-testology-error/50 bg-testology-error/10 px-3 py-2">
                <X
                  className="mt-0.5 h-4 w-4 shrink-0 text-testology-error"
                  aria-label="Your answer (incorrect)"
                />
                <span className="text-sm text-foreground">
                  {userAnswer?.text ?? "No answer selected"}
                </span>
              </div>

              {/* Correct answer */}
              <div className="flex items-start gap-2 rounded-lg border border-testology-success/50 bg-testology-success/10 px-3 py-2">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-testology-success"
                  aria-label="Correct answer"
                />
                <span className="text-sm text-foreground">
                  {correctAnswer?.text ?? "Unknown"}
                </span>
              </div>

              {/* Explanation */}
              {question.explanation && (
                <p className="mt-3 text-sm text-muted-foreground">
                  {question.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
