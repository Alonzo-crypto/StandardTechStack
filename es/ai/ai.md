# IA y Desarrollo con LLMs

Este documento define estándares para construir funcionalidades con Modelos de Lenguaje (LLMs), usando OpenRouter para el enrutamiento de proveedores y Langfuse para observabilidad y evaluaciones.

## Estándar vigente

Este documento define el **estándar obligatorio** para construir funcionalidades con LLMs en Fibex Telecom.

- **Cumplimiento**: obligatorio para cualquier integración de LLM en productos o procesos internos.
- **Excepciones**: requieren justificación técnica, evaluación de riesgo (seguridad/privacidad/costo) y aprobación explícita del comité de arquitectura.
- **Calidad (ISO/IEC 25010)**: toda implementación debe ser observable, evaluable y operable (tolerancia a fallos, control de costos, métricas y trazabilidad).

## Alcance

- Usar OpenRouter como gateway por defecto para acceder a múltiples proveedores (Anthropic, OpenAI, Google, etc.).
- Instrumentar todas las llamadas a LLM con Langfuse para trazabilidad, métricas y evals.
- Mantener secretos en variables de entorno; nunca subir claves al repositorio.

NOTA IMPORTANTE:
Cada proveedor debe considerar el modelo de IA más costo eficiente para cada tarea.

Este criterio es obligatorio: toda selección de modelo debe justificarse en términos de costo/latencia/calidad y debe respetar los topes de presupuesto definidos por entorno.

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

## Catálogo de modelos, fallbacks y control de costos (obligatorio)

Niveles:

- **Estándar**: automatizaciones internas, asistentes y flujos con impacto moderado.
- **TELCO Crítico**: flujos con impacto operacional/regulatorio, atención a clientes con SLAs, o cualquier proceso que pueda degradar servicio/red.

### Catálogo mínimo por caso de uso

Cada caso de uso debe definir un modelo **primario** y al menos un **fallback**. La selección debe considerar latencia, costo y calidad, y debe ser compatible con los límites de presupuesto por entorno.

| Caso de uso | Objetivo | Modelo primario (Estándar) | Fallback (Estándar) | Reglas TELCO Crítico |
|---|---|---|---|---|
| Clasificación/enrutamiento | Determinar intención, cola, tags | Modelo rápido y económico (baja latencia) | Modelo rápido alterno | Debe ser determinista (`temperature` baja), con timeouts estrictos y fallback inmediato |
| Extracción estructurada | JSON tipado, validación | Modelo con buena obediencia a formato | Modelo alterno de formato | Validar contra esquema; si falla, reintentar 1 vez y degradar a flujo manual/colas |
| Q&A con contexto (RAG) | Responder con base en documentos | Modelo equilibrado costo/calidad | Modelo rápido | Requerir citas/evidencia; bloquear respuestas sin fuentes en flujos críticos |
| Redacción/resumen | Resumir tickets, PRs, incidencias | Modelo económico | Modelo económico alterno | Prohibido incluir PII; aplicar redacción antes del envío |
| Generación de código | Asistencia al dev | Modelo de alta calidad bajo guardrails | Modelo alterno | No ejecutar acciones; sólo sugerir; revisión humana obligatoria |

Notas operativas:

- En `TELCO Crítico` se prohíbe elevar a modelos de alto costo sin aprobación explícita y sin evidencia de impacto.
- La lista concreta de modelos (IDs exactos en OpenRouter) se mantiene en configuración por entorno/proyecto; el estándar exige **existencia** de primario/fallback y su justificación.

### Límites de presupuesto y alertas

Cada servicio debe definir presupuesto por entorno y umbrales de alertas.

| Nivel | Presupuesto por solicitud | Presupuesto diario por servicio | Alertas |
|---|---:|---:|---|
| Estándar | Límite configurado por caso de uso (tokens) | Límite por entorno (dev/stage/qa/prod) | 70% (warning), 90% (critical), 100% (bloqueo) |
| TELCO Crítico | Más estricto que Estándar (tokens) | Más estricto que Estándar | 50% (warning), 75% (critical), 90% (bloqueo) |

### Timeouts, reintentos y degradación

- Estándar: timeout por solicitud y reintentos con backoff exponencial; máximo 1 reintento ante 429/5xx.
- TELCO Crítico: timeout más estricto; máximo 1 reintento; fallback inmediato; degradación a flujo alterno (p. ej., respuesta predefinida o cola manual) ante fallos.

### Evaluaciones (evals) y aceptación

- Estándar: registrar métricas de latencia/costo y una métrica de calidad por flujo.
- TELCO Crítico: evals obligatorias en staging; criterios de aceptación definidos (precisión, tasa de alucinación, cumplimiento de formato) y revisados por QA.
