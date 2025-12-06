# AX Model Study — Control Document v1.0.0

> **File Purpose:** This is the material all models will analyze. It is a curated excerpt of the AX framework.
> **Protocol Reference:** [PROTOCOL.md](./PROTOCOL.md) v1.0.0
> **Material Hash (SHA-256):** `TO_BE_COMPUTED_AFTER_FINALIZATION`
> **IMPORTANT:** Do not modify this file. Any change invalidates the study protocol.

---

## Agent eXperience (AX) — Core Framework

### Definition

**AX (Agent eXperience)** is the discipline of designing systems where agents—AI models, automated workflows, non-human operators—are first-class consumers of tools, APIs, workflows, and memory.

### Core Thesis

> AX is about **legibility**: making systems legible to non-human operators.

The term "experience" is borrowed from UX/DX as a framing device. Agents do not have phenomenal experiences. But the question "What does this operator need to succeed?" surfaces the same design considerations regardless of whether the operator is human or machine.

**Key insight:** If you cannot explain your system to an agent, you probably do not understand it yourself.

### The AX Question

> Could an agent operate this system reliably, without a human babysitting every step?

If the answer is "no," the system is not agent-ready. It is a human system with AI at the edges.

### AX Augments—It Does Not Replace

AX is not a replacement for UX or DX. It is an *augmentation*. Each discipline recognizes a distinct user class:

- **UX** → human end-users
- **DX** → developers building on the system
- **AX** → agents operating within the system

All three coexist. A well-designed system serves all three. And here is the bonus: **systems that become legible to agents become more understandable to humans, not less.** The discipline required for AX raises the floor for everyone.

---

## The Five Principles of AX

### 1. Deterministic First

> Agents can be stochastic. The environment should not be.

- Preparation, gates, and outputs should be deterministic.
- Randomness belongs in a clearly bounded "vacuum."
- If an agent cannot tell whether it made a mistake or the environment did, it cannot improve.

**Good AX:** Same input → same output. Explicit seeds for any randomness.
**Bad AX:** Flaky tests. Inconsistent logs. "Sometimes this step runs."

### 2. Structured Over Conversational

> JSON > prose. Tables > paragraphs. Schemas > vibes.

- Every important CLI has a `--json` flag.
- APIs return typed, schema-validated structures.
- Errors follow a known schema with codes and context.

**Good AX:** Machine-readable by default, human-readable as supplement.
**Bad AX:** "See the README for details." Regex-required parsing.

### 3. Fail Loud, Recover Clear

> Failing is fine. Silent or opaque failure is not.

AX-friendly failures:
- Explain what failed
- Explain why (as best as possible)
- Suggest 1–3 concrete next actions

**Good AX:**
```json
{
  "ok": false,
  "error": {
    "code": "MISSING_CONFIG",
    "message": "config.yaml missing required field 'targets'",
    "nextActions": ["Add 'targets' field", "Run 'init' to generate template"]
  }
}
```

**Bad AX:** "Error: undefined." Silent failures. "Something went wrong."

### 4. Memory Is A Feature

> Agents without context are expensive and dumb.

- Every new session starts fresh unless memory is designed in.
- Workflows should begin with recall ("What do we know?") and end with receipts ("Here's what we did").
- The system remembers, not the model. Any model that can read the memory format can continue the work.

**Good AX:** Stable memory schema. Searchable reference points. Machine-usable summaries.
**Bad AX:** Stateless sessions. Chat logs as "history." No systematic retrieval.

### 5. Teach Through Constraints

> Guardrails are not limitations. They are the curriculum.

Constraints shape behavior toward correctness. But individual agents do not learn across sessions. So who learns?

**The system learns.** Designers learn by watching agents fail within bounds.

- Tool budgets reveal bad task decomposition.
- Required output formats reveal ambiguous instructions.
- Scope limits reveal unclear architecture.

**Good AX:** Observable constraint violations. Stable, enforced guardrails.
**Bad AX:** "Do whatever you think is best." Unobserved violations.

---

## AX Maturity Model

| Level | Name | Characteristics |
|-------|------|-----------------|
| 0 | Agent-Hostile | Unstructured output. No error recovery. Implicit expectations. |
| 1 | Agent-Tolerant | Some `--json`. Basic errors. Docs exist but require scraping. |
| 2 | Agent-Friendly | Structured default. Recovery hints. Memory layer exists. |
| 3 | Agent-Native | Deterministic prep. Integrated memory. Constraints as teaching. AX is a release criterion. |

---

## Why AX Matters

AX matters because **agents are a forcing function for better system design.**

Designing for agents forces you to:
- Make implicit assumptions explicit
- Encode decisions in structured formats
- Build observable failure modes
- Create memory that outlives sessions
- Define clear boundaries

These are not gifts to agents. They are **discipline for humans.**

> Systems that agents can operate are systems that humans can finally *understand*—not just use.

---

## Summary

1. **AX = Legibility** for non-human operators
2. **Five Principles:** Deterministic, Structured, Fail Loud, Memory, Constraints
3. **Maturity:** Level 0 (Hostile) → Level 3 (Native)
4. **Benefit:** Better agent reliability AND better human understanding

---

*Source: SmarterGPT / Lex Project — December 2025*
