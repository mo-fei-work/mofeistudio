---
title: "A Brief Note: The Impossible Triangle of Scaling Agents"
summary: Inspired by He Lu, on the trilemma of scaling agents — high complexity, context, and low parallelism.
date: 2026-09-29T11:34:00+08:00
type: judgment
related:
  - deepseek-harness-project-collection-management
---

> Inspired by [He Lu](https://www.superlinear.academy/u/5f38fce1)'s post [Using agents made me busier: on the impossible triangle of scaling agents](https://www.superlinear.academy/c/posts/agent-agent-1c4a59)
>
> As a software engineer, here is how I see these three:
>
>

## 1. High task complexity

What my practice actually found is that the complexity of an AI-Native project compounds continuously, which also matches the long-term iterative maintenance trend of traditional software engineering. Within that, where the AI enters is critical.

I favour the AI-Native project entering from the very beginning — from kickoff, where the kickoff decision should pass its gate through a joint exploration by the human and the AI, with the AI producing the final output, which involves AI research and background knowledge accumulation.

Feasibility analysis and validation should also be driven mainly by the AI and should produce experience-and-lesson documents it can draw on, so that a more reliable /plan or /goal output document is formed before the planning gate; the first version of the spec document determines the floor of complexity.

But a spec document should not be dead; as implementation proceeds it should keep gaining what has actually landed, and based on what landed, promptly add optimisation and improvement directions — which will ultimately raise the complexity of the task step by step.

## 2. Stay within the effective context

Exactly — once context actually reaches somewhere around the middle, problems in the underlying model architecture such as the attention mechanism of current large models start producing unreliable consequences. (This is common knowledge; my discussion may not be rigorous, understanding is enough.)

So my countermeasure is simple and crude too: hand off at around 60%, and tidy up the current session document and the documents inside the repository. Always keep the context of a new conversation working between 0%~70%, and let the large model focus within each session.

Yes, the accumulated documents are many, so the documents (for example AGENTS.md) should evolve more into an index, and be loaded on demand.

How to load on demand? If the context of the session's main model is ample (far from 60%), the main model reads them. Otherwise, open a sub-agent to read and hand its feedback back to the main model — which is like compression (the sub-agent's returned content is more concise than the original spec document) but not actual compression (the main model's context was not actually compressed).

Worried the main model does not grasp the details of all the existing spec knowledge? Let the main model open a sub-agent to handle the detail — the sub-agent's context is always enough, isn't it?

Parts 1 and 2 can be read in my earlier article [How to manage projects better? Don't manage them! — My DeepSeek Harness project-collection management template is now open source](/en/posts/deepseek-harness-project-collection-management/)

## 3. Low parallelism (fewer agents, simpler management)

Honestly, this really is a hard point, and **I have not actually solved it well**, because it is a complex engineering problem. It involves resource contention, task decomposition and so on. My current evolving version is the pipeline idea — see the latest logic of the project below.

[deepseek-harness-project-collection-starter](https://github.com/fore-thought/deepseek-harness-project-collection-starter)

This is how I currently set it up in the template project. Suppose we have 3 roles, producer → implementer → verifier; in fact this is a very common sequence: design 1 → develop 2 → verify 3, with us humans doing project supervision and management.

You will say this is sequential, right? Where is the pipeline? Think about how we actually get work done in reality! Every person has projects at different stages hanging over their head, but with the same job responsibilities, you can do it too, and as long as the time windows line up you can keep going and finish them all. Time window → window → session window — right, each role can have multiple session windows; the content within each window is sequential, but the windows are parallel.

Why call it pipeline-style? When producer finishes design A1, implementer can develop A2, and that does not stop producer from designing B.

![agent pipeline](/posts/agent-extension-impossible-triangle/images/agent-pipeline.png)
