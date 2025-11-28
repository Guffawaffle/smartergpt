# SmarterGPT Stack (Lex 1.0.0)

v1.0.0 on npm • Local-first OSS core + private runner

# Work continuity with receipts, not vibes

smartergpt is the stack: Lex, an open-source memory + policy engine, and LexRunner, a proprietary merge-weave runner built on Lex. When you ask "Why is this button still disabled?", you get policy-aware answers backed by timestamped work receipts, not guesses.

Lex 1.0.0 is the point where that story becomes stable. We stopped treating Lex as "just a memory store" and finished the job of turning it into the contract-bearing mind of the system: Frames, policy, and repository-level contracts that other tools can rely on.

- Lex (Mind): episodic memory and policy-as-code with a shared module vocabulary.
- LexRunner (Body): a deterministic merge pyramid runner built on top of those contracts (private, invite-only).
- LexSona (Soul): behavioral memory on top of Lex (research / in-progress).

From here on, Lex is the part that stays MIT-licensed and predictable. Orchestrators, agents, and runners sit on top of those guarantees.

## The 0.4.6-alpha → 1.0.0 leap

On the website, Lex lived at v0.4.6-alpha while we were quietly dogfooding it as the backbone of LexRunner. The 1.0.0 line is not "we added a bunch of random features"; it is "we froze the core contracts Lex owes to the rest of the stack."

Once we got that boundary right, development velocity jumped. We were iterating so quickly with AI coding agents and CI that GitHub literally told us to slow down. We do not take that as a badge of honor. We take it as feedback that:

- our low-token strategies for agents are real and effective, and
- we need to be more disciplined about how we drive hosted coding agents and CI so we do not overwhelm the platform.

GitHub's limits are a forcing function: they push us to design flows where agents start from Lex, use the smallest possible policy- and memory-aware context, and only then fan out into work.

## Where yaml fits in (without making it the whole story)

You will see references to lex.yaml across the docs. Think of it as a repository-level contract file: a declarative description of the kinds of workflows and policies Lex should know about in this repo.

- It is about "what exists" and "what is allowed," not about how any private runner implements orchestration.
- It gives agents and tools a shared vocabulary for workflows ("review-pr", "ship-release", "refactor-module") tied back to policy and memory.
- It keeps the interesting design work in Lex (open) and lets different executors exist in parallel on top of the same contracts.

The website should mention lex.yaml as part of the contract surface of Lex, not as a product on its own. The headline is still receipts, not vibes; yaml is just how we spell the contracts that make those receipts reliable.
