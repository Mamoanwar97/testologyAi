import { jsxs, jsx } from "react/jsx-runtime";
import { b as buttonVariants } from "./router-BW4Bv_jw.js";
import "@tanstack/react-router";
import "react";
import "@base-ui/react/button";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "lucide-react";
function NotFoundPage() {
  return /* @__PURE__ */ jsxs("main", { className: "flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center", children: [
    /* @__PURE__ */ jsx("img", { src: `${"/testologyAi/"}halfRobot.png`, alt: "Za'atar — testologyAI mascot", className: "mb-6 h-48 w-auto opacity-80" }),
    /* @__PURE__ */ jsx("h1", { className: "mb-2 text-2xl font-bold text-foreground", children: "Page Not Found" }),
    /* @__PURE__ */ jsx("p", { className: "mb-6 text-muted-foreground", children: "This page doesn't exist. Let's get you back on track." }),
    /* @__PURE__ */ jsx("a", { href: `${"/testologyAi/"}certificates`, className: buttonVariants({
      variant: "default"
    }) + " no-underline", children: "Browse Certificates" })
  ] });
}
export {
  NotFoundPage as component
};
