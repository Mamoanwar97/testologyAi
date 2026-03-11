import { Link, useMatchRoute } from "@tanstack/react-router";

export default function Header() {
  const matchRoute = useMatchRoute();
  const isExamRoute = matchRoute({
    to: "/certificates/$certId/chapters/$chapterId/exam",
    fuzzy: false,
  });

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 px-4 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between py-3">
        {/* Logo */}
        <Link
          to="/"
          aria-label="Testology Home"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground no-underline"
        >
          <img
            src={`${import.meta.env.BASE_URL}favicon-logo.png`}
            alt=""
            className="h-8 w-8"
          />
          <span className="hidden sm:inline">Testology</span>
        </Link>

        {isExamRoute ? (
          /* Timer slot — visible in center when in exam mode */
          <div id="exam-timer-slot" />
        ) : (
          /* Nav links */
          <div className="flex items-center gap-1 text-sm font-medium sm:gap-2">
            <Link
              to="/"
              className="rounded-lg px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground [&.active]:text-foreground"
              activeOptions={{ exact: true }}
              activeProps={{
                className:
                  "rounded-lg px-3 py-2 text-foreground transition hover:bg-muted",
              }}
            >
              Home
            </Link>
            <Link
              to="/certificates"
              className="rounded-lg px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground [&.active]:text-foreground"
              activeProps={{
                className:
                  "rounded-lg px-3 py-2 text-foreground transition hover:bg-muted",
              }}
            >
              Certificates
            </Link>
          </div>
        )}

        {/* Right side: avatar (+ timer slot when not in exam) */}
        <div className="flex items-center gap-2">
          <a
            href="https://www.linkedin.com/in/omar-zidan-%F0%9F%8D%89-56b851108"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Omar Zidan's LinkedIn profile"
          >
            <img
              src={`${import.meta.env.BASE_URL}avatar.png`}
              alt="User avatar"
              className="h-12 w-12 rounded-full border-2 border-border object-cover transition hover:border-primary"
            />
          </a>
        </div>
      </nav>
    </header>
  );
}
