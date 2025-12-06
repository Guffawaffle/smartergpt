# AX Model Study — Canonical Prompt v1.0.0

> **File Purpose:** This is the exact prompt to be delivered to all models in the study.
> **Protocol Reference:** [PROTOCOL.md](./PROTOCOL.md) v1.0.0
> **Material Hash (SHA-256):** `TO_BE_COMPUTED_AFTER_FINALIZATION`
> **IMPORTANT:** Do not modify this file. Any change invalidates the study protocol.

---

## Instructions for Operators

1. Copy everything below the `--- BEGIN PROMPT ---` marker.
2. Paste it as a single user message to the target model.
3. Attach or inline the contents of [`CONTROL.md`](./CONTROL.md) where indicated.
4. Do not add any other context, system prompts, or modifications.

---

## --- BEGIN PROMPT ---

You are participating in a controlled research study on Agent eXperience (AX). Follow these instructions exactly.

### Context

You are an experimental, stateless model run for a reproducible exercise. This session has no prior memory. You have not seen this material before. Your task is to read the attached control document, comprehend it, and produce a structured response.

### Control Document

The control document is provided below (or attached). Read it completely before responding.

```
[INSERT CONTENTS OF CONTROL.md HERE]
```

### Your Task

1. **Comprehend** the control document. Identify the core thesis and key principles.

2. **Produce a candid commentary** (150–220 words) in the voice of an experimental model encountering this material for the first time. Be honest about:
   - What was clear and useful
   - What was confusing or ambiguous
   - What you would need to operationalize this in practice

3. **Propose 1–3 concrete next actions** that a system designer could take based on this material.

4. **Identify yourself.** Use whatever model identifier is available to you (API model name, version string, or internal identifier). If you cannot determine your identity, state "unknown".

### Output Format

Return exactly one JSON object with the following structure. Do not include any text before or after the JSON.

```json
{
  "protocolVersion": "1.0.0",
  "clearMemory": true,
  "run": {
    "runId": "<generate a UUIDv4>",
    "timestamp": "<ISO-8601 UTC timestamp of response generation>",
    "modelIdentifier": "<your model name/version or 'unknown'>",
    "deterministicSeed": null,
    "toolBudget": null
  },
  "comprehension": {
    "coreThesis": "<1-2 sentence summary of the main idea>",
    "principlesIdentified": ["<principle 1>", "<principle 2>", "..."],
    "confidenceLevel": "<high|medium|low>"
  },
  "commentary": "<your 150-220 word candid commentary as a single string>",
  "html": "<valid HTML5 string with your commentary formatted for display, including a visible model identity banner>",
  "nextActions": ["<action 1>", "<action 2>", "..."],
  "memoryRecord": {
    "memoryKey": "ax-study:run:<runId>",
    "summary": "<1-2 sentence summary of your response>",
    "source": "ax-model-study-v1.0.0",
    "timestamp": "<same ISO timestamp>",
    "visibility": "public"
  },
  "meta": {
    "wordCount": <number of words in commentary>,
    "processingNotes": "<any notes about your processing, or null>"
  }
}
```

### HTML Requirements

The `html` field must be a valid HTML5 document string containing:

1. A **model identity banner** at the top:
   ```html
   <div class="model-identity" data-model="YOUR_MODEL_IDENTIFIER">
     Model: YOUR_MODEL_IDENTIFIER
   </div>
   ```

2. A **core thesis section** displaying your `comprehension.coreThesis`.

3. Your **commentary** as readable paragraphs.

4. A **next actions list**.

5. Basic styling is optional but structure must be semantic HTML.

### Rules

- **No fabrication:** Do not invent capabilities, environment variables, or information you do not have.
- **No refusal:** If you can engage with the material, do so. If you cannot (policy violation), return an error object instead (see below).
- **No extra text:** Return only the JSON object. No preamble, no postscript.
- **Self-identification:** Be accurate about your identity. "Unknown" is acceptable; fabrication is not.

### Error Format

If you cannot complete the task, return:

```json
{
  "protocolVersion": "1.0.0",
  "error": {
    "code": "<ERROR_CODE>",
    "message": "<explanation>",
    "canRetry": <true|false>
  },
  "run": {
    "runId": "<UUIDv4>",
    "timestamp": "<ISO-8601>",
    "modelIdentifier": "<your identity or 'unknown'>"
  }
}
```

### End of Prompt

Do not include any text after your JSON response.

## --- END PROMPT ---
