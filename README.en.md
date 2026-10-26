# mofeistudio

> MO Fei's personal website — [mofeistudio.cn](https://mofeistudio.cn)
>
> [中文](README.md)

An AI-Native practitioner: using new tools and written specs to explore the boundaries of AI capability.

## Author

|               |                           |
| ------------- | ------------------------- |
| **Real name** | MO Fei (mofei)            |
| **Pen name**  | **得无** (De Wu)          |
| **Site**      | mofeistudio.cn            |
| **AI agent**  | [Irisa](#signature-rules) |

**Signature rules:**

| Content                    | Byline           |
| -------------------------- | ---------------- |
| Written entirely by me     | 得无             |
| Written with AI assistance | **得无 × Irisa** |

Every article on the site carries a full byline. When reposted to platforms
that allow only one author (superlinear, WeChat, Zhihu, Juejin, etc.), only
「得无」 can be used. **The site is the single source of truth** — the complete
byline always lives on the article page itself.
**English pages never show 「得无」; they use the real name MO Fei.**

**Irisa** is an agent project I maintain; everything produced with AI
assistance is attributed to it. Commits in this repository are authored by
Irisa, and the copyright belongs to me. The human-AI collaboration is
described formally in [`NOTICE`](NOTICE).

## What this is

This is the **complete source of mofeistudio.cn** — both the site code and the
articles published on it.

The site is the **single source of truth**: content is edited and published
here first, then reposted by hand to WeChat, Zhihu, Juejin, superlinear and
elsewhere. Doing it the other way round loses things.

Articles come in three kinds; the main rhythm is the first:

| Kind                    | Length        | What it is                                                                         |
| ----------------------- | ------------- | ---------------------------------------------------------------------------------- |
| **Event → Lesson**      | 300-500 words | What I did, what went wrong. Follows what is already happening — no forced writing |
| **Judgment → Argument** | ~2000 words   | What I claim and why. Always with the boundaries stated                            |
| **Problem → Solution**  | 4000+ words   | The whole story of one complete project                                            |

## One self-imposed rule about content

No AI tutorials. The tutorial space is crowded and has no moat — AI can write
any tutorial.

**What is actually scarce is an unwrapped real process, and a judgment that
survives follow-up questions.** I only write about things I have really done.

## Layout

```
src/
├── components/      page components (top nav, rail, post list, footer, back-to-top)
├── layouts/         Base.astro (shell), PostLayout.astro (article pages)
├── pages/           9 pages + RSS, one route set per language
├── styles/          global.css (Tailwind 4 + prose typography)
├── content.config.ts  content model: two collections, one shared schema
└── content/posts/   published articles, one directory per post, one file per language
public/
├── beian.png        ICP filing icon
├── wechat-qr.jpg    WeChat Official Account QR code
└── posts/<slug>/images/   article images
```

**Only finished work lives here.** Half-written articles stay in the private
repository's `drafts/` directory and never enter this one — publishing means
moving them across.

## Local development

Stack: **Astro 7.4.0 + Tailwind 4.3.3**, package manager **pnpm** (there is a
lockfile — do not use npm or yarn).

```bash
pnpm install                            # pnpm only
pnpm dev                                # dev server
pnpm build                              # static output in dist/
pnpm format                             # prettier --write .
pnpm format:check                       # run this after editing
pnpm exec astro preview --port 4321     # preview the built site
```

> **On Windows you must use `pnpm.cmd`**: PowerShell's execution policy blocks
> `pnpm.ps1`, so typing `pnpm` raises a SecurityError — that is the execution
> policy, not a network problem.

## Status

- The site code is complete: **9 pages + RSS**, all four Chinese/English URL
  forms work, zero broken internal links
- **Three articles** are published, in Chinese and English
- Dark mode, top navigation, table of contents and back-to-top have all been
  verified in a real browser
- **Not live yet** (deployment target: the existing Aliyun server + nginx)

## License

This repository uses a **dual license** — code and content are separate:

| Part                                | License        | Full text                          |
| ----------------------------------- | -------------- | ---------------------------------- |
| **Code** (`src/`, config, styles)   | **Apache-2.0** | [`LICENSE-APACHE`](LICENSE-APACHE) |
| **Articles** (`src/content/posts/`) | **CC BY 4.0**  | [`LICENSE-CC-BY`](LICENSE-CC-BY)   |

The code may be used in closed-source commercial products and includes an
explicit patent grant. Articles may be reposted, used commercially and
adapted — **attribution is required**.
A plain-language summary of the content license:
<https://creativecommons.org/licenses/by/4.0/>.

**Where an individual article states otherwise, that article's own notice
applies.**

Code font: **JetBrains Mono**, **OFL-1.1** (distributed through the npm package
`@fontsource/jetbrains-mono`; the font files are not committed to this
repository, and the package carries the full OFL text).

[`NOTICE`](NOTICE) states the human-AI collaboration and copyright ownership.

### How to attribute

When reposting or adapting an article from this site, please state:

> 《Article title》 — 得无 × Irisa (human-AI collaboration)
> Original: https://mofeistudio.cn/posts/article-slug
> The original is licensed under CC BY 4.0. Keep this attribution and note
> whether you made changes.

Articles written entirely by me are signed 「得无」 only. The accurate byline
always appears at the bottom of the original page — **the original page is
authoritative**.

## Related

- **Open-source project**: [fore-thought/deepseek-harness-project-collection-starter](https://github.com/fore-thought/deepseek-harness-project-collection-starter)
  — using documents and specs to keep AI under control across a whole group of projects
- **Community**: superlinear.academy
