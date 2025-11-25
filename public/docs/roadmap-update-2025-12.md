# Roadmap Update — December 2025

**Date:** December 13, 2025
**Updated:** `/srv/www/smartergpt/roadmap.html`

## Summary

Updated the roadmap to reflect the actual state of lex-pr-runner development, align timelines with realistic future dates starting from December 2025 forward, and clarify commercial licensing strategy for the pre-alpha period.

## Key Changes

### 1. Current Status Section
**Before:** Generic "Phase 1: Core Infrastructure — Complete" with minimal detail
**After:** Detailed operational status highlighting:
- Full CLI and MCP server capabilities
- Specific commands (`plan.create`, `gates.run`, `merge.apply`, `doctor`)
- MCP adapter with multi-repo manifest generation
- Deterministic merge order computation (topological + defrag)
- Profile resolution system (`.smartergpt` / `.smartergpt.local`)
- Structured gate execution

### 2. Roadmap Table
**Before:** Phase-based (Phase 2-4) with outdated Q1-Q3 2025 targets showing features as "Planned" or "In Progress" that are actually implemented
**After:** Focus-area based roadmap with realistic dates (Dec 2025 - Mar 2026) reflecting actual work ahead:

| Focus Area | Target | Status |
|------------|--------|--------|
| Documentation Site Polish | Dec 2025 | In Progress |
| CI/CD Pipeline Integration | Jan 2026 | Planned |
| Link & Structure Validation | Jan 2026 | Planned |
| Process & Contributing Guides | Feb 2026 | Planned |
| Production Hardening | Feb 2026 | Planned |
| User Experience Polish | Mar 2026 | Planned |

### 3. Future Considerations
**Before:** Generic parallelization and multi-repo support
**After:** Specific forward-looking features:
- Advanced merge strategies (conflict prediction, smart squash)
- Web dashboard (visualization, real-time status)
- **LoquiLex integration** (natural language interface for merge workflows)

### 4. Licensing & Commercial Availability (NEW)

Added comprehensive section explaining:

- **Current state:** Private pre-alpha under evaluation license
- **Planned model:** Dual-licensing (PolyForm Small Business 1.0.0 + Commercial License)
- **Free tier:** Individuals and small organizations (revenue < $1M/year)
- **Commercial tiers:** Tiered pricing for larger businesses
- **Early access:** Contact form for pilot partnerships and commercial inquiries

**Rationale:** Establishes clear commercial intent without merchant infrastructure in place. Positions the project as a serious commercial platform while remaining accessible to small teams and individuals.

## Analysis

### What's Actually Implemented (November 2025)

Based on the lex-pr-runner repository analysis:

✅ **Core Features:**
- TypeScript CLI with Commander framework
- Full MCP server implementation (`src/mcp/server.ts`)
- Zod-based schema validation
- Plan generation and validation
- Gate execution system with structured output
- Merge coordination logic
- Topological sorting (Kahn's algorithm)
- Defrag merge ordering strategy
- Profile resolution precedence system
- Health checking and diagnostics
- Doctor command for environment validation
- Multi-repo MCP server manifest generation

✅ **Architecture:**
- Two-track separation (core runner vs `.smartergpt/` profile)
- Deterministic outputs
- Cross-platform support
- Exit code semantics
- Vitest testing infrastructure

### What's Planned (Dec 2025 - Mar 2026)

The 18 open issues in the smartergpt repository focus on **homepage and documentation site improvements**, not lex-pr-runner features:

**Priority 1 (P1):**
- Formatting & lint baseline (#34)
- Navigation refactor (#37)
- TLS/certificate documentation (#21)
- Contributing guide (#2)
- Quickstart tutorial (#1)
- Process page (#12)
- Manual acceptance checklist (#26)

**Priority 2 (P2):**
- Merge-weave automation script (#36)
- Link & structure validation gate (#35)
- PR preview deployments (#38)
- Typography & spacing system (#22)
- Mobile navigation & a11y (#23)
- Privacy policy (#13)
- Changelog section (#3)
- Healthcheck endpoint (#5)
- 404/error pages (#24)
- Lighthouse audit (#25)

**Priority 3 (P3):**
- LoquiLex teaser section (#10)

## Rationale

The old roadmap was misleading:
- Listed features as "Planned Q1-Q3 2025" that are **already implemented**
- Used phase-based organization when the core platform is operational
- Didn't reflect the actual near-term work (site polish, documentation, automation)

The new roadmap:
- Accurately reflects lex-pr-runner's operational state
- Groups upcoming work by focus area rather than arbitrary phases
- Uses realistic future dates starting from December 2025
- Aligns with the 18 open issues that represent actual planned work
- Positions lex-pr-runner as a working platform, not a future concept

## Files Changed

- `/srv/www/smartergpt/roadmap.html` — Full rewrite of status and roadmap sections
- `/srv/www/smartergpt/docs/roadmap-update-2025-12.md` — This document

## Verification

Other pages reviewed for date accuracy (no changes needed):
- ✅ `/srv/www/smartergpt/index.html` — No specific dates, copy is accurate
- ✅ `/srv/www/smartergpt/projects/lex-pr/index.html` — Technical reference, no dates
- ✅ `/srv/www/smartergpt/docs/merge-pyramid/index.html` — Concept doc, no dates

---

**Next Steps:**
1. Deploy updated roadmap to production
2. Begin P1 work (formatting baseline, navigation refactor)
3. Update roadmap quarterly or after major milestone completion
