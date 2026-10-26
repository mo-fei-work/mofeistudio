# mofeistudio

> 得无的个人网站 —— [mofeistudio.cn](https://mofeistudio.cn)
>
> [English](README.en.md)

一个 AI-Native 的实践者：用新工具和文档规范，探 AI 能力的边界。

## 作者

|               |                        |
| ------------- | ---------------------- |
| **真名**      | 莫非（mofei / MO Fei） |
| **笔名**      | **得无**               |
| **站**        | mofeistudio.cn         |
| **AI 智能体** | [Irisa](#署名规则)     |

**署名规则：**

| 内容         | 署名             |
| ------------ | ---------------- |
| 纯人写       | 得无             |
| 人 + AI 协作 | **得无 × Irisa** |

站内文章总是完整署名；转载到只支持单作者的平台（superlinear、公众号、
知乎、掘金等）时只能署「得无」。**主站是唯一真源**，完整署名以站内为准。
**英文页面一律不出现「得无」，全用真名 MO Fei。**

**Irisa** 是我维护的一个 agent 项目，后续 AI 协作的产物都会用它的身份。
代码仓库的 commit 由 Irisa 署名，著作权属于我。
人机协作关系的正式说明在 [`NOTICE`](NOTICE)。

## 这是什么

这是 **mofeistudio.cn 的完整源码**，包含站点代码和站内文章。

主站是**唯一真源**：内容先在这里改、先发布，然后手动转载到
公众号、知乎、掘金、superlinear 等平台。反过来做容易漏。

站内内容分三类，主节奏是第一种：

| 类型            | 长度       | 说明                                                     |
| --------------- | ---------- | -------------------------------------------------------- |
| **事件 → 教训** | 300-500 字 | 我做了什么、踩了什么坑。跟随已经在发生的事，不用刻意创作 |
| **判断 → 论证** | ~2000 字   | 我主张什么、为什么。会有明确的边界说明                   |
| **问题 → 方案** | 4000+ 字   | 一个完整项目的来龙去脉                                   |

## 关于内容的一条自我约束

不做 AI 教程。教程赛道拥挤且没有护城河 —— AI 能写任何教程。

**真正稀缺的是未经包装的真实过程，和能扛住追问的判断。**
站内尽量只写自己真的做过的事。

## 目录

```
src/
├── components/      页面组件（顶栏、右栏、文章列表、页尾、返回顶部等）
├── layouts/         Base.astro（外壳）、PostLayout.astro（文章页）
├── pages/           9 个页面 + RSS，中英各一套路由
├── styles/          global.css（Tailwind 4 + 正文排版）
├── content.config.ts  内容模型：中英两个 collection，共用同一套字段
└── content/posts/   已发布的文章，一篇一目录，中英各一版
public/
├── beian.png        备案图标
├── wechat-qr.jpg    公众号二维码
└── posts/<slug>/images/   文章配图
```

**这里只放已发布的成品。** 写了一半的文章在私有仓的 `drafts/` 里，
不进入本仓库——发布就是把它从那里移过来。

## 本地开发

技术栈：**Astro 7.4.0 + Tailwind 4.3.3**，包管理器 **pnpm**（有锁文件，不要用 npm 或 yarn）。

```bash
pnpm install                            # 只用 pnpm
pnpm dev                                # 本地开发
pnpm build                              # 静态产物在 dist/
pnpm format                             # prettier --write .
pnpm format:check                       # 改完跑这个
pnpm exec astro preview --port 4321     # 预览构建产物
```

> **Windows 上必须用 `pnpm.cmd`**：PowerShell 的执行策略禁止跑 `pnpm.ps1`，
> 直接敲 `pnpm` 会报 SecurityError——那是执行策略，不是网络问题。

## 状态

- 站点代码已写完：**9 个页面 + RSS**，中英四类 URL 全通，站内链接 0 断链
- 站内已有**三篇文章**，中英各一版
- 暗色模式、顶部导航、目录、返回顶部均已实跑验收
- **尚未上线**（部署目标是已有的阿里云服务器 + nginx）

## License

本仓库采用**双许可**，代码和内容分开：

| 部分                             | 许可           | 协议全文                           |
| -------------------------------- | -------------- | ---------------------------------- |
| **代码**（`src/`、配置、样式）   | **Apache-2.0** | [`LICENSE-APACHE`](LICENSE-APACHE) |
| **文章**（`src/content/posts/`） | **CC BY 4.0**  | [`LICENSE-CC-BY`](LICENSE-CC-BY)   |

代码允许闭源商用，含显式专利授权；文章可转载、可商用、可改编，**必须署名**。
内容许可的人话摘要见 <https://creativecommons.org/licenses/by/4.0/>。

**具体文章有特殊说明时，以该文章内的声明为准。**

代码字体 **JetBrains Mono**，**OFL-1.1**（经 npm 包 `@fontsource/jetbrains-mono` 分发，
字体文件不入仓，包内自带 OFL 全文）。

[`NOTICE`](NOTICE) 说明人机协作关系与著作权归属。

### 如何署名

转载或改编站内文章，请注明：

> 《文章标题》— 得无 × Irisa（人机协作）
> 原文：https://mofeistudio.cn/posts/文章-slug
> 原文采用 CC BY 4.0 许可。转载或改编请保留此署名，并注明是否做过修改。

纯人写的文章，署名只写「得无」。原文页底部始终有准确署名，**以原文页为准**。

## 相关

- **已开源项目**：[fore-thought/deepseek-harness-project-collection-starter](https://github.com/fore-thought/deepseek-harness-project-collection-starter)
  —— 用文档和规范让 AI 管住一整组项目
- **社区**：superlinear.academy
