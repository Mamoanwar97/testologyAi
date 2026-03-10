import { createFileRoute } from "@tanstack/react-router";
import { buttonVariants } from "#/components/ui/button";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Page Not Found — Testology" },
      { name: "description", content: "This page does not exist." },
    ],
  }),
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <img
        src={`${import.meta.env.BASE_URL}halfRobot.png`}
        alt="Za'atar — Testology mascot"
        className="mb-6 h-48 w-auto opacity-80"
      />
      <h1 className="mb-2 text-2xl font-bold text-foreground">
        Page Not Found
      </h1>
      <p className="mb-6 text-muted-foreground">
        This page doesn't exist. Let's get you back on track.
      </p>
      <a
        href={`${import.meta.env.BASE_URL}certificates`}
        className={buttonVariants({ variant: "default" }) + " no-underline"}
      >
        Browse Certificates
      </a>
    </main>
  );
}
