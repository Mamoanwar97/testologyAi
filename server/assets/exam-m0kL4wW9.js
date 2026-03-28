import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect, useCallback } from "react";
import { useBlocker, Link } from "@tanstack/react-router";
import { c as cn, e as Route, B as Button } from "./router-BW4Bv_jw.js";
import { createPortal } from "react-dom";
import { Clock } from "lucide-react";
import "@base-ui/react/button";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function ExamQuestionCard({
  question,
  index,
  selectedAnswer,
  onSelect
}) {
  return /* @__PURE__ */ jsxs("fieldset", { className: "rounded-xl border border-border bg-card p-4 sm:p-6", children: [
    /* @__PURE__ */ jsxs("legend", { className: "mb-4 text-base font-medium text-foreground", children: [
      /* @__PURE__ */ jsxs("span", { className: "mr-2 text-muted-foreground", children: [
        index + 1,
        "."
      ] }),
      question.text
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "space-y-2",
        role: "radiogroup",
        "aria-label": `Question ${index + 1}`,
        children: question.options.map((option) => {
          const isSelected = selectedAnswer === option.id;
          return /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": isSelected,
              onClick: () => onSelect(question.id, option.id),
              className: cn(
                "flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition sm:px-4 sm:py-3",
                isSelected ? "border-primary bg-primary/10" : "border-border bg-background hover:bg-muted"
              ),
              children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                      isSelected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40 text-muted-foreground"
                    ),
                    children: option.id.toUpperCase()
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "flex-1 text-foreground", children: option.text })
              ]
            },
            option.id
          );
        })
      }
    )
  ] });
}
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}
function Timer({ timeRemaining }) {
  const isLow = timeRemaining <= 300;
  const isCritical = timeRemaining <= 60;
  const isAnnounceThreshold = timeRemaining === 300 || timeRemaining === 60 || timeRemaining === 0;
  const timerSlot = typeof document !== "undefined" ? document.getElementById("exam-timer-slot") : null;
  const timerContent = /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-mono font-semibold sm:px-4 sm:py-2 sm:text-lg",
        isCritical ? "bg-testology-error/10 text-testology-error animate-pulse" : isLow ? "bg-testology-error/10 text-testology-error" : "bg-muted text-foreground"
      ),
      role: "timer",
      "aria-live": isAnnounceThreshold ? "assertive" : "off",
      "aria-label": `${Math.floor(timeRemaining / 60)} minutes and ${timeRemaining % 60} seconds remaining`,
      children: [
        /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 sm:h-5 sm:w-5" }),
        formatTime(timeRemaining)
      ]
    }
  );
  if (timerSlot) {
    return createPortal(timerContent, timerSlot);
  }
  return timerContent;
}
function useExitConfirmation(enabled) {
  return useBlocker({
    shouldBlockFn: () => enabled,
    enableBeforeUnload: false,
    withResolver: true
  });
}
const EXAM_DURATION = 60 * 60;
function getStorageKey(certId, chapterId) {
  return `testology:${certId}:${chapterId}:exam`;
}
function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
function shuffleQuestions(questions) {
  return shuffleArray(questions).map((q) => ({
    ...q,
    options: shuffleArray(q.options)
  }));
}
function loadExamData(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
function saveExamData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
function clearExamData(certId, chapterId) {
  localStorage.removeItem(getStorageKey(certId, chapterId));
}
function useExamState(certId, chapterId, originalQuestions) {
  const key = getStorageKey(certId, chapterId);
  const existing = loadExamData(key);
  const [status, setStatus] = useState(
    existing ? "prompt" : "running"
  );
  const [answers, setAnswers] = useState(
    existing && status === "prompt" ? {} : {}
  );
  const [timeRemaining, setTimeRemaining] = useState(EXAM_DURATION);
  const [questions, setQuestions] = useState([]);
  const timerRef = useRef(null);
  useEffect(() => {
    if (existing && status === "prompt") {
      return;
    }
    if (status === "running" && questions.length === 0) {
      const shuffled = shuffleQuestions(originalQuestions);
      const data = {
        answers: {},
        timeRemaining: EXAM_DURATION,
        shuffledQuestions: shuffled,
        startedAt: Date.now()
      };
      saveExamData(key, data);
      setQuestions(shuffled);
      setAnswers({});
      setTimeRemaining(EXAM_DURATION);
    }
  }, [status]);
  const resume = useCallback(() => {
    const data = loadExamData(key);
    if (data) {
      setQuestions(data.shuffledQuestions);
      setAnswers(data.answers);
      setTimeRemaining(data.timeRemaining);
      setStatus("running");
    }
  }, [key]);
  const startNew = useCallback(() => {
    clearExamData(certId, chapterId);
    const shuffled = shuffleQuestions(originalQuestions);
    const data = {
      answers: {},
      timeRemaining: EXAM_DURATION,
      shuffledQuestions: shuffled,
      startedAt: Date.now()
    };
    saveExamData(key, data);
    setQuestions(shuffled);
    setAnswers({});
    setTimeRemaining(EXAM_DURATION);
    setStatus("running");
  }, [certId, chapterId, key, originalQuestions]);
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
        const data = loadExamData(key);
        if (data) {
          data.timeRemaining = next;
          data.startedAt = Date.now();
          saveExamData(key, data);
        }
        return next;
      });
    }, 1e3);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, key]);
  const selectAnswer = useCallback(
    (questionId, optionId) => {
      setAnswers((prev) => {
        const next = { ...prev, [questionId]: optionId };
        const data = loadExamData(key);
        if (data) {
          data.answers = next;
          saveExamData(key, data);
        }
        return next;
      });
    },
    [key]
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
    hasExisting: existing !== null
  };
}
function ExamPage() {
  const {
    certificate,
    chapter
  } = Route.useLoaderData();
  const {
    certId,
    chapterId
  } = Route.useParams();
  const exam = useExamState(certId, chapterId, chapter.questions);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showTimesUp, setShowTimesUp] = useState(false);
  const blocker = useExitConfirmation(exam.status === "running");
  useEffect(() => {
    if (exam.status === "expired") {
      setShowTimesUp(true);
      const timeout = setTimeout(() => {
        submitExam();
      }, 3e3);
      return () => clearTimeout(timeout);
    }
  }, [exam.status]);
  function submitExam() {
    const key = `testology:${certId}:${chapterId}:exam`;
    localStorage.setItem(key, JSON.stringify({
      answers: exam.answers,
      questions: exam.questions
    }));
    window.location.href = `${"/testologyAi/"}certificates/${certId}/chapters/${chapterId}/results?mode=exam`;
  }
  if (exam.status === "prompt") {
    return /* @__PURE__ */ jsxs("main", { className: "flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-2 text-2xl font-bold text-foreground", children: "Resume Exam?" }),
      /* @__PURE__ */ jsxs("p", { className: "mb-8 max-w-md text-muted-foreground", children: [
        "You have an in-progress attempt for ",
        /* @__PURE__ */ jsx("strong", { children: chapter.title }),
        ". Would you like to resume or start a new exam?"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: exam.startNew, children: "Start New" }),
        /* @__PURE__ */ jsx(Button, { onClick: exam.resume, children: "Resume Exam" })
      ] })
    ] });
  }
  if (showTimesUp) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Timer, { timeRemaining: 0 }),
      /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50", children: /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-card p-8 text-center shadow-lg", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-2 text-2xl font-bold text-foreground", children: "Time's Up!" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Submitting your answers automatically..." })
      ] }) })
    ] });
  }
  if (chapter.questions.length === 0) {
    return /* @__PURE__ */ jsxs("main", { className: "flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsx("img", { src: `${"/testologyAi/"}halfRobot.png`, alt: "Za'atar — testologyAI mascot", className: "mb-6 h-40 w-auto opacity-80" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg font-medium text-foreground", children: "No questions available yet" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Check back later for new content." })
    ] });
  }
  if (exam.questions.length === 0) {
    return /* @__PURE__ */ jsx("main", { className: "flex min-h-[60vh] items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" }) });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Timer, { timeRemaining: exam.timeRemaining }),
    /* @__PURE__ */ jsx("main", { className: "px-4 py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/certificates/$certId", params: {
          certId
        }, className: "mb-4 inline-block text-sm text-muted-foreground hover:text-foreground", children: [
          "← Back to ",
          certificate.title
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "mb-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl", children: [
          "Exam: ",
          chapter.title
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          exam.answeredCount,
          "/",
          exam.totalQuestions,
          " answered"
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { "aria-label": "Exam questions", className: "space-y-6", children: exam.questions.map((question, index) => /* @__PURE__ */ jsx(ExamQuestionCard, { question, index, selectedAnswer: exam.answers[question.id], onSelect: exam.selectAnswer }, question.id)) }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 flex justify-center", children: /* @__PURE__ */ jsx(Button, { size: "lg", onClick: () => setShowReviewModal(true), children: "Submit Exam" }) })
    ] }) }),
    showReviewModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50", role: "dialog", "aria-modal": "true", "aria-labelledby": "review-title", children: /* @__PURE__ */ jsxs("div", { className: "mx-4 w-full max-w-md rounded-xl bg-card p-6 shadow-lg", children: [
      /* @__PURE__ */ jsx("h2", { id: "review-title", className: "mb-4 text-xl font-bold text-foreground", children: "Review Submission" }),
      /* @__PURE__ */ jsxs("div", { className: "mb-6 space-y-2 text-sm", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-foreground", children: [
          "Answered:",
          " ",
          /* @__PURE__ */ jsx("strong", { className: "text-primary", children: exam.answeredCount }),
          " /",
          " ",
          exam.totalQuestions
        ] }),
        exam.unansweredCount > 0 && /* @__PURE__ */ jsxs("p", { className: "text-testology-error", children: [
          exam.unansweredCount,
          " question",
          exam.unansweredCount === 1 ? "" : "s",
          " unanswered"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", className: "flex-1", onClick: () => setShowReviewModal(false), children: "Go Back" }),
        /* @__PURE__ */ jsx(Button, { className: "flex-1", onClick: submitExam, children: "Confirm Submit" })
      ] })
    ] }) }),
    blocker.status === "blocked" && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50", role: "dialog", "aria-modal": "true", "aria-labelledby": "exit-title", children: /* @__PURE__ */ jsxs("div", { className: "mx-4 w-full max-w-md rounded-xl bg-card p-6 shadow-lg", children: [
      /* @__PURE__ */ jsx("h2", { id: "exit-title", className: "mb-2 text-xl font-bold text-foreground", children: "Leave Exam?" }),
      /* @__PURE__ */ jsx("p", { className: "mb-6 text-sm text-muted-foreground", children: "Are you sure you want to leave? Your progress will be lost." }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", className: "flex-1", onClick: blocker.reset, children: "Stay" }),
        /* @__PURE__ */ jsx(Button, { variant: "destructive", className: "flex-1", onClick: () => {
          clearExamData(certId, chapterId);
          blocker.proceed();
        }, children: "Leave" })
      ] })
    ] }) })
  ] });
}
export {
  ExamPage as component
};
