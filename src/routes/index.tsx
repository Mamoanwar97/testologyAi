import { Link, createFileRoute } from "@tanstack/react-router";
import { buttonVariants } from "#/components/ui/button";
import { getCertificates } from "#/utils/data";
import { seo } from "#/utils/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: seo({
      title: "TestologyAI — IT Certification Practice Exams",
      description:
        "Practice smarter, certify faster. Free practice exams and study tools for AWS, Azure, CompTIA, and more IT certifications.",
      image: `${import.meta.env.BASE_URL}thumbnail.png`,
    }),
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
              alt="Za'atar — testologyAI mascot"
              className="h-64 w-auto drop-shadow-2xl sm:h-80 lg:h-96"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
