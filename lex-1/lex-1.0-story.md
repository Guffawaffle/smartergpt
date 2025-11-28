# Lex 1.0.0: Contracts First, Velocity Second

Lex started life as "the memory piece" of a bigger idea: an AI-assisted development stack where work moves forward with receipts, not vibes. Early versions focused on Frames, Atlas Frames, and policy-as-code. Useful, but incomplete.

Lex 1.0.0 is where we draw a clear line: Lex is not just a memory store. It is the contract-bearing mind of the smartergpt stack.

## Why the version jump looks wild

From the outside, going from v0.4.6-alpha to v1.0.0 in a short window can look suspicious:

- "Did they ship a ton of features all at once?"
- "Is this just a vanity version bump?"

The reality is almost the opposite. Most of the hard work between those numbers was *subtractive*:

- stripping out things that did not belong in Lex,
- clarifying boundaries with LexRunner, and
- freezing the contract surfaces that other tools depend on.

1.0.0 is not "we did everything." It is "we stopped changing the parts that other people need to trust."

## The moment LexRunner forced us to decide

LexRunner is a private, deterministic merge pyramid runner built on Lex. To make it real, we had to answer a simple, brutal question:

> What does Lex absolutely owe to any runner, and what should never leak out of the runner back into the open-source core?

That question led to three clear responsibilities for Lex:

1. **Frames**: episodic memory of what happened, with module-level scope and next actions.
2. **Policy**: `lexmap.policy.json` describing architecture boundaries and constraints.
3. **Contracts**: `lex.yaml` describing workflows and expectations at the repository level.

Everything else lives on top.

- LexRunner consumes these contracts and implements a deterministic merge pyramid, but its detailed plan formats stay private.
- Other orchestrators can do something entirely different as long as they respect the same contracts.

Once we committed to that split, Lex finally had a shape that made sense long term.

## When GitHub told us to slow down

With the contracts in place, we could wire Lex, LexRunner, and AI coding agents together in serious workflows:

- Lex keeps track of what happened and what is allowed.
- Orchestrators generate plans.
- LexRunner drives merges through gates.
- Agents do the local refactors and implementation work.

At peak, this combination produced so much automated activity that GitHub throttled us. That is a real story, not a marketing exaggeration.

We do *not* frame that as "we are so extreme that we broke GitHub." We frame it as:

- proof that the architecture can saturate hosted tooling, and
- a sign that we need to be more careful about how we use those tools.

In practical terms, it pushed us toward:

- **Smaller, lower-token prompts.** Lex's Frames and Atlas Frames are tuned for compact, high-signal context instead of giant mega-prompts.
- **Agent-first flows.** Hosted coding agents should be the first stop, not the last resort, but they need disciplined inputs.
- **Respecting shared infrastructure.** CI and hosted agents are shared resources. Hitting rate limits is a coordination bug, not a flex.

Lex 1.0.0 is where we commit to this posture: intelligent velocity over brute-force throughput.

## YAML as core contracts (without making it the star of the show)

The most important new idea to surface cleanly during this period was simple:

> We need a way to describe what work *means* in a repo, without shipping any particular executor.

That is what `lex.yaml` is for.

Think of it as the "intent map" for a repository:

- It names workflows that matter: `review-pr`, `ship-release`, `refactor-module`, `clean-debt`.
- It describes the inputs they expect (like `pr_number`, `ticket_id`, or `module_scope`).
- It links those workflows back to policy and memory surfaces.

What it does *not* do:

- It does not embed merge strategies, fan-out details, or gate wiring for any particular runner.
- It does not "contain LexRunner inside YAML."

Instead, it plays the same role as standards like OpenAPI or Docker Compose:

- **Describe what exists**, not how any implementation works.
- **Stay stable and public**, so that multiple implementations can exist.
- **Remain small and human-readable**, so that people can reason about it without tools.

Lex remains the OSS keeper of those contracts. Any runner, including LexRunner, is a consumer, not a hidden author.

## What 1.0.0 actually commits to

By calling this 1.0.0, we are making a set of promises:

1. **The contract surfaces are stable.** Frames, Atlas Frames, `lexmap.policy.json`, and `lex.yaml` are here to stay. They may evolve, but they will not thrash.
2. **The CLI and MCP behavior are safe to automate.** The way Lex reports status, outputs JSON, and surfaces policy/memory is intended to be CI- and agent-friendly, not a moving target.
3. **Lex stays local-first and MIT.** The core will keep running with local SQLite, MCP stdio, and no telemetry.
4. **LexRunner and other runners remain optional.** You can adopt Lex for policy-aware recall today without ever touching LexRunner. If you do integrate a runner, it will use contracts that are already part of the OSS story.

## How this should show up on the website

For the public site, the goal is to tell this story without turning it into a wall of text:

- Front page: update the hero to reflect Lex 1.0.0, mention that we crossed a contract-stability milestone, and frame GitHub throttling as a lesson in responsible velocity.
- Lex project page: emphasize Lex as the contract-bearing mind (Frames + policy + contracts), with a short "From 0.4.6-alpha to 1.0.0" section.
- LexRunner page: keep focusing on the deterministic merge pyramid at the concept level, without exposing private plan formats.
- Docs: introduce `lex.yaml` as an intent-level contract file, not as an execution engine.

The throughline should stay the same as day one:

> Work continuity with receipts, not vibes.

Lex 1.0.0 is just the moment we can say, with a straight face, that the contracts behind those receipts are solid enough for other people to build on.
