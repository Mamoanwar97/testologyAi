import { createFileRoute } from '@tanstack/react-router'
import CertificateCard from '#/components/CertificateCard'
import { getCertificates } from '#/utils/data'

export const Route = createFileRoute('/certificates/')({
  head: () => ({
    meta: [
      { title: 'Certificates — Testology' },
      {
        name: 'description',
        content:
          'Browse IT certification practice exams. AWS Cloud Practitioner, Azure Fundamentals, CompTIA A+, and more.',
      },
      { property: 'og:title', content: 'Certificates — Testology' },
      {
        property: 'og:description',
        content:
          'Browse IT certification practice exams. AWS, Azure, CompTIA, and more.',
      },
      { property: 'og:image', content: '/favicon-logo.png' },
    ],
  }),
  component: CertificatesPage,
})

function CertificatesPage() {
  const certificates = getCertificates()

  return (
    <main className="px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Choose a Certification
          </h1>
          <p className="text-muted-foreground">
            Pick a certification and start practicing with chapter-based quizzes
            and timed exams.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} certificate={cert} />
          ))}
        </div>
      </div>
    </main>
  )
}
