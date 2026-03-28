import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const SITE_URL = "https://mamoanwar97.github.io/testologyAi";

function sitemapPlugin() {
  return {
    name: "generate-sitemap",
    closeBundle() {
      const certs: { id: string }[] = JSON.parse(
        readFileSync(
          resolve(import.meta.dirname, "src/data/certificates.json"),
          "utf-8",
        ),
      );
      const routes = [
        "/",
        "/certificates",
        ...certs.map((c) => `/certificates/${c.id}`),
      ];

      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...routes.map(
          (route) =>
            `  <url><loc>${SITE_URL}${route}</loc><changefreq>weekly</changefreq></url>`,
        ),
        "</urlset>",
      ].join("\n");

      // Write sitemap to both possible output directories
      for (const dir of ["dist/client", ".output/public"]) {
        const outDir = resolve(import.meta.dirname, dir);
        try {
          mkdirSync(outDir, { recursive: true });
          writeFileSync(resolve(outDir, "sitemap.xml"), sitemap);
          console.log(`Generated sitemap.xml (${dir})`);
        } catch {
          // directory may not exist yet, skip
        }
      }
    },
  } satisfies import("vite").Plugin;
}

const config = defineConfig({
  base: "/testologyAi/",
  plugins: [
    devtools(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      spa: {
        enabled: true,
      },
    }),
    viteReact(),
    sitemapPlugin(),
  ],
});

export default config;
