import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { c as cn, d as Route, B as Button } from "./router-BW4Bv_jw.js";
import "@base-ui/react/button";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function QuestionCard({
  question,
  index,
  onAnswer
}) {
  const [selectedId, setSelectedId] = useState(null);
  const answered = selectedId !== null;
  const isCorrect = selectedId === question.correctAnswer;
  function handleSelect(optionId) {
    if (answered) return;
    setSelectedId(optionId);
    onAnswer(question.id, optionId);
  }
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
          const isSelected = selectedId === option.id;
          const isCorrectOption = option.id === question.correctAnswer;
          let optionStyle = "border-border bg-background hover:bg-muted cursor-pointer";
          if (answered) {
            if (isCorrectOption) {
              optionStyle = "border-testology-success/50 bg-testology-success/10";
            } else if (isSelected && !isCorrect) {
              optionStyle = "border-testology-error/50 bg-testology-error/10";
            } else {
              optionStyle = "border-border bg-background opacity-60";
            }
          }
          return /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": isSelected,
              onClick: () => handleSelect(option.id),
              disabled: answered,
              className: cn(
                "flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition sm:px-4 sm:py-3",
                optionStyle,
                answered && "cursor-default"
              ),
              children: [
                /* @__PURE__ */ jsx("span", { className: "flex-1 text-foreground", children: option.text }),
                answered && isCorrectOption && /* @__PURE__ */ jsx(
                  Check,
                  {
                    className: "h-4 w-4 shrink-0 text-testology-success",
                    "aria-label": "Correct answer"
                  }
                ),
                answered && isSelected && !isCorrect && /* @__PURE__ */ jsx(
                  X,
                  {
                    className: "h-4 w-4 shrink-0 text-testology-error",
                    "aria-label": "Incorrect answer"
                  }
                )
              ]
            },
            option.id
          );
        })
      }
    ),
    answered && question.explanation && /* @__PURE__ */ jsx(
      "div",
      {
        className: "mt-4 rounded-lg bg-muted px-3 py-2.5 text-sm text-muted-foreground sm:px-4 sm:py-3",
        "aria-live": "polite",
        children: question.explanation
      }
    )
  ] });
}
function PracticePage() {
  const {
    certificate,
    chapter
  } = Route.useLoaderData();
  const {
    certId,
    chapterId
  } = Route.useParams();
  const [answers, setAnswers] = useState({});
  const handleAnswer = useCallback((questionId, answerId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerId
    }));
  }, []);
  const totalQuestions = chapter.questions.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === totalQuestions;
  function handleSubmit() {
    const key = `testology:${certId}:${chapterId}:practice`;
    localStorage.setItem(key, JSON.stringify(answers));
    window.location.href = `${"/testologyAi/"}certificates/${certId}/chapters/${chapterId}/results?mode=practice`;
  }
  return /* @__PURE__ */ jsx("main", { className: "px-4 py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/certificates/$certId", params: {
        certId
      }, className: "mb-4 inline-block text-sm text-muted-foreground hover:text-foreground", children: [
        "← Back to ",
        certificate.title
      ] }),
      /* @__PURE__ */ jsxs("h1", { className: "mb-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl", children: [
        "Practice: ",
        chapter.title
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
        answeredCount,
        "/",
        totalQuestions,
        " answered — instant feedback on each question"
      ] })
    ] }),
    totalQuestions === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-center", children: [
      /* @__PURE__ */ jsx("img", { src: `${"/testologyAi/"}halfRobot.png`, alt: "Za'atar — testologyAI mascot", className: "mb-6 h-40 w-auto opacity-80" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg font-medium text-foreground", children: "No questions available yet" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Check back later for new content." })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("section", { "aria-label": "Practice questions", className: "space-y-6", children: chapter.questions.map((question, index) => /* @__PURE__ */ jsx(QuestionCard, { question, index, onAnswer: handleAnswer }, question.id)) }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 flex justify-center", children: /* @__PURE__ */ jsx(Button, { size: "lg", onClick: handleSubmit, disabled: !allAnswered, children: allAnswered ? "Submit Answers" : `Answer all questions (${answeredCount}/${totalQuestions})` }) })
    ] })
  ] }) });
}
export {
  PracticePage as component
};
