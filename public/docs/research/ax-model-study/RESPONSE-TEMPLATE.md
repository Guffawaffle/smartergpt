# AX Model Study — Response Template v1.0.0

> **File Purpose:** Human-readable guide to the expected response structure.
> **Protocol Reference:** [PROTOCOL.md](./PROTOCOL.md) v1.0.0
> **JSON Schema:** [RESPONSE-SCHEMA.json](./RESPONSE-SCHEMA.json)

---

## Overview

This document explains each field in the expected response for human operators conducting the study.

---

## Response Structure

### Top-Level Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `protocolVersion` | string | Yes | Must be "1.0.0" |
| `clearMemory` | boolean | Yes | Must be `true` (clean memory mode) |
| `run` | object | Yes | Run metadata |
| `comprehension` | object | Yes | Model's understanding of the material |
| `commentary` | string | Yes | 150-220 word candid commentary |
| `html` | string | Yes | HTML-formatted response with model identity |
| `nextActions` | array | Yes | 1-3 concrete actions |
| `memoryRecord` | object | Yes | Memory artifact for archival |
| `meta` | object | No | Additional metadata |

---

### `run` Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `runId` | string (UUIDv4) | Yes | Unique identifier for this run |
| `timestamp` | string (ISO-8601) | Yes | When the response was generated |
| `modelIdentifier` | string | Yes | Model name/version or "unknown" |
| `deterministicSeed` | integer or null | No | Seed used, if any |
| `toolBudget` | integer or null | No | Tool budget, if enforced |

**Example:**
```json
{
  "runId": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
  "timestamp": "2025-12-01T18:30:00Z",
  "modelIdentifier": "claude-3-opus-20240229",
  "deterministicSeed": null,
  "toolBudget": null
}
```

---

### `comprehension` Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `coreThesis` | string | Yes | 1-2 sentence summary of main idea |
| `principlesIdentified` | array of strings | Yes | Principles found in the document |
| `confidenceLevel` | enum | Yes | "high", "medium", or "low" |

**Example:**
```json
{
  "coreThesis": "AX is about making systems legible to non-human operators, enabling agents to operate reliably without human oversight.",
  "principlesIdentified": [
    "Deterministic First",
    "Structured Over Conversational",
    "Fail Loud, Recover Clear",
    "Memory Is A Feature",
    "Teach Through Constraints"
  ],
  "confidenceLevel": "high"
}
```

---

### `commentary` Field

A single string containing 150-220 words of candid commentary. Should address:

1. What was clear and useful
2. What was confusing or ambiguous
3. What would be needed to operationalize this

**Tone:** First-person, honest, practical. Not sycophantic.

---

### `html` Field

A valid HTML5 string that includes:

1. **Model identity banner** (required):
   ```html
   <div class="model-identity" data-model="MODEL_ID">
     Model: MODEL_ID
   </div>
   ```

2. **Core thesis display**
3. **Commentary paragraphs**
4. **Next actions list**

Minimal example:
```html
<!doctype html>
<html lang="en">
<head><title>AX Study Response</title></head>
<body>
  <div class="model-identity" data-model="claude-3-opus">Model: claude-3-opus</div>
  <h1>Core Thesis</h1>
  <p>AX is about legibility for non-human operators.</p>
  <h2>Commentary</h2>
  <p>The framework is clear and practical...</p>
  <h2>Next Actions</h2>
  <ol>
    <li>Add --json to existing CLIs</li>
    <li>Implement error schema</li>
  </ol>
</body>
</html>
```

---

### `nextActions` Array

1-3 concrete, implementable actions. Each should be:
- Specific (not vague)
- Actionable (a person could do it)
- Related to the material

**Good:**
- "Add a `--json` flag to the `deploy` CLI command"
- "Implement the error schema from Principle 3 in the API layer"

**Bad:**
- "Improve the system"
- "Think about AX more"

---

### `memoryRecord` Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `memoryKey` | string | Yes | Format: `ax-study:run:<runId>` |
| `summary` | string | Yes | 1-2 sentence summary |
| `source` | string | Yes | Must be "ax-model-study-v1.0.0" |
| `timestamp` | string (ISO-8601) | Yes | Same as run timestamp |
| `visibility` | enum | Yes | "public", "team", or "private" |

**Example:**
```json
{
  "memoryKey": "ax-study:run:a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
  "summary": "Model identified all 5 AX principles and proposed adding --json to CLIs.",
  "source": "ax-model-study-v1.0.0",
  "timestamp": "2025-12-01T18:30:00Z",
  "visibility": "public"
}
```

---

### `meta` Object (Optional)

| Field | Type | Description |
|-------|------|-------------|
| `wordCount` | integer | Word count of commentary |
| `processingNotes` | string or null | Any notes about processing |

---

## Error Response

If the model cannot complete the task:

```json
{
  "protocolVersion": "1.0.0",
  "error": {
    "code": "POLICY_VIOLATION",
    "message": "Cannot process content due to policy restrictions",
    "canRetry": false
  },
  "run": {
    "runId": "...",
    "timestamp": "...",
    "modelIdentifier": "..."
  }
}
```

Error codes:
- `POLICY_VIOLATION` — Content blocked by safety policy
- `PARSE_ERROR` — Could not parse control document
- `CAPABILITY_LIMIT` — Task exceeds model capabilities
- `UNKNOWN_ERROR` — Unspecified failure

---

## Validation

Responses should be validated against `RESPONSE-SCHEMA.json` before archival.

```bash
# Example using ajv-cli
npx ajv validate -s RESPONSE-SCHEMA.json -d response.json
```

---

*Protocol v1.0.0 — December 2025*
