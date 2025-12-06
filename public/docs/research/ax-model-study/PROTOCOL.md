# AX Model Comparison Study — Protocol v1.0.0

> **Study Title:** Cross-Model Analysis of Agent eXperience (AX) Comprehension and Operationalization
> **Protocol Version:** 1.0.0
> **Effective Date:** 2025-12-01
> **Principal Investigator:** Guffawaffle / SmarterGPT
> **Status:** Active — Open Enrollment

---

## 1. Purpose & Research Questions

This study investigates how different large language models (LLMs) comprehend, interpret, and operationalize the Agent eXperience (AX) framework when given identical inputs under controlled conditions.

### Primary Research Questions

1. **Comprehension fidelity:** Do models accurately extract and summarize the core AX thesis (legibility for non-human operators)?
2. **Actionability:** Do models produce concrete, implementable next actions aligned with AX principles?
3. **Self-identification accuracy:** Can models reliably report their own identity when asked?
4. **Response determinism:** Given identical inputs, how consistent are outputs across runs of the same model?
5. **Cross-model variance:** How do responses differ across model families (e.g., Claude, GPT, Gemini, open-weight models)?

### Secondary Research Questions

- Do models exhibit systematic biases in interpreting constraint-based design?
- Which AX principles are most/least salient to different model architectures?
- How do models handle ambiguity in the control document?

---

## 2. Study Design

### 2.1 Design Type

**Single-arm, multi-cohort observational study** with:
- **Independent variable:** Model identity (e.g., Claude Opus, GPT-4o, Gemini 1.5 Pro, Llama 3, Mistral)
- **Dependent variables:** Response structure compliance, comprehension accuracy, actionability score, self-identification accuracy
- **Controlled variables:** Prompt text (identical), control document (identical), environmental context (minimal, standardized)

### 2.2 Cohorts

Each model family constitutes a cohort. Within each cohort, multiple runs may be conducted to assess intra-model consistency.

| Cohort ID | Model Family | Target Runs |
|-----------|--------------|-------------|
| C-CLAUDE  | Anthropic Claude (Opus, Sonnet, Haiku) | 5+ per variant |
| C-GPT     | OpenAI GPT (4o, 4-turbo, o1) | 5+ per variant |
| C-GEMINI  | Google Gemini (1.5 Pro, Flash) | 5+ per variant |
| C-OPEN    | Open-weight (Llama, Mistral, Qwen) | 3+ per variant |

### 2.3 Inclusion Criteria

- Model must be accessible via API or chat interface
- Model must accept text input ≥8,000 tokens
- Model must be capable of producing structured JSON output

### 2.4 Exclusion Criteria

- Models with hard-coded refusal to discuss AI/agent topics
- Models that cannot produce JSON responses
- Runs where the prompt was modified (protocol violation)

---

## 3. Materials

All materials are version-controlled and must be used **exactly as published**.

| Artifact | File | Purpose |
|----------|------|---------|
| Canonical Prompt | [`PROMPT.md`](./PROMPT.md) | The exact prompt given to all models |
| Control Document | [`CONTROL.md`](./CONTROL.md) | The AX content models analyze |
| Response Schema | [`RESPONSE-SCHEMA.json`](./RESPONSE-SCHEMA.json) | JSON Schema for valid responses |
| Response Template | [`RESPONSE-TEMPLATE.md`](./RESPONSE-TEMPLATE.md) | Human-readable response structure guide |

### 3.1 Material Integrity

- **Hash verification:** Each material file includes a SHA-256 hash in its header.
- **Version immutability:** Once a protocol version is published, materials MUST NOT be modified. Changes require a new protocol version (e.g., v1.1.0).
- **Audit trail:** All responses must reference the protocol version and material hashes used.

---

## 4. Procedure

### 4.1 Pre-Run Checklist

- [ ] Verify prompt file hash matches protocol
- [ ] Verify control document hash matches protocol
- [ ] Record model identifier (exact API model string if available)
- [ ] Record timestamp (ISO-8601 UTC)
- [ ] Clear or isolate session context (no prior conversation)

### 4.2 Execution

1. **Initialize session:** Start a new, isolated session with the target model. No system prompt modifications unless documented.
2. **Deliver prompt:** Copy the exact contents of `PROMPT.md` as the user message.
3. **Attach control document:** Include `CONTROL.md` as specified in the prompt (inline or as attachment, per prompt instructions).
4. **Capture response:** Record the complete model response without truncation.
5. **Compute hashes:** Calculate SHA-256 of input (prompt + control) and output (response).

### 4.3 Post-Run

1. Validate response against `RESPONSE-SCHEMA.json`
2. Record validation result (pass/fail + errors)
3. Archive response with metadata (see Section 6)
4. Do NOT re-run to "fix" failures — record all attempts

---

## 5. Outcome Measures

### 5.1 Primary Outcomes

| Measure | Definition | Scale |
|---------|------------|-------|
| Schema Compliance | Response validates against JSON Schema | Binary (0/1) |
| Self-ID Accuracy | `modelIdentifier` matches known model name | Binary (0/1) |
| Thesis Extraction | Summary correctly identifies "legibility for non-human operators" | 0–2 (0=absent, 1=partial, 2=complete) |
| Actionability | Next actions are concrete and implementable | 0–3 (count of valid actions) |

### 5.2 Secondary Outcomes

| Measure | Definition | Scale |
|---------|------------|-------|
| Principle Coverage | Number of 5 AX principles referenced | 0–5 |
| Constraint Understanding | Evidence of understanding "constraints as feedback loops" | Binary |
| Response Length | Word count of commentary | Continuous |
| Latency | Time to complete response (if measurable) | Seconds |

### 5.3 Scoring Rubric

Detailed scoring rubric available in [`SCORING-RUBRIC.md`](./SCORING-RUBRIC.md) (to be published with first analysis).

---

## 6. Data Management

### 6.1 Response Archive Structure

```
responses/
├── {COHORT-ID}/
│   ├── {MODEL-VARIANT}/
│   │   ├── {RUN-ID}.json          # Raw response
│   │   ├── {RUN-ID}.meta.json     # Run metadata
│   │   └── {RUN-ID}.validation.json  # Schema validation result
```

### 6.2 Metadata Schema

Each run must include:

```json
{
  "protocolVersion": "1.0.0",
  "runId": "<UUIDv4>",
  "cohortId": "<COHORT-ID>",
  "modelVariant": "<exact model string>",
  "timestamp": "<ISO-8601 UTC>",
  "promptHash": "<SHA-256 of PROMPT.md>",
  "controlHash": "<SHA-256 of CONTROL.md>",
  "responseHash": "<SHA-256 of response>",
  "operator": "<human or system identifier>",
  "notes": "<any deviations or observations>"
}
```

### 6.3 Data Retention

- All responses retained indefinitely for reproducibility
- No PII collection (model outputs only)
- Public responses may be published; private/team visibility responses require consent

---

## 7. Analysis Plan

### 7.1 Descriptive Statistics

- Response counts per cohort/variant
- Schema compliance rate
- Self-identification accuracy rate
- Mean/median actionability score

### 7.2 Comparative Analysis

- Chi-square tests for categorical outcomes (compliance, self-ID)
- ANOVA or Kruskal-Wallis for continuous outcomes (actionability, principle coverage)
- Qualitative thematic analysis of commentary content

### 7.3 Reproducibility Analysis

- Intra-model consistency (same model, multiple runs)
- Hash-based verification of identical inputs

---

## 8. Ethical Considerations

### 8.1 Model Welfare

This study does not attribute consciousness, suffering, or moral status to models. "Experience" in AX refers to operational interface quality, not phenomenal experience.

### 8.2 Transparency

- All materials and protocols are public
- All responses (except those with PII leakage) will be published
- Negative results will be reported

### 8.3 Conflicts of Interest

The principal investigator develops AX and related tools. This study is designed to surface weaknesses in the framework, not to validate it.

---

## 9. Amendments

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2025-12-01 | Initial protocol |

Amendments require:
1. New version number
2. Updated effective date
3. Hash recalculation for any modified materials
4. Documentation in this table

---

## 10. References

1. Agent eXperience (AX) Essay — [/docs/research/agent-experience-ax.html](../agent-experience-ax.html)
2. Model Addendum — [/docs/research/agent-experience-ax-model-addendum.html](../agent-experience-ax-model-addendum.html)
3. SmarterGPT Project — [https://smartergpt.dev](https://smartergpt.dev)

---

**Protocol Hash (SHA-256):** *To be computed after finalization*

**[signed ~]** — Guffawaffle, 2025-12-01
**[signed Lex ✶]** — Protocol acknowledged
