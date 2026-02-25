# IA y Desarrollo con LLMs

Este documento define estándares para construir funcionalidades con Modelos de Lenguaje (LLMs), usando OpenRouter para el enrutamiento de proveedores y Langfuse para observabilidad y evaluaciones.

## Alcance

- Usar OpenRouter como gateway por defecto para acceder a múltiples proveedores (Anthropic, OpenAI, Google, etc.).
- Instrumentar todas las llamadas a LLM con Langfuse para trazabilidad, métricas y evals.
- Mantener secretos en variables de entorno; nunca subir claves al repositorio.

NOTA IMPORTANTE:
Cada proveedor debe considerar el modelo de IA más costo eficiente para cada tarea.

## Enrutamiento de proveedores con OpenRouter

- Base URL: `https://openrouter.ai/api/v1`
- Autenticación: `OPENROUTER_API_KEY` desde variable de entorno.
- Encabezados recomendados: `HTTP-Referer` (tu dominio) y `X-Title` (nombre de la app/servicio).
- Preferir modelos deterministas y de baja latencia para flujos productivos; proteger modelos de alto costo con flags.

Ejemplo (Node.js, cliente compatible con OpenAI):

```ts
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'https://tu-dominio.com',
    'X-Title': 'TuApp'
  }
});

export async function generarRespuesta(prompt: string) {
  const res = await client.chat.completions.create({
    model: 'anthropic/claude-3.5-sonnet',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 400,
    temperature: 0.2
  });
  return res.choices[0]?.message?.content ?? '';
}
```

Guía operativa:

- Configurar timeouts y reintentos con backoff exponencial; manejar 429/5xx sin fallar.
- Establecer guardrails: límites de tokens de entrada/salida, presupuesto por solicitud y fallbacks.
- Registrar solo metadatos no sensibles; no registrar prompts/respuestas con PII o secretos.

### Observabilidad y evaluaciones con Langfuse

- Variables: `LANGFUSE_PUBLIC_KEY`, `LANGFUSE_SECRET_KEY`, `LANGFUSE_HOST` (p. ej., `https://cloud.langfuse.com`).
- Trazar cada solicitud al LLM; adjuntar inputs, outputs, latencias, modelo y costos estimados.
- Registrar puntuaciones de calidad/evals para mejora continua.

Ejemplo (Node.js):

```ts
import { Langfuse } from 'langfuse';

const langfuse = new Langfuse({
  baseUrl: process.env.LANGFUSE_HOST,
  publicKey: process.env.LANGFUSE_PUBLIC_KEY!,
  secretKey: process.env.LANGFUSE_SECRET_KEY!
});

export async function generarTrazado({ userId, prompt }: { userId: string; prompt: string }) {
  const trace = langfuse.trace({ name: 'chat-completion', userId, input: { prompt }, tags: ['openrouter'] });
  const start = Date.now();
  try {
    const output = await generarRespuesta(prompt);
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

## Configuración

- Variables requeridas:
  - `OPENROUTER_API_KEY`
  - `LANGFUSE_PUBLIC_KEY`
  - `LANGFUSE_SECRET_KEY`
  - `LANGFUSE_HOST`
- Mantener variables por entorno (dev/stage/qa/prod). No hardcodear claves.

## Seguridad y privacidad

- No registrar PII o secretos; redactar contenido sensible antes de trazar.
- Usar allowlists en callbacks/webhooks y rotar claves regularmente.
- Respetar retención de datos del proveedor; desactivar entrenamiento/retención cuando aplique.

## TODO

- Finalizar lista de modelos aprobados y fallbacks por caso de uso.
- Definir topes de presupuesto y umbrales de alertas para gasto y errores.


