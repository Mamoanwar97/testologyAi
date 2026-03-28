import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { Award } from "lucide-react";
import { b as buttonVariants, g as getCertificates } from "./router-BW4Bv_jw.js";
import "react";
import "@base-ui/react/button";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function CertificateCard({ certificate }) {
  const chapterCount = certificate.chapters.filter((ch) => ch !== "all").length;
  return /* @__PURE__ */ jsxs("article", { className: "flex flex-col rounded-xl border border-border bg-card p-6 transition hover:shadow-md", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsx(Award, { className: "h-6 w-6 text-primary" }) }),
    /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-semibold text-foreground", children: certificate.title }),
    /* @__PURE__ */ jsx("p", { className: "mb-4 flex-1 text-sm leading-relaxed text-muted-foreground", children: certificate.description }),
    /* @__PURE__ */ jsxs("p", { className: "mb-4 text-xs font-medium text-muted-foreground", children: [
      chapterCount,
      " ",
      chapterCount === 1 ? "Chapter" : "Chapters"
    ] }),
    /* @__PURE__ */ jsx(
      Link,
      {
        to: "/certificates/$certId",
        params: { certId: certificate.id },
        className: buttonVariants() + " w-full no-underline",
        children: "Let's Start"
      }
    )
  ] });
}
function CertificatesPage() {
  const certificates = getCertificates();
  return /* @__PURE__ */ jsx("main", { className: "px-4 py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-10 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: "Choose a Certification" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Pick a certification and start practicing with chapter-based quizzes and timed exams." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: certificates.map((cert) => /* @__PURE__ */ jsx(CertificateCard, { certificate: cert }, cert.id)) })
  ] }) });
}
export {
  CertificatesPage as component
};
