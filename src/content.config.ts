import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// 中英两版共用同一套字段定义：title / summary / date / type / weight / related
// type 存英文 key，两版文件里完全一致，显示时再按语言映射（design-spec 第四节）
const post = z.object({
  title: z.string(),
  summary: z.string(), // 40 字以内，首页列表用
  date: z.coerce.date(),
  type: z.enum(["event", "judgment", "solution"]),
  weight: z.number().default(400), // 第一版只用 400
  related: z.array(z.string()).default([]), // 相关文章 slug，手填
});

// entry.id 实测（2026-10-18）：
// 默认的 id 生成会把路径 slug 化，`<slug>/<slug>.zh.md` 出来的 id 是
// `<slug>/<slug>zh`——**点号被吃掉了**，没法靠「去掉 .zh」还原 slug。
// 所以两个 collection 都显式指定 generateId，直接返回目录名当 slug。
const postsZh = defineCollection({
  loader: glob({
    base: "./src/content/posts",
    pattern: "**/*.zh.md",
    generateId: ({ entry }) => entry.split("/")[0],
  }),
  schema: post,
});

const postsEn = defineCollection({
  loader: glob({
    base: "./src/content/posts",
    pattern: "**/*.en.md",
    generateId: ({ entry }) => entry.split("/")[0],
  }),
  schema: post,
});

export const collections = { postsZh, postsEn };
