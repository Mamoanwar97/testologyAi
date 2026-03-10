import { cn } from "#/lib/utils";
import type { Question } from "#/types";

interface ExamQuestionCardProps {
  question: Question;
  index: number;
  selectedAnswer: string | undefined;
  onSelect: (questionId: string, optionId: string) => void;
}

export default function ExamQuestionCard({
  question,
  index,
  selectedAnswer,
  onSelect,
}: ExamQuestionCardProps) {
  return (
    <fieldset className="rounded-xl border border-border bg-card p-4 sm:p-6">
      <legend className="mb-4 text-base font-medium text-foreground">
        <span className="mr-2 text-muted-foreground">{index + 1}.</span>
        {question.text}
      </legend>

      <div
        className="space-y-2"
        role="radiogroup"
        aria-label={`Question ${index + 1}`}
      >
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option.id;

          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(question.id, option.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition sm:px-4 sm:py-3",
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-border bg-background hover:bg-muted",
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/40 text-muted-foreground",
                )}
              >
                {option.id.toUpperCase()}
              </span>
              <span className="flex-1 text-foreground">{option.text}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
