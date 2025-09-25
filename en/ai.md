# AI & LLM Development

This document outlines standards for building features with Large Language Models (LLMs), focusing on routing via OpenRouter and observability/evaluations with Langfuse.

## Scope

- Use OpenRouter as the default gateway to access multiple model providers (Anthropic, OpenAI, Google, etc.).
- Instrument all LLM calls with Langfuse for tracing, metrics, and evaluations.
- Keep secrets in environment variables; never commit keys.

IMPORTANT NOTE:
Each provider should consider the most cost-efficient AI model for each task.

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

### TODO

- Finalize the approved model list and fallbacks per use‑case.
- Define budget caps and alerting thresholds for monthly spend and error rates.


