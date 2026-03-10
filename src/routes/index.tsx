import { Link, createFileRoute } from "@tanstack/react-router";
import { buttonVariants } from "#/components/ui/button";
import { getCertificates } from "#/utils/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Testology — IT Certification Practice Exams" },
      {
        name: "description",
        content:
          "Practice smarter, certify faster. Free practice exams and study tools for AWS, Azure, CompTIA, and more IT certifications.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const certificates = getCertificates();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-testology-navy to-testology-dark px-4 py-20 sm:py-28">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-testology-blue/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-testology-cyan/10 blur-3xl" />

        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 lg:flex-row lg:gap-16">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Master Your{" "}
              <span className="bg-gradient-to-r from-testology-cyan to-testology-light-blue bg-clip-text text-transparent">
                IT Certifications
              </span>
            </h1>
            <p className="mb-8 max-w-xl text-lg text-testology-sky/80 sm:text-xl">
              Practice smarter, certify faster. Free practice exams for AWS,
              Azure, CompTIA, and more — with instant feedback and exam
              simulation.
            </p>
            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                to="/certificates"
                className={buttonVariants({ size: "lg" }) + " no-underline"}
              >
                Get Started
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap justify-center gap-8 lg:justify-start">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {certificates.length}
                </p>
                <p className="text-sm text-testology-sky/60">Certifications</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">2</p>
                <p className="text-sm text-testology-sky/60">Study Modes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">100%</p>
                <p className="text-sm text-testology-sky/60">Free</p>
              </div>
            </div>
          </div>

          {/* Za'atar mascot */}
          <div className="flex-shrink-0">
            <img
              src={`${import.meta.env.BASE_URL}halfRobot.png`}
              alt="Za'atar — Testology mascot"
              className="h-64 w-auto drop-shadow-2xl sm:h-80 lg:h-96"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Why Testology?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Practice Mode",
                desc: "Get instant feedback on every question. Learn from detailed explanations as you go.",
              },
              {
                title: "Exam Simulation",
                desc: "Timed exams that mirror the real test experience. Build confidence before exam day.",
              },
              {
                title: "Track Progress",
                desc: "See your scores, review wrong answers, and focus on areas that need improvement.",
              },
            ].map((feature) => (
              <article
                key={feature.title}
                className="rounded-xl border border-border bg-card p-6 transition hover:shadow-md"
              >
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-muted/50 px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Ready to start practicing?
          </h2>
          <p className="mb-6 text-muted-foreground">
            Choose a certification and begin your journey today.
          </p>
          <Link
            to="/certificates"
            className={buttonVariants({ size: "lg" }) + " no-underline"}
          >
            Browse Certificates
          </Link>
        </div>
      </section>
    </main>
  );
}
