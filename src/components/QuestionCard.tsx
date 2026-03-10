import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { cn } from '#/lib/utils'
import type { Question } from '#/types'

interface QuestionCardProps {
  question: Question
  index: number
  onAnswer: (questionId: string, answerId: string) => void
}

export default function QuestionCard({ question, index, onAnswer }: QuestionCardProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const answered = selectedId !== null
  const isCorrect = selectedId === question.correctAnswer

  function handleSelect(optionId: string) {
    if (answered) return
    setSelectedId(optionId)
    onAnswer(question.id, optionId)
  }

  return (
    <fieldset className="rounded-xl border border-border bg-card p-4 sm:p-6">
      <legend className="mb-4 text-base font-medium text-foreground">
        <span className="mr-2 text-muted-foreground">{index + 1}.</span>
        {question.text}
      </legend>

      <div className="space-y-2" role="radiogroup" aria-label={`Question ${index + 1}`}>
        {question.options.map((option) => {
          const isSelected = selectedId === option.id
          const isCorrectOption = option.id === question.correctAnswer

          let optionStyle = 'border-border bg-background hover:bg-muted cursor-pointer'
          if (answered) {
            if (isCorrectOption) {
              optionStyle = 'border-testology-success/50 bg-testology-success/10'
            } else if (isSelected && !isCorrect) {
              optionStyle = 'border-testology-error/50 bg-testology-error/10'
            } else {
              optionStyle = 'border-border bg-background opacity-60'
            }
          }

          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleSelect(option.id)}
              disabled={answered}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition sm:px-4 sm:py-3',
                optionStyle,
                answered && 'cursor-default',
              )}
            >
              <span className="flex-1 text-foreground">{option.text}</span>
              {answered && isCorrectOption && (
                <Check className="h-4 w-4 shrink-0 text-testology-success" aria-label="Correct answer" />
              )}
              {answered && isSelected && !isCorrect && (
                <X className="h-4 w-4 shrink-0 text-testology-error" aria-label="Incorrect answer" />
              )}
            </button>
          )
        })}
      </div>

      {answered && question.explanation && (
        <div className="mt-4 rounded-lg bg-muted px-3 py-2.5 text-sm text-muted-foreground sm:px-4 sm:py-3" aria-live="polite">
          {question.explanation}
        </div>
      )}
    </fieldset>
  )
}
