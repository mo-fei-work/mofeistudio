---
title: 浅谈：agent 扩展的不可能三角
summary: 受 He Lu 启发，讲 agent 扩展的三难：高复杂度、上下文、低并行度。
date: 2026-09-29T11:34:00+08:00
type: judgment
related:
  - deepseek-harness-project-collection-management
---

> 受 [He Lu](https://www.superlinear.academy/u/5f38fce1) 的 [用了 agent 反而更忙：聊聊 agent 扩展的不可能三角](https://www.superlinear.academy/c/posts/agent-agent-1c4a59) 这篇 post 启发 
>
> 作为软件工程师，我来说一下我对这三者的看法：
>

## 1. 高任务复杂度

实际上我的实践的发现是，AI-Native 项目的复杂度是持续增进式的，这也符合传统软件工程长期迭代维护的趋势。而这之中，AI 的切入点很关键。

我更推崇 AI-Native 项目的从一开始就进入，也就是从立项开始，立项决策的过闸应当是人与 AI 合作探讨并最终由 AI 产出，这涉及 AI 调研与背景知识积累。

关于可行性分析与验证也应当主要由 AI 驱动并产生 AI 受益的经验与教训文档，从而在过规划闸前形成更可靠的 /plan 或 /goal 产出文档，spec 文档的初版决定了复杂度的下限。

但 spec 文档不应是死的，应在后续实施的过程中，持续补充完善已经落地的成果并根据落地成果及时补充优化与改进方向，这将最终逐步提高任务的复杂度。

## 2. 保持在有效上下文之间

没错，上下文实际上到中间左右的时候，就开始因为现在大模型架构的注意力等底层模型架构机制问题，导致一些不可靠的后果。（这方面众所周知，我可能论述不严谨，理解就好）

所以我的解决措施也简单粗暴，60% 左右就进行 handoff 交接，并且整理当前会话文档与仓库内文档。始终让新对话的上下文在 0%~70% 间工作，每一个会话中让大模型专注。

是的，历史积累的文档很多，那文档（例如 AGENTS.md）就应当更加像索引演化，文档按需加载。

怎么按需加载？会话主模型上下文充足（远不到 60%），则主模型读取。反之，开子 agent 阅读并提供反馈结果给主模型，形同压缩（指子 agent 返回内容比原始 spec 文档内容精简）但并非真压缩（主模型上下文并未实际压缩）。

担心主模型对已有各种 spec 的知识把握细节不够？细节让主模型开子 agent 完成，子 agent 的上下文总够吧！

1 和 2 两部分可以参考我之前的文章 [如何更好地管理项目？不管理！——我的 DeepSeek Harness 项目组管理模板，开源了](/posts/deepseek-harness-project-collection-management)

## 3. 低并行度（agent 少，管理简单）

说实话，这确实是个难点，**我也没有实际解决好**，因为这是个复杂工程问题。它涉及资源竞争与任务拆分等。我目前的演进版本是，流水线思想，见下方项目最新逻辑。

[deepseek-harness-project-collection-starter](https://github.com/fore-thought/deepseek-harness-project-collection-starter)

我当前在这个模板项目中是这么设定的，比如我们有 3 个角色，producer → implementer → verifier，实际上这是个很常见的工序，设计 1 → 开发 2 → 验证 3，我们人类作为项目监督与管理。

你会说这是串联的啊？流水线在哪里？想想我们现实中是怎么干活的！每个人头上挂着不同阶段的项目，但是同样的岗位职责，你也能做，并且是只要时间窗口对上了，就能持续干，并都完成。时间窗口 → 窗口 → 会话窗口，没错，每个角色可以有多个会话窗口，每个窗口的内容是顺序的，但窗口是并行的。

为什么说是流水线式？当 producer 完成设计 A1，implementer 就可以进行开发 A2，这并不影响 producer 继续设计 B。

![agent 流水线](/posts/agent-extension-impossible-triangle/images/agent-pipeline.png)
