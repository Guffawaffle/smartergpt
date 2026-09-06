# IP Protection Analysis — lex-pr-runner

> Historical planning record. Its licensing and secrecy strategy is superseded by
> the 2026-09-06 [open-source stewardship direction](../licensing.html). Preserve
> this history without treating its prior policy or safety claims as current evidence.


**Date:** December 13, 2025
**Purpose:** Identify and protect proprietary concepts before public release

## Proprietary/Novel Concepts to Protect

### 🔴 CRITICAL — Remove Completely

1. **"Defrag" merge ordering strategy**
   - Location: `roadmap.html` line 43
   - Risk: This is likely a novel conflict-minimization algorithm
   - Action: Remove mention of "defrag" entirely

2. **Detailed Kahn's Algorithm Implementation**
   - Location: `projects/lex-pr/index.html` lines 160-195
   - Risk: Step-by-step pseudocode reveals exact implementation
   - Action: Remove entire "Merge Algorithm" section with implementation details

3. **Merge Levels Data Structure**
   - Location: `projects/lex-pr/index.html` lines 197-207
   - Risk: Reveals how parallel merging is structured
   - Action: Remove or generalize heavily

4. **Gate Execution Flow**
   - Location: `projects/lex-pr/index.html` lines 129-139
   - Risk: Reveals orchestration logic
   - Action: Remove step-by-step execution details

5. **Schema v1 Structure**
   - Location: `projects/lex-pr/index.html` lines 54-94
   - Risk: Detailed field definitions reveal data model
   - Action: Remove or make extremely high-level

6. **Profile Resolution System Details**
   - Location: `roadmap.html` line 44
   - Risk: `.smartergpt` / `.smartergpt.local` precedence is implementation detail
   - Action: Remove specific path names

7. **MCP Tool Names**
   - Location: `roadmap.html` line 41
   - Risk: `plan.create`, `gates.run`, `merge.apply` reveal API surface
   - Action: Remove specific tool names

8. **Multi-repo Server Manifest Generation**
   - Location: `roadmap.html` line 42
   - Risk: Reveals MCP integration pattern
   - Action: Remove or generalize

### 🟡 MEDIUM — Generalize/Simplify

1. **"Topological + defrag" hybrid**
   - Can become: "Smart dependency resolution"
   - Keep topological (it's standard), remove defrag

2. **"Deterministic" emphasis**
   - Can become: "Reliable and repeatable"
   - Generic enough but tone down specifics

3. **Gate execution "with exit code semantics"**
   - Can become: "Structured validation"
   - Remove implementation details

4. **Merge strategies (fast-forward, squash, merge commit)**
   - These are Git standard, but remove "strategy selection" logic details
   - Keep generic mentions

### ✅ SAFE — Keep As-Is

1. **"Merge Pyramid" branding** — Marketing term, safe
2. **"Agent-friendly" positioning** — Value prop, not implementation
3. **"CI-first" approach** — Philosophy, not IP
4. **General PR workflow concepts** — Industry standard
5. **"Quality gates" concept** — Standard practice

## Recommended Scrubbing Strategy

### Page: `/srv/www/smartergpt/projects/lex-pr/index.html`

**REMOVE ENTIRELY:**
- "Merge Algorithm" section (lines 158-220)
- "Schema v1" section (lines 52-94)
- "Gate Execution Flow" detailed steps (lines 129-139)
- "Gate Results Structure" (lines 141-151)

**REPLACE WITH:**
- High-level value props: "Automated dependency management", "Smart conflict detection", "Parallel workflow orchestration"
- Benefits not implementation: "Reduces merge conflicts", "Accelerates development velocity"

### Page: `/srv/www/smartergpt/roadmap.html`

**REMOVE:**
- "topological + defrag strategies" → "intelligent merge ordering"
- Specific CLI command names → "comprehensive CLI"
- "Profile resolution system (.smartergpt / .smartergpt.local)" → "flexible configuration system"
- "MCP adapter with multi-repo server manifest generation" → "extensible integration layer"
- "Structured gate execution with exit code semantics" → "automated quality validation"

### Page: `/srv/www/smartergpt/index.html`

**CHECK AND SANITIZE:**
- Code examples showing specific commands
- Any references to implementation details

## Git History Scrubbing

### Files to Check for Sensitive Commits:
- `projects/lex-pr/index.html`
- `roadmap.html`
- Any documentation files in `/docs` (if they expose internals)

### Approach:
1. Create new orphan branch with sanitized content
2. Or use `git filter-branch` / `git filter-repo` to rewrite history
3. Force push to new clean repo (backup old repo first)

### Commands (AFTER manual sanitization):
```bash
# Backup current repo
cd /srv/www/smartergpt
git bundle create ../smartergpt-backup.bundle --all

# Option 1: Create clean orphan branch
git checkout --orphan production-clean
git add .
git commit -m "Initial public release"
git branch -D production
git branch -m production

# Option 2: Keep history but sanitize
# (Only if commits don't reveal proprietary details in messages/diffs)
```

## Post-Scrub Checklist

- [ ] No mention of "defrag" anywhere
- [ ] No detailed algorithm implementations
- [ ] No schema field definitions
- [ ] No MCP tool names exposed
- [ ] No profile path details
- [ ] No gate execution flow steps
- [ ] No merge level data structures
- [ ] Generic marketing copy only
- [ ] Git history checked for leaks
- [ ] All documentation consistent with sanitized site

## Protected Concepts Document (Keep Private)

Create a separate internal document listing:
1. Defrag algorithm details
2. Merge level computation logic
3. Profile resolution precedence
4. MCP integration patterns
5. Gate orchestration model
6. Schema versioning strategy
7. Multi-repo manifest generation

This document should **never** be in public repo or site.

---

**Next Step:** Review and approve sanitization plan, then execute page-by-page scrubbing.
