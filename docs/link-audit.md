# Link Audit Report

Date: 2025-10-06
Scope: All HTML/asset files under `/srv/www/smartergpt`.

| File | Line(s) | Before (URL) | After (URL or "removed") | Reason (broken/private/unauthorized) |
|---|---:|---|---|---|
| index.html | nav | Documentation for the merge automation tooling is available locally in the Merge Pyramid guide (private link removed)#readme | docs/merge-pyramid/index.html | broken/private placeholder |
| index.html | nav | Documentation for the merge automation tooling is available locally in the Merge Pyramid guide (private link removed) | projects/lex-pr/index.html | broken/private placeholder |
| index.html | hero cta | Demo instance access available on request (private link removed) | projects/lex-pr/index.html | broken/private placeholder |
| index.html | roadmap cta | Roadmap issues are tracked internally (private link removed) | roadmap.html | private placeholder |
| index.html | final cta | Documentation for the merge automation tooling is available locally in the Merge Pyramid guide (private link removed)#quick-start | docs/merge-pyramid/index.html | broken/private placeholder |
| index.html | final cta | Project collection overview below (private link removed) | projects/lex-pr/index.html | broken/private placeholder |
| roadmap.html | nav | Local quick start: See the Merge Pyramid overview below (private link removed)#readme | docs/merge-pyramid/index.html | broken/private placeholder |
| roadmap.html | nav | Local quick start: See the Merge Pyramid overview below (private link removed) | projects/lex-pr/index.html | broken/private placeholder |
| roadmap.html | quick start cta | Local quick start: See the Merge Pyramid overview below (private link removed)#quick-start | docs/merge-pyramid/index.html | broken/private placeholder |
| docs/merge-pyramid/index.html | nav | Documentation for the merge automation tooling is available locally in the Merge Pyramid guide (private link removed)#readme | index.html (self) | broken/private placeholder |
| docs/merge-pyramid/index.html | nav | Documentation for the merge automation tooling is available locally in the Merge Pyramid guide (private link removed) | ../../projects/lex-pr/index.html | broken/private placeholder |
| docs/merge-pyramid/index.html | cta | Documentation for the merge automation tooling is available locally in the Merge Pyramid guide (private link removed)#quick-start | ../../projects/lex-pr/index.html | broken/private placeholder |
| projects/lex-pr/index.html | nav | Local quick start section below (private link removed)#readme | ../../docs/merge-pyramid/index.html | broken/private placeholder |
| projects/lex-pr/index.html | nav | Local quick start section below (private link removed) | index.html (self) | broken/private placeholder |
| projects/lex-pr/index.html | cta | Local quick start section below (private link removed)#quick-start | #schema | broken/private placeholder |
| projects/lex-serve/index.html | nav | / (home root placeholder) | ../../index.html | consistency (prefer relative) |
| projects/lex-serve/index.html | nav | This project is private; contact maintainers for repository access (link removed) | ../lex-pr/index.html | private placeholder |
| projects/lex-serve/index.html | final cta | This project is private; contact maintainers for repository access (link removed) | (replaced with static span) | private placeholder |

All placeholder/private or unusable links have been replaced with internal, public-safe equivalents or converted to non-link text.

No external domains were added.
