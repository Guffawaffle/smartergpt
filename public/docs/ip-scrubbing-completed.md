# IP Protection — Scrubbing Complete

**Date:** December 13, 2025
**Status:** ✅ COMPLETED

## Summary

All proprietary implementation details have been removed from the public smartergpt website. The site now communicates **benefits and capabilities** without revealing **algorithms, data structures, or implementation specifics**.

## Changes Made

### 1. `/srv/www/smartergpt/projects/lex-pr/index.html`

**REMOVED:**
- Complete Kahn's algorithm implementation (step-by-step pseudocode with in-degree computation)
- Merge levels data structure with parallelization details
- Merge strategies selection logic
- Detailed schema v1 field definitions (id, branch, depends_on internals)
- Gate execution flow pseudocode (8-step process)
- Gate results structure with exit codes and status enums

**REPLACED WITH:**
- "Workflow Benefits" section highlighting outcomes (smart dependency resolution, parallel execution, conflict prevention, predictable results)
- "Configuration Schema" section showing example JSON structure without internal field semantics
- Generic "Automated Quality Validation" description without execution details

**RETAINED (safe generic concepts):**
- Topological sorting mention (standard CS algorithm, not proprietary)
- Git merge concepts (fast-forward, squash, merge commit - Git standard)
- Quality gates concept (industry standard)

### 2. `/srv/www/smartergpt/roadmap.html`

**REMOVED:**
- "topological + defrag strategies" → replaced with "intelligent merge ordering"
- Specific MCP tool names (`plan.create`, `gates.run`, `merge.apply`, `doctor`) → replaced with "comprehensive CLI"
- "MCP adapter with multi-repo server manifest generation" → replaced with "extensible integration layer with protocol adapter support"
- Profile resolution system details (`.smartergpt` / `.smartergpt.local`) → replaced with "environment-aware profile resolution"
- "Structured gate execution with exit code semantics" → replaced with "automated quality gate validation"

**RETAINED:**
- High-level operational status
- CLI and integration capabilities (generic)
- Merge pyramid workflow concept (marketing term)

### 3. `/srv/www/smartergpt/index.html`

**REMOVED:**
- "Topological order computed" in CLI example → replaced with "Merge order computed"

**RETAINED:**
- "Deterministic outputs" (generic enough, communicates reliability without revealing implementation)
- All value propositions and benefits

## Protected Concepts (Now Hidden)

The following proprietary implementations are **NO LONGER VISIBLE** on the public site:

🔒 **"Defrag" merge ordering strategy** — Novel conflict-minimization approach
🔒 **Kahn's algorithm step-by-step implementation** — Specific queue management, in-degree tracking
🔒 **Merge level computation** — Parallelization data structure and grouping logic
🔒 **Profile resolution precedence** — .smartergpt vs .smartergpt.local hierarchy
🔒 **MCP tool naming convention** — Specific command structure (plan.create, gates.run, etc.)
🔒 **Multi-repo manifest generation** — MCP integration pattern
🔒 **Gate execution orchestration** — Step-by-step flow with exit code handling
🔒 **Schema v1 internals** — Field semantics, validation rules, data model

## Competitive Advantage Preserved

By removing implementation details, we've protected:

1. **Novel algorithms** (defrag strategy, hybrid topological+defrag)
2. **Data structures** (merge levels, execution state persistence)
3. **Integration patterns** (MCP multi-repo manifest generation)
4. **Configuration systems** (profile resolution precedence)
5. **Orchestration logic** (gate execution flow, status management)

## What Remains Public

The site now communicates:

✅ **High-level capabilities** ("automated dependency resolution", "intelligent merge ordering")
✅ **User benefits** ("reduces conflicts", "accelerates delivery", "parallel execution")
✅ **Generic concepts** ("quality gates", "merge pyramid", "CI-first")
✅ **Example structure** (JSON config format without field semantics)

## Verification

Grep searches confirm:
- ❌ No "defrag" references
- ❌ No "Kahn's algorithm" implementation details
- ❌ No ".smartergpt.local" path specifics
- ❌ No MCP tool names (plan.create, gates.run, merge.apply)
- ❌ No in-degree computation or merge level structures
- ❌ No gate execution flow pseudocode
- ✅ Generic "topological sorting" mention (safe, standard CS term)

## Git History Status

**Old releases in `/srv/lex-serve/releases/`** still contain proprietary details in archived HTML files.

**Recommendation:** These are old deployment artifacts, not the live site. If you want to clean them:

```bash
# Option 1: Delete old releases (they're archived)
cd /srv/lex-serve
rm -rf releases/20251005-*

# Option 2: Keep releases but note they're pre-sanitization archives
# (no action needed if these aren't publicly accessible)
```

**Live site (`/srv/www/smartergpt/`)** is fully sanitized ✅

## Next Steps

1. ✅ **Site sanitization:** COMPLETE
2. ⚠️ **Git history scrubbing:** PENDING
   - If smartergpt repo has commits with proprietary content in commit messages/diffs
   - If repo will become public, recommend creating clean orphan branch
3. 📋 **Internal documentation:** Create private documentation of proprietary algorithms (NEVER commit to public repo)
4. 🔐 **Access control:** Ensure lex-pr-runner repository remains private until commercial release

## Protected Concepts Documentation

**IMPORTANT:** Create a **SEPARATE PRIVATE DOCUMENT** (NOT in public repo) that documents:

- Defrag algorithm implementation
- Merge level parallelization logic
- Profile resolution precedence chain
- MCP integration patterns and tool naming
- Gate orchestration state machine
- Execution state persistence format
- Schema versioning strategy

This document should live in:
- Private company wiki/Notion
- Encrypted local file
- Private GitHub repo (lex-pr-runner internals)

**NEVER** in the public smartergpt website repository.

---

**Conclusion:** Public site now communicates value and capabilities without revealing competitive implementation details. IP is protected while maintaining clear marketing messaging.
