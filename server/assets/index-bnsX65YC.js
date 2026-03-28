import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { b as buttonVariants, g as getCertificates } from "./router-BW4Bv_jw.js";
import "react";
import "@base-ui/react/button";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "lucide-react";
function HomePage() {
  const certificates = getCertificates();
  return /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden bg-gradient-to-br from-testology-navy to-testology-dark px-4 py-20 sm:py-28", children: [
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-testology-blue/10 blur-3xl" }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-testology-cyan/10 blur-3xl" }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-6xl flex-col items-center gap-10 lg:flex-row lg:gap-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center lg:text-left", children: [
        /* @__PURE__ */ jsxs("h1", { className: "mb-4 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl", children: [
          "Master Your",
          " ",
          /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-testology-cyan to-testology-light-blue bg-clip-text text-transparent", children: "IT Certifications" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mb-8 max-w-xl text-lg text-testology-sky/80 sm:text-xl", children: "Practice smarter, certify faster. Free practice exams for AWS, Azure, CompTIA, and more — with instant feedback and exam simulation." }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-3 lg:justify-start", children: /* @__PURE__ */ jsx(Link, { to: "/certificates", className: buttonVariants({
          size: "lg"
        }) + " no-underline", children: "Get Started" }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-wrap justify-center gap-8 lg:justify-start", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-white", children: certificates.length }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-testology-sky/60", children: "Certifications" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-white", children: "2" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-testology-sky/60", children: "Study Modes" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-white", children: "100%" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-testology-sky/60", children: "Free" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("img", { src: `${"/testologyAi/"}halfRobot.png`, alt: "Za'atar — testologyAI mascot", className: "h-64 w-auto drop-shadow-2xl sm:h-80 lg:h-96" }) })
    ] })
  ] }) });
}
export {
  HomePage as component
};
