import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import ChapterCard from '#/components/ChapterCard'
import { getCertificateById, getChapters } from '#/utils/data'

export const Route = createFileRoute('/certificates/$certId/')({
  loader: ({ params }) => {
    const certificate = getCertificateById(params.certId)
    if (!certificate) {
      throw notFound()
    }
    const chapters = getChapters(params.certId)
    return { certificate, chapters }
  },
  head: ({ loaderData }) => {
    const title = loaderData?.certificate.title ?? 'Certificate'
    const description = loaderData?.certificate.description ?? ''
    return {
      meta: [
        { title: `${title} — Testology` },
        { name: 'description', content: description },
        { property: 'og:title', content: `${title} — Testology` },
        { property: 'og:description', content: description },
        { property: 'og:image', content: `${import.meta.env.BASE_URL}favicon-logo.png` },
      ],
    }
  },
  notFoundComponent: NotFoundComponent,
  component: ChaptersPage,
})

function NotFoundComponent() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <img
        src={`${import.meta.env.BASE_URL}halfRobot.png`}
        alt="Za'atar — Testology mascot"
        className="mb-6 h-48 w-auto opacity-80"
      />
      <h1 className="mb-2 text-2xl font-bold text-foreground">
        Certificate not found
      </h1>
      <p className="mb-6 text-muted-foreground">
        This certification doesn't exist. Let's get you back on track.
      </p>
      <a
        href={`${import.meta.env.BASE_URL}certificates`}
        className="text-sm font-medium text-primary hover:underline"
      >
        Back to Certificates
      </a>
    </main>
  )
}

function ChaptersPage() {
  const { certificate, chapters } = Route.useLoaderData()

  const allChapter = chapters.find((ch) => ch.id === 'all')
  const individualChapters = chapters.filter((ch) => ch.id !== 'all')

  return (
    <main className="px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl">
        {/* Certificate info */}
        <div className="mb-10">
          <Link
            to="/certificates"
            className="mb-4 inline-block text-sm text-muted-foreground hover:text-foreground"
          >
            &larr; Back to Certificates
          </Link>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {certificate.title}
          </h1>
          <p className="text-muted-foreground">{certificate.description}</p>
        </div>

        {/* All Chapters card */}
        {allChapter && (
          <div className="mb-6">
            <ChapterCard chapter={allChapter} certId={certificate.id} />
          </div>
        )}

        {/* Individual chapters */}
        {individualChapters.length > 0 && (
          <>
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Chapters
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {individualChapters.map((chapter) => (
                <ChapterCard
                  key={chapter.id}
                  chapter={chapter}
                  certId={certificate.id}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
