// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // canonical 依赖它：不配的话 Astro.site 是 undefined，B7 会直接报错
  site: "https://mofeistudio.cn",
  output: "static",
  // 用 Astro 内置 i18n（决策：2026-10-16 URL 规则五条）。
  // 中文在根路径、英文在 /en/，所以 prefixDefaultLocale 必须是 false。
  i18n: {
    defaultLocale: "zh",
    locales: ["zh", "en"],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
