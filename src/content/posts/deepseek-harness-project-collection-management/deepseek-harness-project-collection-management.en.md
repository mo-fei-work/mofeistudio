---
title: How to manage projects better? Don't manage them! — My DeepSeek Harness project-collection management template is now open source
summary: "Every management action is written into documents: group-level shared spec, four process gates, 60% handoff."
date: 2026-09-09T15:16:00+08:00
type: solution
related: []
---

> ![How to manage projects better? Don't manage them!](/posts/deepseek-harness-project-collection-management/images/cover.png)
>
> I open-sourced a template repository: **with it, the AI inside DeepSeek Harness can manage an entire group of projects for you** — how directories are maintained, how the spec is updated, how sessions hand off — you don't lift a finger.

After running projects with DeepSeek Harness (DSH for short) for a while, I found the real pain point is not "can AI write code", but that **once projects multiply and sessions grow long, everything starts to slip**:

- Documents, materials, artifacts, and temporary files are mixed together in one repository, and the AI has to "find its way" again every single time;
- Once session context usage passes 70%~80%, the AI starts forgetting things: decisions made earlier get overturned and redone, and a new session means briefing it all over again;
- The spec of this project and that project are each written separately, change one and you miss the other;
- Worst of all: **you spend a huge amount of time "managing projects", and management itself produces no deliverable.**

My current solution is a bit counterintuitive: **How to manage projects better? Don't manage them!** Write every management action into documents, so the agent executes them by itself at the start of a session. The template repository is already open source; clone it and rename it, and you can use it.

## 1. How to use it: three steps, no plugins

1. **Clone** the whole repository (address at the end of this post) and leave the [shared-standards/](https://github.com/fore-thought/deepseek-harness-project-collection-starter/tree/main/shared-standards) folder untouched;
2. **Rename** [project-template/](https://github.com/fore-thought/deepseek-harness-project-collection-starter/tree/main/project-template) to your workspace name, for example big-fat-fish;
3. **Open** that workspace in DSH, create a new session, and just chat.

That's all. No plugin to install, no prompt engineering to maintain, no config file to write before it runs. The whole repository looks like this:

```
 deepseek-harness-project-collection-starter/
 ├── shared-standards/     # group-level shared spec: referenced by every project; the user leaves it alone too
 ├── project-template/     # this is the one you copy and rename; one workspace = one project
 │   ├── AGENTS.md         # the only root-level document: project spec + directory index, loaded automatically
 │   ├── inputs/           # 1. Input material (user/ what you provide; ai/ what research produced)
 │   ├── process/          # 2. Process engineering (project/ code and scripts, docs/ documents, templates/ templates)
 │   └── outputs/          # 3. Artifacts (knowledge/, video/ …)
 └── README.md
```

## 2. The core mechanism: documents referencing documents, spec as code

**Two layers of spec: the boundary between group-level and project-level**

- **Project spec**: the single root-level document inside the workspace ([AGENTS.md](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/project-template/AGENTS.md)), governing this project's own rules and directory index. It sits **inside** the project workspace, and the agent has write permission on it.
- **Group-level spec**: the one **outside** the workspace ([shared-standards/](https://github.com/fore-thought/deepseek-harness-project-collection-starter/tree/main/shared-standards)), governing what is shared across projects — how we collaborate, compliance requirements, engineering standards. Every project references it read-only.
- **Boundary**: a project spec may override a default in the group-level spec, but the override clause and its reason must be written out explicitly in that project; changing the group-level spec itself has to go through the escalation channel, not be patched inside a project.
- **Responsibility**: the group-level spec decides "what counts as correct for all projects", the project spec decides "how this particular project does it".

What makes this work is one property of DSH: **the [AGENTS.md](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/project-template/AGENTS.md) at the workspace root is loaded automatically in every session**.

I used no code plugin at all; the entire organisational work is "referenced" into existence by markdown documents:

- The project-level [AGENTS.md](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/project-template/AGENTS.md) is the only root-level document in the workspace, and everything else falls into three categories — [inputs/](https://github.com/fore-thought/deepseek-harness-project-collection-starter/tree/main/project-template/inputs), [process/](https://github.com/fore-thought/deepseek-harness-project-collection-starter/tree/main/project-template/process), [outputs/](https://github.com/fore-thought/deepseek-harness-project-collection-starter/tree/main/project-template/outputs); the directory structure is indexed by that document automatically — the user does not maintain a directory document, the agent maintains it;
- The spec does not stop at project level — that [shared-standards/](https://github.com/fore-thought/deepseek-harness-project-collection-starter/tree/main/shared-standards) above is its own group-level layer, together with the revision process for the spec itself (proposal → user approval → versioning → changelog). There is a dedicated section on that later; that layer is the real centre of gravity of this design.

Put plainly, this moves "how work gets done" out of chat history and deposits it into a fixed filesystem structure. Chat history evaporates; files do not.

## 3. Why documents, not code

There is a misunderstanding to clear up first: **this is not only for code projects.** The five or six projects I have tried it on so far are all my own testing grounds, none publicly launched, but the types happen to spread widely: the first instance that ran end to end was a market research report project containing almost no code, followed by AI animation, AI drawing, AI games, Java code generation, and social-media copy generation. Each project's [outputs/](https://github.com/fore-thought/deepseek-harness-project-collection-starter/tree/main/project-template/outputs) and [process/project/](https://github.com/fore-thought/deepseek-harness-project-collection-starter/tree/main/project-template/process/project) look different — some produce reports, some produce keyframes and finished video, some produce code and packages — but all those differences are decided by the AI according to the project's needs. The action that lands on the user is always the same one step: renaming a folder. As long as your project has the three stages "take in input material → go through a process → produce an artifact", it applies.

**Agents are obedient enough now.** DSH's loading of and adherence to [AGENTS.md](http://agents.md/) is deterministic; the moment for "documents as programs" has arrived. Writing dedicated code to manage documents is just raising another thing you have to maintain.

The overhead is small too: not a single line of code runs permanently; the token cost is reading a few short markdown files at the start of a session, and what you get back is saving several hundred characters of "background briefing" every session.

These projects are also the spec's testing ground: not one clause came out of thin air — whenever an agent broke the rules in some project, that got distilled into a clause and added back; when a clause worked well in a new project, it was fed back into the group-level spec. **The more projects you run, the better the spec fits — the template accumulates experience for you, you do not wait on the template.**

## 4. shared-standards: the real centre of gravity is the layer outside the workspace

The template has one folder that does not travel with a project and belongs to no single project: [shared-standards/](https://github.com/fore-thought/deepseek-harness-project-collection-starter/tree/main/shared-standards) — the **project-group-level** shared spec (collaboration spec [AGENTS.md](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/shared-standards/AGENTS.md), compliance and engineering spec [standards.md](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/shared-standards/standards.md), and a user config template). This repository manages "a whole group of projects" rather than "one project", and whether that group can be kept under control depends entirely on this layer.

- **How it is shared**: every project workspace references [../shared-standards/](https://github.com/fore-thought/deepseek-harness-project-collection-starter/tree/main/shared-standards) read-only by relative path. A new project = copy [project-template/](https://github.com/fore-thought/deepseek-harness-project-collection-starter/tree/main/project-template) and rename it, and the reference holds automatically — there is only one copy of the spec, change it once and it takes effect everywhere.
- **Why read-only is enforced**: copying the spec into a project is where divergence begins. Each project keeps its own copy, and over time each gets edited separately, which lands you back in "each writing their own". So this folder sits **outside** the workspace; the agent's write permission covers only the project workspace, so physically it cannot be changed.
- **What if it really must change**: go through the **escalation channel** — the agent requests one-off permission for an out-of-bounds write and states the reason; only the user's approval lets it through. The gate is set at the permission layer, not left to the agent's self-discipline.
- **What about conflicts**: group-level rules come in two grades — TOP rules cannot be overridden and can only be changed with the user leading; every other clause is a "default", and a project that wants to override it must write the override clause and the reason explicitly in its own [AGENTS.md](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/project-template/AGENTS.md); if the override proves generally useful, it goes back into the group level through the escalation channel, leaving no hidden fork.

The spec also has a budget clause that governs the spec itself: **every new rule must state "which incident it prevents" (frequency × loss); anything that cannot be stated clearly is rejected or demoted to a suggestion.** That is why this document went from v1.0 to v1.11 with every added clause having been asked "what incident does it prevent" — not one line is padding.

## 5. The four gates: enforcement by physical action, not self-discipline

The template ships a set of process gates (the clauses live in the group-level spec under [shared-standards/](https://github.com/fore-thought/deepseek-harness-project-collection-starter/tree/main/shared-standards)), all of them constraining the agent's behaviour at the start of a session through [AGENTS.md](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/shared-standards/AGENTS.md):

1. **Kickoff gate**: first write a [goal-spec](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/project-template/process/docs/plans/goal-spec.md) (six fields: deliverable form / quality ceiling / quality floor / channel and audience / success criteria / exclusions), and the user signs off on each item. No signature, no work;
2. **Planning gate**: enter plan mode, write the plan plus the gate table, and only execute after approval;
3. **Execution gate**: one work unit = one git branch = one session; when a unit is finished you tick seven boxes (acceptance, write the log, commit, push, user confirmation…), miss one and you do not enter the next unit;
4. **Resume gate**: a fixed load order as the first step of a new session, so switching sessions does not lose memory.

Two more small documents I most want to recommend:

- [assumptions.md](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/project-template/process/docs/assumptions.md) — every number in a research report is treated as an "unverified assumption"; citing it requires an assumption ID and a tag of [MEASURED] / [ESTIMATED] / [UNKNOWN]. **Register first, cite second; unregistered means the research was not delivered.**
- [construction.md](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/project-template/process/docs/construction.md) — a construction doc recording **only successful steps**. The ideal: another person, another AI, starting from an empty folder, can follow this document and reproduce the current project state on the spot.

## 6. Sessions are not better the longer they get: hand off at 60%

This is the one that has benefited me most. The convention: when session context usage approaches or exceeds **60%**, stop and generate a [handoff doc](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/project-template/process/docs/HANDOFF.md), then open a new session to continue.

Just say this in the current session (copyable):

> Let's pause this session here for now. Organise all the milestone results of this session, sort out the experience and knowledge gained during it, update the relevant documents — we will continue the current work in a new session next time. Prepare the handoff doc, make the git commit, and finally write out the first sentence I need to send in the next new session.

The first action of a new session is the **resume gate** mentioned above: read [HANDOFF.md](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/project-template/process/docs/HANDOFF.md) → read the TOP rules → read the tail of [work-log.md](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/project-template/process/docs/work-log.md) and the decision index in [decisions.md](https://github.com/fore-thought/deepseek-harness-project-collection-starter/blob/main/project-template/process/docs/decisions.md) → work out which process gate you are currently at.

Once this runs smoothly, the experience is: **context explosion is no longer anxiety, it is a routine action that executes when the point is reached.** The AI is not "rescuing things before amnesia"; it always works at full capacity.

## 7. What you get right now

Applicable when: you run multiple projects in DSH at the same time — code, research, content creation all count; or you have been bothered by "it all goes messy once sessions get long".

- Repository: [https://github.com/fore-thought/deepseek-harness-project-collection-starter](https://github.com/fore-thought/deepseek-harness-project-collection-starter)
- fork / clone → rename → open, three steps to start; fill in the git identity once (copy the .template config, or leave it and use the local default mode)
- Roadmap: turn the whole template into a Skill and package it as a DSH plugin — but as said in section 3, whatever documents can solve I try not to write code for. I will tread carefully there.

The repository will be maintained long term, and every revision of the spec document carries a version number and a changelog.
