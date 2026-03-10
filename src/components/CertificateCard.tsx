import { Link } from "@tanstack/react-router";
import { Award } from "lucide-react";
import { buttonVariants } from "#/components/ui/button";
import type { Certificate } from "#/types";

interface CertificateCardProps {
  certificate: Certificate;
}

export default function CertificateCard({ certificate }: CertificateCardProps) {
  const chapterCount = certificate.chapters.filter((ch) => ch !== "all").length;

  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-6 transition hover:shadow-md">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
        <Award className="h-6 w-6 text-primary" />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-foreground">
        {certificate.title}
      </h3>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        {certificate.description}
      </p>

      <p className="mb-4 text-xs font-medium text-muted-foreground">
        {chapterCount} {chapterCount === 1 ? "Chapter" : "Chapters"}
      </p>

      <Link
        to="/certificates/$certId"
        params={{ certId: certificate.id }}
        className={buttonVariants() + " w-full no-underline"}
      >
        Let's Start
      </Link>
    </article>
  );
}
