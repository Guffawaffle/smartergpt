# Lex: Policy-Aware Work Continuity (v1.0.0)

Lex is the open-source memory + policy engine in the smartergpt stack. It combines architecture policy-as-code with episodic memory (Frames) and Atlas Frames so you can ask "why is this blocked?" and get receipts from timestamped sessions, not vibes.

- npm: `@smartergpt/lex`
- Status: v1.0.0 • MIT-licensed • Node >= 20
- Transport: MCP stdio • Local SQLite • No telemetry

## What is Lex?

### Frames

Timestamped work session snapshots with summary, blockers, next action, and module_scope.

- Stored locally in SQLite.
- Indexed by the same module vocabulary used in policy.
- Designed to be small, explicit, and agent-friendly.

### Atlas Frames

Fold-radius neighborhoods (default 1) around touched modules to keep context precise and small.

- When you recall a Frame, you can also recall its neighboring modules.
- This lets agents see just enough of the code around a change, instead of the whole repo.

### Policy

Machine-readable boundaries in `lexmap.policy.json`: ownership, allowed/forbidden edges, flags, permissions.

- Policy is how you say "this module should never call that module" or "this path needs extra scrutiny."
- Lex surfaces policy violations as first-class data in Frames and CLI output.

### Contracts: `lexmap.policy.json` + `lex.yaml`

1. `lexmap.policy.json` describes architectural boundaries.
2. `lex.yaml` describes workflows and expectations.

Together they form the contract surface that agents, CI, and runners consume.

- `lex.yaml` is intentionally intent-level. It names workflows ("review-pr", "ship-release"), expected inputs, and relevant policy constraints.
- It does *not* describe how any private runner (including LexRunner) implements orchestration.
- Anyone can build an executor that consumes `lex.yaml`; LexRunner just happens to be the one we are building first.

Lex is the part that knows what you said is allowed, what actually happened, and why something is blocked.

## What is in 1.0.0 (concept-level)

The move from v0.4.6-alpha to v1.0.0 is not about a long list of new features. It is about stabilizing the core contracts Lex owes to the rest of the stack.

1. **Contract surfaces are frozen.** Frames, Atlas Frames, `lexmap.policy.json`, and `lex.yaml` form a stable, documented surface for agents and runners.
2. **CLI and MCP behavior is predictable.** Commands like `lex remember`, `lex recall`, and `lex check` are shaped for automation: JSON output, schema-checked payloads, and consistent status fields.
3. **Policy and memory are tightly joined.** Violations, ownership, and module IDs line up across policy files and Frames, so answers always come with receipts.
4. **Image support and exports remain.** 1.0.0 keeps the practical pieces that were already working in alpha (image attachments, structured module exports, etc.) while hardening the surrounding contracts.

For the full, low-level changelog, see the GitHub release notes. The website should stay concept-level: Lex is the stable, open, contract-bearing mind that runners can rely on.

## Why it works

### Shared vocabulary = receipts

Frames use the same module IDs as policy and the same workflow names as `lex.yaml`. Assistants and tools can cite:

- which policy rule was violated,
- which Frame observed it, and
- which workflow it is blocking.

That is explainable recall with receipts, not guesses.

### Local-first, agent-friendly

- Local SQLite. No cloud dependency.
- MCP stdio transport so agents can talk to Lex like any other tool.
- No telemetry; your history stays on your machine.

## From 0.4.6-alpha to 1.0.0: the Lex / LexRunner boundary

The surprising part of Lex 1.0.0 is not the version number; it is how quickly we moved once we stopped treating Lex as "just memory" and started treating it as the contractual backbone of the stack.

The internal story looks roughly like this:

1. **LexRunner forced the question.** To build a deterministic merge pyramid runner, we had to decide exactly what Lex would own and what the runner would own. That boundary work took longer than any individual feature.
2. **Contracts came first.** Once we knew that Lex's job was "Frames + policy + contracts" and that runners would consume those contracts, a lot of design noise disappeared.
3. **Velocity spiked.** With the contracts in place, we could iterate on Lex itself, LexRunner, and our orchestration prompts in parallel. At one point, GitHub literally restricted our activity. That was our signal that:
   - our low-token agent strategies were working, and
   - we needed to treat hosted coding agents and CI as shared infrastructure, not something to brute-force.
4. **1.0.0 is the line in the sand.** It marks the moment where the contract surfaces stabilized enough that we are comfortable depending on them long-term, both in our own runner and in the wider ecosystem.

We do not present the GitHub throttling as "look how hardcore we are." We present it as evidence that the architecture works, and as a reminder that responsible velocity means respecting platform limits and leaning on coding agents intelligently, not just pushing harder.

## Status & Install

- Status: v1.0.0 released on npm as `@smartergpt/lex`.
- Install: global CLI or local dependency.

```bash
# Global install (CLI)
npm install -g @smartergpt/lex

# Or as a project dependency
npm install @smartergpt/lex
```

After installation, run:

```bash
npx lex init
```

to set up your workspace, then use:

- `lex remember` to capture Frames,
- `lex recall` to pull back context and Atlas neighborhoods, and
- `lex check` to apply policy across your modules.

See the GitHub repo for full documentation and examples.
