---
title: 如何更好地管理项目？不管理！——我的 DeepSeek Harness 项目组管理模板，开源了
summary: 把管理动作全写进文档：组级共享规范、四道流程闸、60% 交接。
date: 2026-09-09T15:16:00+08:00
type: solution
related: []
---

> ![如何更好地管理项目？不管理！](/posts/deepseek-harness-project-collection-management/images/cover.png)
>
> 我开源了一个模板仓库：**用它，DeepSeek Harness 里的 AI 能替你把一整组项目管起来**——目录怎么维护、规范怎么更新、会话怎么交接，都不用你动手。

我用 DeepSeek Harness（下文简称 DSH）做了一段时间的项目之后，发现真正的痛点不是“AI 写代码行不行”，而是**项目一多、会话一长，一切开始失控**：

- 一个仓库里文档、素材、产物、临时文件混在一起，AI 每次都要重新“认路”；
- 会话上下文用到 70%~80% 之后，AI 开始忘事，前面定的事后面又推翻重做，换个新会话还得从头交代；
- 这个项目和那个项目的规范各写各的，改一处漏一处；
- 最要命的是：**你花大量时间“管理项目”，而管理本身不产生交付物。**

我现在的解法有点反直觉：**如何更好地管理项目？不管理！** 把管理动作全部写进文档，让 agent 在会话一开始自己执行。模板仓库已经开源，clone 下来改个名就能用。

## 一、先说怎么用：三步，不装任何插件
1. **克隆**整个仓库（仓库地址见文末），保留 [shared-standards/](https://github.com/fore-thought/deepseek-harness-project-collection-starter/tree/main/shared-standards) 文件夹不动；
2. 把 [project-template/](https://github.com/fore-thought/deepseek-harness-project-collection-starter/tree/main/project-template) **改名**为你的工作区名字，比如 big-fat-fish；
3. 在 DSH 里**打开**这个工作区，新建会话，正常聊天即可。

就这些。没有插件要装，没有 prompt 工程要维护，不写任何配置文件就能开跑。整个仓库长这样：

```
 deepseek-harness-project-collection-starter/
 ├── shared-standards/     # 项目组级公共规范：所有项目共享引用，用户也不再动它
 ├── project-template/     # 复制改名的就是它，一个工作区 = 一个项目
 │   ├── AGENTS.md         # 唯一根级文档：项目规范 + 目录索引，自动加载
 │   ├── inputs/           # 一、输入素材（user/ 你提供的；ai/ 调研所得）
 │   ├── process/          # 二、过程工程（project/ 代码脚本、docs/ 文档、templates/ 模板）
 │   └── outputs/          # 三、输出产物（knowledge/、video/……）
 └── README.md
```

## 二、核心机制：文档引用文档，规范即代码

**两层规范：组级与项目的边界**

- **项目规范**：工作区里唯一的根级文档（[AGENTS.md](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/project-template/AGENTS.md)），管本项目自己的规则和目录索引。它在项目工作区**里面**，agent 有写权限。
- **组级规范**：工作区**外面**的那一份（[shared-standards/](https://github.com/fore-thought/deepseek-harness-project-collection-starter/tree/main/shared-standards)），管跨项目共用的东西——协作方式、合规要求、工程规范。它对所有项目只读引用。
- **边界**：项目规范可以覆盖组级规范的默认值，但必须在本项目里显式写出覆盖条款和理由；要改组级规范本身，走提权通道，不能在项目里顺手改。
- **职责**：组级规范决定“所有项目怎么做才算对”，项目规范决定“这个项目具体怎么做”。

这套东西能跑起来，靠的是 DSH 的一个特性：**工作区根目录的** [AGENTS.md](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/project-template/AGENTS.md) **会在每个会话自动加载**。

我没有用任何代码插件，全部组织工作都是用 markdown 文档“引用”出来的：

- 项目级 [AGENTS.md](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/project-template/AGENTS.md) 是工作区里唯一的根级文档，其余文档全部归入 [inputs/](https://github.com/fore-thought/deepseek-harness-project-collection-starter/tree/main/project-template/inputs)、[process/](https://github.com/fore-thought/deepseek-harness-project-collection-starter/tree/main/project-template/process)、[outputs/](https://github.com/fore-thought/deepseek-harness-project-collection-starter/tree/main/project-template/outputs) 三大类；目录结构由它自动索引，用户不维护目录文档，agent 自己维护；
- 规范不只是项目级——上面那个 [shared-standards/](https://github.com/fore-thought/deepseek-harness-project-collection-starter/tree/main/shared-standards) 是它单独的组级一层，连同规范自身的修订流程（提案 → 用户批准 → 版本化 → 变更记录），后面专门有一节讲，那才是这套设计真正的重心。

说白了就是把“怎么干活”从聊天记录里搬出来，沉淀成文件系统的固定结构。聊天记录会蒸发，文件不会。

## 三、为什么是文档，不是代码
有个误会得先说清楚：**这不是只管代码项目的。** 目前拿它试过的五六个项目都是自家试验田，还没公开上线，但类型恰好铺得很开：第一个跑通的实例是一个几乎不含代码的市场调研报告项目，之后是 AI 动画、AI 绘图、AI 游戏、Java 代码生成、自媒体文稿生成。每个项目的 [outputs/](https://github.com/fore-thought/deepseek-harness-project-collection-starter/tree/main/project-template/outputs) 和 [process/project/](https://github.com/fore-thought/deepseek-harness-project-collection-starter/tree/main/project-template/process/project) 都各长各的样——有项目出报告，有项目出关键帧和成片，有项目出代码和包——但这些差别全由 AI 按项目需要自己决定，摊到用户头上的动作，始终只有“给文件夹改个名”那一步。只要你的项目有“吃进素材 → 走过程 → 出产物”这三段，它就适用。

**agent 现在足够听话了。** DSH 对 [AGENTS.md](http://agents.md/) 的加载和遵循是确定性的，“文档即程序”的时机已经成熟。专门写代码去管文档，等于又给自己养一个要维护的东西。

这套东西的开销也很小：没有一行常驻运行的代码，token 花销就是会话开头多读几份短 markdown，换来的是每次会话省去几百字的“背景交代”。

这些项目同时也是规范的试验田：规范没有一条是我凭空想出来的——哪个项目里 agent 乱了规矩，就提炼成条款补回去；条款在新项目里好使，再反哺回组级规范。**跑的项目越多，规范越合手——是模板在替你积累经验，不是你伺候模板。**

## 四、shared-standards：真正的重心在工作区之外那一层
模板里有一个不随项目走、也不属于任何单个项目的文件夹：[shared-standards/](https://github.com/fore-thought/deepseek-harness-project-collection-starter/tree/main/shared-standards)——**项目组级**公共规范（协作规范 [AGENTS.md](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/shared-standards/AGENTS.md)、合规与工程规范 [standards.md](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/shared-standards/standards.md)、用户配置模板）。这个仓库管的是“一整组项目”，而不是“一个项目”，而这一组项目能不能管住，全看这一层。

- **共享方式**：每个项目工作区用相对路径 [../shared-standards/](https://github.com/fore-thought/deepseek-harness-project-collection-starter/tree/main/shared-standards) 只读引用它。新项目 = 复制 [project-template/](https://github.com/fore-thought/deepseek-harness-project-collection-starter/tree/main/project-template) 改名，引用自动成立——规范只有一份，改一处处处生效。
- **为什么强制只读**：规范复制进项目 = 分叉的开始。各项目各留一份拷贝，时间一长各改各的，又回到“各写各的”。所以这个文件夹放在工作区**外面**，agent 的写权限只覆盖本项目工作区，物理上就改不到它。
- **真要改怎么办**：走**提权通道**——agent 对越界写操作申请一次性权限并说明理由，用户批准才能动。门禁设在权限层，不靠 agent 自觉。
- **冲突怎么办**：组级规则分两档——TOP 规则不可覆盖，要动只能用户主导；其余条款都是“默认值”，项目想覆盖，必须在自己 [AGENTS.md](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/project-template/AGENTS.md) 里显式写出覆盖条款和理由；覆盖经验证明有通用性的，走提权通道回写组级，不留隐性分叉。

规范里还有一条专管规范自己的预算条款：**新增规则必须说明“防什么事故”（频率 × 损失），说不清楚的不予采纳，或降为建议。** 所以这份文档从 v1.0 迭代到 v1.11，新加的每一条都被问过“它防了什么事故”，没有一行是凑数的。

## 五、四道闸：门禁靠物理动作，不靠自觉
模板里内置了一套流程门禁（具体条款就写在 [shared-standards/](https://github.com/fore-thought/deepseek-harness-project-collection-starter/tree/main/shared-standards) 的组级规范里），全部由 [AGENTS.md](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/shared-standards/AGENTS.md) 在会话开局约束 agent 行为：

1. **立项闸**：先写一份 [goal-spec](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/project-template/process/docs/plans/goal-spec.md)（六个字段：成品形态 / 质量上限 / 质量下限 / 渠道与受众 / 成功判定 / 排除项），用户逐条确认签字，没签字禁止干活；
2. **规划闸**：进 plan 模式写计划书 + 门禁表，批准后才执行；
3. **执行闸**：一个工作单元 = 一个 git 分支 = 一个会话；每个单元收完要打勾七步（验收、写日志、commit、push、用户确认……），缺一不进下一个单元；
4. **接续闸**：新会话第一步固定读档顺序，保证换会话不失忆。

另外是两个我最想安利的小文档：

- [assumptions.md](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/project-template/process/docs/assumptions.md)——所有调研报告里的数字都当“待验证假设”，引用必须挂假设编号，还要标注 [MEASURED] / [ESTIMATED] / [UNKNOWN]。**先登记，再引用，没登记就算调研没交付。**
- [construction.md](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/project-template/process/docs/construction.md)——只记录**成功步骤**的施工文档。理想状态是：换一个人、换一个 AI、从一个空文件夹出发，照着这份文档能把当前项目进度原地复原。

## 六、会话不是越长越好：60% 就交接
这是我自己受益最大的一条。约定：当会话上下文占用接近或超过 **60%**，就停下来生成[交接文档（handoff）](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/project-template/process/docs/HANDOFF.md)，开新会话继续。

在当前会话里直接说这段话就行（可复制）：

> 本次会话暂时先到这里，整理一下本次会话的所有里程碑性成果，梳理会话中得到的经验和知识，更新相关文档，我们将在下一次新的会话中继续当前工作，准备好交接文档，并进行 git 提交，最后把我需要在下一次新的会话中发的第一句话整理好。

新会话开局的第一个动作，就是上一节说的**接续闸**：读 [HANDOFF.md](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/project-template/process/docs/HANDOFF.md) → 读 TOP 规则 → 读 [work-log.md](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/project-template/process/docs/work-log.md) 尾部和 [decisions.md](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/project-template/process/docs/decisions.md) 决策索引 → 判断当前处于哪道流程关口。

这套机制跑顺之后的体验是：**上下文爆炸不再是焦虑，而是一个到点就执行的例行动作。** AI 不是在“失忆前抢救”，而是永远在满血状态干活。

## 七、现在能拿到什么
适用场景：同时用 DSH 跑多个项目——代码、调研、内容创作都算；或者被“会话一长就乱”困扰过。

- 仓库地址：[https://github.com/fore-thought/deepseek-harness-project-collection-starter](https://github.com/fore-thought/deepseek-harness-project-collection-starter)
- fork / clone → 改名 → 打开，三步上手；填一次 git 身份（复制 .template 配置模板即可，不填走本地默认模式）
- 后续规划：把整套模板 Skill 化、打包成 DSH 插件——不过按第三节说过的，能用文档解决的我就尽量不写代码，这个坑我会慎填。

仓库会长期维护，规范文档每次修订都带版本号和变更记录。
