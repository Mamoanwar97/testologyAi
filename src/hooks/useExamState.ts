import { useState, useEffect, useCallback, useRef } from "react";
import type { Question } from "#/types";

const EXAM_DURATION = 60 * 60; // 60 minutes in seconds

interface ExamData {
  answers: Record<string, string>;
  timeRemaining: number;
  shuffledQuestions: Question[];
  startedAt: number;
}

function getStorageKey(certId: string, chapterId: string) {
  return `testology:${certId}:${chapterId}:exam`;
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i]!, shuffled[j]!] = [shuffled[j]!, shuffled[i]!];
  }
  return shuffled;
}

function shuffleQuestions(questions: Question[]): Question[] {
  return shuffleArray(questions).map((q) => ({
    ...q,
    options: shuffleArray(q.options),
  }));
}

function loadExamData(key: string): ExamData | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as ExamData;
  } catch {
    return null;
  }
}

function saveExamData(key: string, data: ExamData) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function clearExamData(certId: string, chapterId: string) {
  localStorage.removeItem(getStorageKey(certId, chapterId));
}

export type ExamStatus = "prompt" | "running" | "submitting" | "expired";

export function useExamState(
  certId: string,
  chapterId: string,
  originalQuestions: Question[],
) {
  const key = getStorageKey(certId, chapterId);
  const existing = loadExamData(key);

  const [status, setStatus] = useState<ExamStatus>(
    existing ? "prompt" : "running",
  );
  const [answers, setAnswers] = useState<Record<string, string>>(
    existing && status === "prompt" ? {} : {},
  );
  const [timeRemaining, setTimeRemaining] = useState(EXAM_DURATION);
  const [questions, setQuestions] = useState<Question[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize on first render
  useEffect(() => {
    if (existing && status === "prompt") {
      // Wait for user decision
      return;
    }
    if (status === "running" && questions.length === 0) {
      // Fresh start
      const shuffled = shuffleQuestions(originalQuestions);
      const data: ExamData = {
        answers: {},
        timeRemaining: EXAM_DURATION,
        shuffledQuestions: shuffled,
        startedAt: Date.now(),
      };
      saveExamData(key, data);
      setQuestions(shuffled);
      setAnswers({});
      setTimeRemaining(EXAM_DURATION);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // Resume existing attempt
  const resume = useCallback(() => {
    const data = loadExamData(key);
    if (data) {
      setQuestions(data.shuffledQuestions);
      setAnswers(data.answers);
      setTimeRemaining(data.timeRemaining);
      setStatus("running");
    }
  }, [key]);

  // Start new attempt
  const startNew = useCallback(() => {
    clearExamData(certId, chapterId);
    const shuffled = shuffleQuestions(originalQuestions);
    const data: ExamData = {
      answers: {},
      timeRemaining: EXAM_DURATION,
      shuffledQuestions: shuffled,
      startedAt: Date.now(),
    };
    saveExamData(key, data);
    setQuestions(shuffled);
    setAnswers({});
    setTimeRemaining(EXAM_DURATION);
    setStatus("running");
  }, [certId, chapterId, key, originalQuestions]);

  // Timer
  useEffect(() => {
    if (status !== "running") return;

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          if (timerRef.current) clearInterval(timerRef.current);
          setStatus("expired");
          return 0;
        }
        // Persist remaining time periodically
        const data = loadExamData(key);
        if (data) {
          data.timeRemaining = next;
          data.startedAt = Date.now();
          saveExamData(key, data);
        }
        return next;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, key]);

  // Select answer
  const selectAnswer = useCallback(
    (questionId: string, optionId: string) => {
      setAnswers((prev) => {
        const next = { ...prev, [questionId]: optionId };
        // Persist
        const data = loadExamData(key);
        if (data) {
          data.answers = next;
          saveExamData(key, data);
        }
        return next;
      });
    },
    [key],
  );

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;

  return {
    status,
    setStatus,
    questions,
    answers,
    timeRemaining,
    totalQuestions,
    answeredCount,
    unansweredCount,
    selectAnswer,
    resume,
    startNew,
    hasExisting: existing !== null,
  };
}
