import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import ErrorBoundary from '../components/ErrorBoundary'
import Footer from '../components/Footer'
import Header from '../components/Header'

import appCss from '../styles.css?url'

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Testology — IT Certification Practice Exams' },
      {
        name: 'description',
        content:
          'Practice smarter, certify faster. Free practice exams and study tools for AWS, Azure, CompTIA, and more IT certifications.',
      },
      { name: 'theme-color', content: '#1A2744' },
      // OpenGraph
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Testology — IT Certification Practice Exams' },
      {
        property: 'og:description',
        content:
          'Practice smarter, certify faster. Free practice exams for AWS, Azure, CompTIA, and more.',
      },
      { property: 'og:image', content: '/favicon-logo.png' },
      { property: 'og:site_name', content: 'Testology' },
      // Twitter
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'Testology — IT Certification Practice Exams' },
      {
        name: 'twitter:description',
        content:
          'Free practice exams for AWS, Azure, CompTIA, and more IT certifications.',
      },
      { name: 'twitter:image', content: '/favicon-logo.png' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon-logo.png', type: 'image/png' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none"
        >
          Skip to main content
        </a>
        <Header />
        <ErrorBoundary>
          <div id="main-content" className="flex-1">{children}</div>
        </ErrorBoundary>
        <Footer />
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
