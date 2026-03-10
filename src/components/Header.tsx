import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'

export default function Header() {
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
            src="/favicon-logo.png"
            alt=""
            className="h-8 w-8"
          />
          <span className="hidden sm:inline">Testology</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1 text-sm font-medium sm:gap-2">
          <Link
            to="/"
            className="rounded-lg px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground [&.active]:text-foreground"
            activeOptions={{ exact: true }}
            activeProps={{ className: 'rounded-lg px-3 py-2 text-foreground transition hover:bg-muted' }}
          >
            Home
          </Link>
          <Link
            to="/certificates"
            className="rounded-lg px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground [&.active]:text-foreground"
            activeProps={{ className: 'rounded-lg px-3 py-2 text-foreground transition hover:bg-muted' }}
          >
            Certificates
          </Link>
        </div>

        {/* Right side: timer slot + theme toggle */}
        <div className="flex items-center gap-2">
          {/* Timer slot — filled by exam mode */}
          <div id="exam-timer-slot" />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
