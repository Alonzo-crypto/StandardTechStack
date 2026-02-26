# AI & LLM Development

## Effective standard

This document defines the **mandatory standard** for building AI/LLM features at FIBEX.

- **Compliance**: mandatory for new AI features and for any changes that affect routing, prompts, data access, or cost controls.
- **Exceptions**: require technical justification, risk assessment (security, privacy, reliability), and explicit approval by the architecture committee.
- **Quality (ISO/IEC 25010)**: security, reliability, and maintainability must be proven with evidence (tracing, budgets, evals, and incident response readiness).

This document outlines standards for building features with Large Language Models (LLMs), focusing on routing via OpenRouter and observability/evaluations with Langfuse.

## Scope

- Use OpenRouter as the default gateway to access multiple model providers (Anthropic, OpenAI, Google, etc.).
- Instrument all LLM calls with Langfuse for tracing, metrics, and evaluations.
- Keep secrets in environment variables; never commit keys.

## Provider routing via OpenRouter

- Base URL: `https://openrouter.ai/api/v1`
- Auth: `OPENROUTER_API_KEY` via environment variable
- Recommended headers: set `HTTP-Referer` (your domain) and `X-Title` (app/service name) when possible.
- Prefer deterministic, low‑latency models for production flows; gate high‑cost models behind feature flags.

Example (Node.js, OpenAI‑compatible client):

```ts
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'https://your-domain.com',
    'X-Title': 'YourAppName'
  }
});

export async function generateReply(prompt: string) {
  const res = await client.chat.completions.create({
    model: 'anthropic/claude-3.5-sonnet',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 400,
    temperature: 0.2
  });
  return res.choices[0]?.message?.content ?? '';
}
```

Operational guidance:

- Set timeouts and retries with exponential backoff; handle 429/5xx gracefully.
- Enforce guardrails: max input/output tokens, per‑request budget, and fail‑fast fallbacks.
- Log only non‑sensitive metadata; never log prompts/responses containing PII or secrets.

### Observability and evaluations with Langfuse

- Env vars: `LANGFUSE_PUBLIC_KEY`, `LANGFUSE_SECRET_KEY`, `LANGFUSE_HOST` (e.g., `https://cloud.langfuse.com`).
- Trace every LLM request; attach inputs, outputs, latencies, model name, and cost estimates.
- Record scores for quality/evals to support continuous improvement.

Example (Node.js):

```ts
import { Langfuse } from 'langfuse';

const langfuse = new Langfuse({
  baseUrl: process.env.LANGFUSE_HOST,
  publicKey: process.env.LANGFUSE_PUBLIC_KEY!,
  secretKey: process.env.LANGFUSE_SECRET_KEY!
});

export async function tracedGenerate({ userId, prompt }: { userId: string; prompt: string }) {
  const trace = langfuse.trace({ name: 'chat-completion', userId, input: { prompt }, tags: ['openrouter'] });
  const start = Date.now();
  try {
    const output = await generateReply(prompt);
    trace.update({ output: { completion: output }, metadata: { model: 'anthropic/claude-3.5-sonnet' }, duration: Date.now() - start });
    trace.score({ name: 'quality', value: 4.5 });
    return output;
  } catch (err) {
    trace.update({ level: 'error', metadata: { error: String(err) } });
    throw err;
  } finally {
    await trace.flushAsync();
  }
}
```

### Configuration

- Required env vars:
  - `OPENROUTER_API_KEY`
  - `LANGFUSE_PUBLIC_KEY`
  - `LANGFUSE_SECRET_KEY`
  - `LANGFUSE_HOST`
- Store env vars per environment (dev/stage/qa/prod). Do not hardcode keys.

### Security & privacy

- Do not log PII or secrets; redact sensitive content before tracing.
- Use allowlists on callbacks/webhooks and rotate keys regularly.
- Respect provider data retention settings; disable training/retention where supported.

## Model catalog, fallbacks, and cost control (mandatory)

Levels:

- **Standard**: internal automation, assistants, and moderate-impact flows.
- **TELCO Critical**: operational/regulatory impact, customer-facing flows with SLAs, or any process that may degrade service/network.

### Minimum catalog per use case

Each use case must define a **primary** model and at least one **fallback**. Selection must consider latency, cost, and quality, and must comply with per-environment budgets.

| Use case | Goal | Primary model (Standard) | Fallback (Standard) | TELCO Critical rules |
|---|---|---|---|---|
| Classification/routing | Determine intent, queue, tags | Fast and cost-efficient model (low latency) | Fast alternate model | Must be deterministic (low `temperature`), strict timeouts, immediate fallback |
| Structured extraction | Typed JSON, validation | Strong format-following model | Alternate format model | Validate against schema; if it fails, retry once and degrade to manual/queue workflow |
| Contextual Q&A (RAG) | Answer based on documents | Balanced cost/quality model | Fast model | Require citations/evidence; block answers without sources in critical flows |
| Writing/summarization | Summarize tickets, PRs, incidents | Cost-efficient model | Alternate cost-efficient model | PII prohibited; apply redaction before sending |
| Code generation | Developer assistance | High-quality model under guardrails | Alternate model | Must not execute actions; suggestions only; mandatory human review |

Operational notes:

- For **TELCO Critical**, escalating to high-cost models is forbidden without explicit approval and documented impact evidence.
- The concrete model list (exact OpenRouter IDs) is maintained in per-environment/project configuration; this standard requires the **existence** of primary/fallback and its justification.

### Budget limits and alerting

Each service must define budgets per environment and alert thresholds.

| Level | Per-request budget | Per-service daily budget | Alerts |
|---|---:|---:|---|
| Standard | Configured limit per use case (tokens) | Per environment (dev/stage/qa/prod) | 70% (warning), 90% (critical), 100% (block) |
| TELCO Critical | Stricter than Standard (tokens) | Stricter than Standard | 50% (warning), 75% (critical), 90% (block) |

### Timeouts, retries, and degradation

- Standard: per-request timeout and retries with exponential backoff; max 1 retry on 429/5xx.
- TELCO Critical: stricter timeout; max 1 retry; immediate fallback; degrade to an alternate workflow (e.g., predefined response or manual queue) on failures.

### Evaluations (evals) and acceptance

- Standard: record latency/cost metrics and one quality metric per flow.
- TELCO Critical: mandatory evals in staging; acceptance criteria defined (accuracy, hallucination rate, format compliance) and reviewed by QA.


