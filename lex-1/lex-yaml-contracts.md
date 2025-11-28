# `lex.yaml`: Intent-Level Contracts For Your Repo

`lex.yaml` is a repository-level contract file for Lex. It tells tools and agents what kinds of work exist in this codebase, what they are allowed to touch, and which policies apply.

It is intentionally *not* an execution engine. Think of it as a vocabulary for intent, similar to:

- OpenAPI for describing HTTP APIs.
- Docker Compose for describing services.
- GitHub Actions workflow syntax for describing jobs.

In all of those cases, the file describes *what* exists and *how* it is wired conceptually. The actual runtimes and runners stay separate.

## Why `lex.yaml` exists

As we built LexRunner and wired Lex into AI coding agents, we kept running into the same problem:

- Frames tell us what happened.
- Policy tells us what is allowed.
- But nothing in the repo was telling agents "what work *means* here."

`lex.yaml` solves that.

- It gives names and structure to workflows like "review a PR", "ship a release", or "refactor a module".
- It ties those workflows back to Frames and policy without embedding any particular runner's internal plan format.
- It gives hosted agents a small, explicit document to read before they start doing work.

## What belongs in `lex.yaml`

At a high level, `lex.yaml` is where you describe:

- **Workflows**: the named units of work that matter in this repo.
- **Inputs**: what each workflow needs in order to run (PR numbers, ticket IDs, directory scopes, etc.).
- **Scopes and policies**: which modules or services the workflow is allowed to touch, and which policy rules matter.
- **Modes** (optional): how conservative, exploratory, or fast-lane a given workflow should be.

A sketch, deliberately simplified and not tied to any particular runner:

```yaml
workflows:
  review-pr:
    description: "Review a pull request using Lex memory + policy."
    inputs:
      pr_number:
        type: integer
        required: true
    scope:
      module_scope: "services/**"
    policy:
      must_pass:
        - "no-forbidden-edges"
        - "no-critical-lints"

  ship-release:
    description: "Prepare and ship a tagged release."
    inputs:
      tag:
        type: string
        required: true
    scope:
      module_scope: "src/**"
    policy:
      must_pass:
        - "release-checklist-complete"
```

This example is intentionally generic. The real schema is documented alongside Lex, but the principles are the same:

- Humans should be able to read and edit it.
- Agents should be able to parse it and know what is in-bounds.
- Runners should be able to consume it as a contract, not as instructions.

## What does *not* belong in `lex.yaml`

To protect the separation between Lex and private runners, there are things we deliberately keep out of `lex.yaml`:

- No explicit gate wiring for specific runners.
- No merge strategies or pyramid details.
- No references to internal plan formats or file names used by private tools.

Those belong either in:

- the runner's own configuration, or
- the private plan documents that runners consume.

`lex.yaml` stays small, stable, and public.

## How `lex.yaml` interacts with LexRunner (conceptually)

LexRunner is one example of a tool that can consume `lex.yaml`, but it is not special from the perspective of the file itself.

Conceptually:

1. Lex provides Frames, policy, and `lex.yaml`.
2. An orchestrator (human or AI) reads `lex.yaml` to understand what workflows exist and which policies apply.
3. That orchestrator produces a separate, versioned merge plan document for a runner (like LexRunner) to execute.
4. LexRunner reads the plan, runs gates, and applies merges in a deterministic order.

Only step (1) is part of the open-source Lex story. Steps (2)-(4) are where private runners and orchestration strategies live.

This keeps the line clear:

- `lex.yaml` is the shared, OSS language for "what work means here."
- Private plan formats are where "how our runner executes that work" lives.

## How to talk about `lex.yaml` on the site

On the public website, `lex.yaml` should show up as:

- part of Lex's contract surface, alongside Frames and `lexmap.policy.json`;
- a way for repos to describe their workflows to agents and tools; and
- a YAML file that anybody can read and build against, regardless of which runner they prefer.

It should *not* be the headline. The headline is still that Lex gives you work continuity with receipts, not vibes. `lex.yaml` is just how we spell those contracts in a way that humans, agents, and runners can all agree on.
