import { Link } from "@tanstack/react-router";
import { BookOpen, Layers } from "lucide-react";
import { buttonVariants } from "#/components/ui/button";
import type { Chapter } from "#/types";

interface ChapterCardProps {
  chapter: Chapter;
  certId: string;
}

export default function ChapterCard({ chapter, certId }: ChapterCardProps) {
  const isAll = chapter.id === "all";
  const questionCount = chapter.questions.length;

  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-6 transition hover:shadow-md">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          {isAll ? (
            <Layers className="h-5 w-5 text-primary" />
          ) : (
            <BookOpen className="h-5 w-5 text-primary" />
          )}
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">
            {chapter.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {questionCount} {questionCount === 1 ? "question" : "questions"}
          </p>
        </div>
      </div>

      <div className="mt-auto flex gap-3 pt-4">
        {!isAll && (
          <Link
            to="/certificates/$certId/chapters/$chapterId/practice"
            params={{ certId, chapterId: chapter.id }}
            className={
              buttonVariants({ variant: "outline" }) + " flex-1 no-underline"
            }
          >
            Practice
          </Link>
        )}
        <Link
          to="/certificates/$certId/chapters/$chapterId/exam"
          params={{ certId, chapterId: chapter.id }}
          className={buttonVariants() + " flex-1 no-underline"}
        >
          Exam
        </Link>
      </div>
    </article>
  );
}
