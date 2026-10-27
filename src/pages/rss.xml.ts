import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
  if (!context.site) {
    throw new Error("astro.config.mjs 里必须配置 site");
  }

  const posts = await getCollection("postsZh");
  const ordered = [...posts].sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  return rss({
    title: "莫非 · 得无",
    description: "用新工具和文档规范，探索 AI 能力的边界。",
    site: context.site,
    items: ordered.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary,
      link: `/posts/${post.id}/`,
    })),
    customData: "<language>zh-CN</language>",
  });
}
