import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { Layers, BookOpen } from "lucide-react";
import { b as buttonVariants, R as Route } from "./router-BW4Bv_jw.js";
import "react";
import "@base-ui/react/button";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function ChapterCard({ chapter, certId }) {
  const isAll = chapter.id === "all";
  const questionCount = chapter.questions.length;
  return /* @__PURE__ */ jsxs("article", { className: "flex flex-col rounded-xl border border-border bg-card p-6 transition hover:shadow-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10", children: isAll ? /* @__PURE__ */ jsx(Layers, { className: "h-5 w-5 text-primary" }) : /* @__PURE__ */ jsx(BookOpen, { className: "h-5 w-5 text-primary" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold text-foreground", children: chapter.title }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
          questionCount,
          " ",
          questionCount === 1 ? "question" : "questions"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-auto flex gap-3 pt-4", children: [
      !isAll && /* @__PURE__ */ jsx(
        Link,
        {
          to: "/certificates/$certId/chapters/$chapterId/practice",
          params: { certId, chapterId: chapter.id },
          className: buttonVariants({ variant: "outline" }) + " flex-1 no-underline",
          children: "Practice"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/certificates/$certId/chapters/$chapterId/exam",
          params: { certId, chapterId: chapter.id },
          className: buttonVariants() + " flex-1 no-underline",
          children: "Exam"
        }
      )
    ] })
  ] });
}
function ChaptersPage() {
  const {
    certificate,
    chapters
  } = Route.useLoaderData();
  const allChapter = chapters.find((ch) => ch.id === "all");
  const individualChapters = chapters.filter((ch) => ch.id !== "all");
  return /* @__PURE__ */ jsx("main", { className: "px-4 py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
      /* @__PURE__ */ jsx(Link, { to: "/certificates", className: "mb-4 inline-block text-sm text-muted-foreground hover:text-foreground", children: "← Back to Certificates" }),
      /* @__PURE__ */ jsx("h1", { className: "mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: certificate.title }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: certificate.description })
    ] }),
    allChapter && /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx(ChapterCard, { chapter: allChapter, certId: certificate.id }) }),
    individualChapters.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-4 text-lg font-semibold text-foreground", children: "Chapters" }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: individualChapters.map((chapter) => /* @__PURE__ */ jsx(ChapterCard, { chapter, certId: certificate.id }, chapter.id)) })
    ] })
  ] }) });
}
export {
  ChaptersPage as component
};
