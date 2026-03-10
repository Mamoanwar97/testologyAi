import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const SITE_URL = 'https://testology.app'

function sitemapPlugin() {
  return {
    name: 'generate-sitemap',
    closeBundle() {
      const routes = [
        '/',
        '/certificates',
        '/certificates/aws-cloud-practitioner',
        '/certificates/azure-fundamentals',
        '/certificates/comptia-a-plus',
      ]

      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...routes.map(
          (route) =>
            `  <url><loc>${SITE_URL}${route}</loc><changefreq>weekly</changefreq></url>`
        ),
        '</urlset>',
      ].join('\n')

      const outDir = resolve(import.meta.dirname, '.output/public')
      try {
        mkdirSync(outDir, { recursive: true })
        writeFileSync(resolve(outDir, 'sitemap.xml'), sitemap)
        console.log('Generated sitemap.xml')
      } catch {
        // output dir may differ, try dist as fallback
        const distDir = resolve(import.meta.dirname, 'dist')
        mkdirSync(distDir, { recursive: true })
        writeFileSync(resolve(distDir, 'sitemap.xml'), sitemap)
        console.log('Generated sitemap.xml (dist)')
      }
    },
  } satisfies import('vite').Plugin
}

const config = defineConfig({
  plugins: [
    devtools(),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
    }),
    viteReact(),
    sitemapPlugin(),
  ],
})

export default config
