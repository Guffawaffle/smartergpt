# Site Update — 2025-11-07

Refreshed presentation of Lex (OSS) and lex-pr-runner ("LexRunner").

## Changes
- De-scrolled homepage: replaced verbose Lex, Research, Moat, How-To, Value Props, and How sections with a compact Highlights grid and externalized docs.

- Added docs subpages: `docs/research/index.html`, `docs/the-moat/index.html`, `docs/how-to-use/index.html`.

- Unified header across all pages (Lex, LexRunner, Research, Moat, Guide, Roadmap) for consistent navigation.
- Added active nav highlighting (CSS `.pill.active` + `aria-current="page"`) via shared `assets/app.js` script.
- Removed inconsistent legacy header variants (Home/Docs links) to reduce cognitive load and maintenance surface.
- Sanitized `projects/lex-pr/index.html`: removed concrete JSON schema examples and explicit field names; replaced with high-level conceptual overview and private disclaimer to reduce IP exposure.
- Sanitized `projects/lex-pr/index.html`: removed concrete JSON schema examples and explicit field names; replaced with high-level conceptual overview and private disclaimer to reduce IP exposure.
- Added explicit mailto Request Access CTA for LexRunner and lex-serve private services to avoid dead (404) private repo links.
- Added an Access Request form (`request-access.html`) that assembles a mailto with user-provided details. Linked from LexRunner page and added an Access link in the site header. Kept a fallback mailto.
- Fixed homepage "Research Paper" CTA to open the published PDF instead of a hidden anchor.


## Rationale

Align public messaging with current architecture: runner is private IP under active development; Lex remains open source. Clarify invariants (single input, determinism, two-track separation) to reduce ambiguity for prospective adopters.

- Consider trimming or relocating remaining hidden sections entirely (currently `display:none` for rollback ease).
- Add access request form for LexRunner (placeholder link currently implicit).
- Consider a visual diagram for Mind & Body section.
- Evaluate switching to root-relative URLs (e.g., `/projects/lex/index.html`) if hosting environment guarantees site root; current relative paths chosen for portability.
