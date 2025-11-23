# Licensing Strategy Update — December 2025

**Date:** December 13, 2025
**Files Updated:** `/srv/www/smartergpt/roadmap.html`

## Summary

Added a "Licensing & Commercial Availability" section to the roadmap page to clearly communicate the commercial strategy while the platform is in private pre-alpha development.

## Licensing Strategy

### Current State (Pre-Alpha)
- **Status:** Private repository under evaluation license
- **Rights:** All rights reserved, no production use, no redistribution
- **Purpose:** Refining core platform and establishing clean licensing before public release

### Planned Model (Public Preview)
**Dual-licensing approach:**

1. **PolyForm Small Business 1.0.0** (Free tier)
   - Free for individuals
   - Free for small organizations (revenue < $1M/year)
   - Scope: Full platform access, no feature restrictions

2. **Commercial License** (Paid tier)
   - Required for larger businesses (revenue ≥ $1M/year)
   - Tiered pricing based on organization size:
     - Startup <$10M ARR → $1,500/yr
     - Growth $10–50M ARR → $5,000/yr
     - Enterprise >$50M ARR → $12,000/yr
     - Indie-commercial (solo consultants) → $299/yr (optional)

### Buying Path (When Available)
- Stripe checkout → Signed PDF license + invoice
- No DRM, no license keys
- Standard commercial license terms for enterprise procurement

## Early Access Program

**Current offering:**
- Contact-based pilot partnerships
- Early access to commercial licensing
- Opportunity to influence product roadmap

**Contact:** [contact@smartergpt.dev](mailto:contact@smartergpt.dev?subject=lex-pr-runner%20Early%20Access)

## Rationale

This approach:

1. **Maintains control during development** — Private repo prevents surprises, all rights reserved
2. **Establishes clear commercial intent** — Visitors understand this is a commercial product
3. **Accessible to small teams** — Free tier ensures adoption by individuals and startups
4. **Scalable revenue model** — Tiered pricing captures value from larger organizations
5. **No infrastructure needed yet** — Can accept manual commercial inquiries before building Stripe integration
6. **Clean relicensing rights** — No external contributors yet, can change licenses freely

## Next Steps (Implementation)

1. **Before public preview:**
   - Add evaluation license to private repo
   - Create `NOTICE` and SPDX headers
   - Document third-party dependencies
   - Set up basic `COMMERCIAL-LICENSE.md` template

2. **At public preview:**
   - Switch root license to PolyForm Small Business 1.0.0
   - Add commercial license offering
   - Set up Stripe checkout flow
   - Add DCO + contributor licensing clause for external contributions

3. **Post-GA (optional):**
   - Consider "Pro plugin" package for advanced features
   - SLA/support tiers for commercial customers
   - Advanced orchestration/reporting UI as upsell

## Copy Added to Roadmap

**Section:** "Licensing & Commercial Availability"

**Key messaging:**
- Pre-alpha status with private repository
- Dual-licensing model planned for public preview
- Clear free tier threshold (revenue < $1M/year)
- Early access contact form
- Professional, transparent tone about commercial intent

**Design choices:**
- Blue accent border (brand color) to highlight commercial nature
- Nested boxes for planned model and early access
- Contact button for immediate action
- Positioned after "Future Considerations" and before final CTA

## Files Changed

- `/srv/www/smartergpt/roadmap.html` — Added licensing section
- `/srv/www/smartergpt/docs/roadmap-update-2025-12.md` — Updated with licensing changes
- `/srv/www/smartergpt/docs/licensing-strategy-2025-12.md` — This document

---

**Note:** No merchant infrastructure (Stripe, payment processing) is currently implemented. This is intentional — the roadmap establishes commercial intent and provides a contact path for early inquiries while the platform matures.
