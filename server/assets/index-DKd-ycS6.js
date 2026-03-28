import { jsxs, jsx } from "react/jsx-runtime";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxs("main", { className: "flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center", children: [
    /* @__PURE__ */ jsx("img", { src: `${"/testologyAi/"}halfRobot.png`, alt: "Za'atar — testologyAI mascot", className: "mb-6 h-48 w-auto opacity-80" }),
    /* @__PURE__ */ jsx("h1", { className: "mb-2 text-2xl font-bold text-foreground", children: "Certificate not found" }),
    /* @__PURE__ */ jsx("p", { className: "mb-6 text-muted-foreground", children: "This certification doesn't exist. Let's get you back on track." }),
    /* @__PURE__ */ jsx("a", { href: `${"/testologyAi/"}certificates`, className: "text-sm font-medium text-primary hover:underline", children: "Back to Certificates" })
  ] });
}
export {
  NotFoundComponent as notFoundComponent
};
