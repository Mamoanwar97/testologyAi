import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import confetti from "canvas-confetti";
import { Check, X } from "lucide-react";
import { a as Route, B as Button } from "./router-BW4Bv_jw.js";
import "@base-ui/react/button";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function ResultsSummary({
  score,
  total,
  percentage,
  mode,
  passed
}) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-8 text-center", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "mx-auto mb-6 flex h-28 w-28 flex-col items-center justify-center rounded-full border-4 border-border bg-card shadow-sm sm:h-36 sm:w-36",
        "aria-label": `Score: ${score} out of ${total}, ${percentage} percent`,
        role: "img",
        children: [
          /* @__PURE__ */ jsxs("span", { className: "text-3xl font-bold text-foreground sm:text-4xl", children: [
            score,
            "/",
            total
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-base font-medium text-muted-foreground sm:text-lg", children: [
            percentage,
            "%"
          ] })
        ]
      }
    ),
    mode === "exam" && passed !== void 0 && /* @__PURE__ */ jsx(
      "div",
      {
        className: "mb-2 flex items-center justify-center gap-2",
        "aria-live": "polite",
        children: passed ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Check,
            {
              className: "h-6 w-6 text-testology-success",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-testology-success", children: "Congratulations!" })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(X, { className: "h-6 w-6 text-testology-error", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-testology-error", children: "Keep Practicing!" })
        ] })
      }
    ),
    mode === "exam" && passed !== void 0 && /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: passed ? "You passed the exam! Great job mastering this material." : `You need 80% to pass. Keep studying and try again!` }),
    mode === "practice" && /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground", children: [
      "You answered ",
      score,
      " out of ",
      total,
      " questions correctly."
    ] })
  ] });
}
function WrongAnswerReview({
  questions,
  answers
}) {
  const wrongQuestions = questions.filter(
    (q) => answers[q.id] && answers[q.id] !== q.correctAnswer
  );
  if (wrongQuestions.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-testology-success/30 bg-testology-success/5 p-6 text-center", children: [
      /* @__PURE__ */ jsx(
        Check,
        {
          className: "mx-auto mb-2 h-8 w-8 text-testology-success",
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "font-medium text-testology-success", children: "Perfect score! You got every question right." })
    ] });
  }
  return /* @__PURE__ */ jsxs("section", { "aria-label": "Wrong answers review", children: [
    /* @__PURE__ */ jsxs("h3", { className: "mb-4 text-lg font-bold text-foreground", children: [
      "Review Wrong Answers (",
      wrongQuestions.length,
      ")"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: wrongQuestions.map((question) => {
      const userAnswerId = answers[question.id];
      const userAnswer = question.options.find(
        (o) => o.id === userAnswerId
      );
      const correctAnswer = question.options.find(
        (o) => o.id === question.correctAnswer
      );
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "rounded-xl border border-border bg-card p-5",
          children: [
            /* @__PURE__ */ jsx("p", { className: "mb-3 font-medium text-foreground", children: question.text }),
            /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-start gap-2 rounded-lg border border-testology-error/50 bg-testology-error/10 px-3 py-2", children: [
              /* @__PURE__ */ jsx(
                X,
                {
                  className: "mt-0.5 h-4 w-4 shrink-0 text-testology-error",
                  "aria-label": "Your answer (incorrect)"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-foreground", children: userAnswer?.text ?? "No answer selected" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 rounded-lg border border-testology-success/50 bg-testology-success/10 px-3 py-2", children: [
              /* @__PURE__ */ jsx(
                Check,
                {
                  className: "mt-0.5 h-4 w-4 shrink-0 text-testology-success",
                  "aria-label": "Correct answer"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-foreground", children: correctAnswer?.text ?? "Unknown" })
            ] }),
            question.explanation && /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: question.explanation })
          ]
        },
        question.id
      );
    }) })
  ] });
}
const PASS_THRESHOLD = 0.8;
function ResultsPage() {
  const {
    certificate,
    chapter
  } = Route.useLoaderData();
  const {
    certId,
    chapterId
  } = Route.useParams();
  const {
    mode
  } = Route.useSearch();
  const confettiFired = useRef(false);
  const storageKey = `testology:${certId}:${chapterId}:${mode}`;
  const raw = typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;
  useEffect(() => {
    if (!raw) {
      window.location.href = `${"/testologyAi/"}certificates/${certId}`;
    }
  }, [raw, certId]);
  let answers = {};
  let questions = chapter.questions;
  if (raw) {
    if (mode === "exam") {
      const examData = JSON.parse(raw);
      answers = examData.answers;
      questions = examData.questions;
    } else {
      answers = JSON.parse(raw);
    }
  }
  const total = questions.length;
  const score = questions.filter((q) => answers[q.id] === q.correctAnswer).length;
  const percentage = total > 0 ? Math.round(score / total * 100) : 0;
  const passed = mode === "exam" ? percentage >= PASS_THRESHOLD * 100 : void 0;
  useEffect(() => {
    if (mode === "exam" && passed && !confettiFired.current) {
      let frame = function() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: {
            x: 0
          },
          colors
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: {
            x: 1
          },
          colors
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;
      confettiFired.current = true;
      const end = Date.now() + 2e3;
      const colors = ["#2563EB", "#00B4FF", "#16A34A", "#60A5FA"];
      frame();
    }
  }, [mode, passed]);
  if (!raw) return null;
  function handleTryAgain() {
    localStorage.removeItem(storageKey);
    window.location.href = `${"/testologyAi/"}certificates/${certId}/chapters/${chapterId}/${mode}`;
  }
  return /* @__PURE__ */ jsx("main", { className: "px-4 py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/certificates/$certId", params: {
      certId
    }, className: "mb-8 inline-block text-sm text-muted-foreground hover:text-foreground", children: [
      "← Back to ",
      certificate.title
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-6 flex justify-center", children: /* @__PURE__ */ jsx("img", { src: `${"/testologyAi/"}halfRobot.png`, alt: "Za'atar — testologyAI mascot", className: "h-40 w-auto" }) }),
    /* @__PURE__ */ jsx(ResultsSummary, { score, total, percentage, mode, passed }),
    /* @__PURE__ */ jsxs("div", { className: "mb-10 flex flex-wrap items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: handleTryAgain, children: mode === "exam" ? "Try Again" : "Practice Again" }),
      /* @__PURE__ */ jsx(Link, { to: "/certificates/$certId", params: {
        certId
      }, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: "Back to Chapters" }) })
    ] }),
    mode === "exam" && /* @__PURE__ */ jsx(WrongAnswerReview, { questions, answers })
  ] }) });
}
export {
  ResultsPage as component
};
