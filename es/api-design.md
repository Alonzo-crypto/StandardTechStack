# Especificaciones de Diseño de API

Este documento describe los estándares para diseñar y construir APIs RESTful en FIBEX.

## Principios

- **Estilo**: Seguir los principios RESTful para todo el diseño de API.
- **Especificación**: Usar el estándar [OpenAPI 3.0 (Swagger)](https://swagger.io/specification/) para definir y documentar las APIs. Esto es obligatorio para todos los servicios nuevos.

## Convenciones de Nomenclatura

- **Endpoints**: Usar `kebab-case` y sustantivos en plural para los recursos (ej., `/user-profiles`, `/purchase-orders`).
- **Propiedades JSON**: Usar `camelCase` para todas las claves de objetos JSON en peticiones y respuestas (ej., `"userName": "john.doe"`).

## Versionado

Todas las APIs deben ser versionadas. El versionado debe incluirse en la ruta de la URL.
- Ejemplo: `/api/v1/users`
- Ejemplo: `/api/v2/users`

## Respuestas

- **Códigos de Estado**: Usar los códigos de estado HTTP estándar correctamente y de forma semántica (ej., `200 OK`, `201 Created`, `204 No Content`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `409 Conflict`, `422 Unprocessable Entity`, `429 Too Many Requests`, `500 Internal Server Error`).
- **Cuerpo de la Respuesta**: Todas las respuestas JSON deben usar un sobre (envelope) consistente.

### Códigos de estado: guía de uso

- `200 OK`: Lectura exitosa (`GET`), actualización con retorno de recurso (`PUT`/`PATCH`), acciones idempotentes.
- `201 Created`: Recurso creado vía `POST`. Incluir cabecera `Location: /api/v1/recurso/{id}` y devolver el recurso creado en el cuerpo.
- `202 Accepted`: Petición aceptada para procesamiento asíncrono. Incluir `Location` a un recurso de operación/estado y, opcionalmente, `Retry-After`.
- `204 No Content`: Sin cuerpo de respuesta. Útil en `DELETE` exitoso o `PUT`/`PATCH` cuando no se necesita devolver el recurso.
- `304 Not Modified`: Respuesta condicional con `ETag`/`If-None-Match` o `Last-Modified`/`If-Modified-Since`. No incluir cuerpo.
- `400 Bad Request`: Formato inválido, JSON malformado, campos requeridos ausentes, tipos erróneos. No usar para reglas de negocio.
- `401 Unauthorized`: Falta token o token inválido. Incluir `WWW-Authenticate` cuando corresponda.
- `403 Forbidden`: Autenticado pero sin permisos.
- `404 Not Found`: Recurso inexistente o no accesible.
- `405 Method Not Allowed`: Método no soportado para el recurso. Incluir cabecera `Allow` con métodos permitidos.
- `409 Conflict`: Conflicto de estado/negocio (duplicados, estados incompatibles) o conflicto de versión.
- `410 Gone`: Recurso removido permanentemente; opcional en APIs públicas.
- `412 Precondition Failed`: `If-Match`/ETag no coincide → evitar sobrescritura perdida.
- `413 Payload Too Large`: Tamaño de cuerpo excede límites permitidos.
- `415 Unsupported Media Type`: `Content-Type` no soportado (p. ej., no `application/json`).
- `422 Unprocessable Entity`: Validaciones de negocio fallidas (inputs bien formados pero inválidos según reglas).
- `429 Too Many Requests`: Límite de tasa excedido. Incluir `Retry-After` si aplica.
- `500 Internal Server Error`: Error no controlado del servidor.
- `502 Bad Gateway`: Error en dependencia (gateway/proxy hacia servicio externo).
- `503 Service Unavailable`: Dependencias caídas o mantenimiento; incluir `Retry-After` si es temporal.
- `504 Gateway Timeout`: Timeout al invocar dependencia.

Notas sobre condicionales y caching:

- Exponer `ETag` en respuestas `GET`. Soportar `If-None-Match` → devolver `304` cuando no hubo cambios.
- Para actualizaciones seguras, requerir `If-Match` con el `ETag` actual → devolver `412` si no coincide.
- Evitar `Cache-Control: no-store` salvo en respuestas sensibles; preferir `no-cache` con validación condicional.

### Envelope estándar

Todas las APIs deben responder con el siguiente envelope. `success` indica el resultado; `data` contiene el recurso o colección; `error` describe fallas; `meta` y `links` son opcionales y se usan principalmente para colecciones paginadas.

  **Éxito (recurso único):**
  ```json
  {
    "success": true,
    "data": {
      "userId": "123",
      "name": "John Doe"
    }
  }
  ```

  **Éxito (colección con paginación):**
  ```json
  {
    "success": true,
    "data": [
      { "userId": "121", "name": "Jane" },
      { "userId": "122", "name": "Juan" }
    ],
    "meta": {
      "page": 2,
      "pageSize": 20,
      "totalItems": 132,
      "totalPages": 7
    },
    "links": {
      "self": "/api/v1/users?page=2&pageSize=20",
      "first": "/api/v1/users?page=1&pageSize=20",
      "prev": "/api/v1/users?page=1&pageSize=20",
      "next": "/api/v1/users?page=3&pageSize=20",
      "last": "/api/v1/users?page=7&pageSize=20"
    }
  }
  ```

  **Error:**
  ```json
  {
    "success": false,
    "error": {
      "code": "INVALID_INPUT",
      "message": "La dirección de correo electrónico no es válida.",
      "details": [
        { "field": "email", "issue": "invalid_format" }
      ],
      "traceId": "b1b6f2c5-2c1c-4a34-9f6e-0b2a5c1a9cdd"
    }
  }
  ```

Notas:

- `traceId` debe propagarse desde el middleware de trazabilidad/observabilidad para facilitar el soporte.
- No incluir stack traces ni información sensible en `message` ni `details`.
- Cuando no haya contenido que devolver (p. ej., `DELETE` exitoso), usar `204 No Content` y no enviar cuerpo.

### Mapeo recomendado de códigos de estado

- `GET /recursos` → `200 OK`. Usar `ETag` y soportar `If-None-Match` → `304`.
- `GET /recursos/{id}` → `200 OK`; `404 Not Found` si no existe; `304 Not Modified` con condicionales.
- `POST /recursos` → `201 Created` con `Location: /api/v1/recursos/{id}` y cuerpo con el recurso.
- `POST /tareas` (proceso asíncrono) → `202 Accepted` con `Location: /api/v1/operations/{opId}`.
- `PUT /recursos/{id}` → `200 OK` (devuelve recurso) o `204 No Content`; `404 Not Found` si no existe; exigir `If-Match` para concurrencia → `412` si no coincide.
- `PATCH /recursos/{id}` → `200 OK` o `204 No Content`; `404 Not Found` si no existe.
- `DELETE /recursos/{id}` → `204 No Content` (idempotente, devolver `204` incluso si ya no existía).
- Validación de formato: `400 Bad Request`.
- Reglas de negocio: `422 Unprocessable Entity` con `error.details` por campo/regla.
- Autenticación/Autorización: `401 Unauthorized` (token ausente/inválido), `403 Forbidden` (sin permisos).
- Método no permitido: `405 Method Not Allowed` con cabecera `Allow`.
- Conflictos: `409 Conflict` (duplicados, estados incompatibles, versión).
- Límite de tasa: `429 Too Many Requests` con `Retry-After`.
- Errores del servidor: `500 Internal Server Error`; dependencias: `502/503/504`.

## Autenticación

- Proteger los endpoints usando JWT enviados en la cabecera `Authorization`.
- El token debe tener el prefijo `Bearer`.
- Ejemplo: `Authorization: Bearer <your-jwt-token>`
- No enviar tokens en la URL ni en cookies públicas. Preferir encabezados y cookies seguras `HttpOnly` cuando aplique.
- Para peticiones `POST`, enviar parámetros en el cuerpo y no en la query string.

### JWT: firma, cifrado y gestión de claves

- Algoritmos de firma: preferir asimétricos (`RS256` con RSA‑2048+ o `EdDSA`/`Ed25519`). Evitar `HS256` compartido entre servicios.
- Almacenamiento de claves privadas: gestionar en KMS/HSM (p. ej., AWS KMS, GCP KMS, Azure Key Vault o HashiCorp Vault). Nunca guardar claves en repositorios ni texto plano.
- Publicación de claves: exponer `JWKS` (`/.well-known/jwks.json`) desde el servicio de autenticación. Incluir `kid` en el encabezado del JWT para seleccionar la clave.
- Rotación de claves:
  - Mantener al menos dos claves durante el rollover (nueva para firmar, anterior para verificar).
  - Pasos: generar clave → publicar en JWKS → empezar a firmar con la nueva → mantener la anterior hasta `accessTokenTTL + skew` → retirar la anterior.
  - Documentar ciclo de rotación (p. ej., cada 90 días) y registrar `kid` activo por entorno.
- Cifrado de tokens (JWE): por defecto solo firmar (JWS). Usar cifrado solo si el payload requiere confidencialidad; preferir `RSA-OAEP` + `A256GCM` o `ECDH-ES` + `A256GCM`.
- Validaciones obligatorias en verificación: `iss`, `aud`, `exp`, `iat`, `nbf` (si se usa), `kid` existente en JWKS y algoritmo permitido. Rechazar `alg=none`.
- Límite de tiempo: `accessToken` 5–15 min; `refreshToken` 7–30 días. Permitir skew de reloj ±60 s.
- Claims mínimos:
  - Requeridos: `iss`, `aud`, `sub`, `exp`, `iat`, `jti`.
  - Recomendados: `scope`/`permissions`, `tenantId` en multi‑tenant.
  - Evitar PII en el token; limitar tamaño del payload.

### Autenticación centralizada (externa e interna)

- Emisor único por entorno: un servicio de autenticación central firma todos los JWT. Las apps verifican contra el JWKS; no firman tokens por su cuenta.
- "Una clave todas las apps": implementar como un conjunto de claves del emisor central por entorno, no como un secreto simétrico compartido entre servicios.
- Externa (usuarios):
  - Usar OIDC/OAuth 2.1 con Authorization Code + PKCE para clientes públicos.
  - Proteger contra CSRF/Replay con `state` y `nonce`.
  - Mapear identidad externa a usuario interno; persistir `provider`, `providerUserId` y momento de último login.
- Interna (servicio a servicio):
  - Preferir mTLS y/o Client Credentials para obtener JWT emitidos por el emisor central.
  - Tokens con `aud` específico del servicio destino y `scope` mínimo necesario.
  - Prohibido compartir secretos entre servicios; cada servicio confía en el emisor y verifica por JWKS.

### Revocación y cierre de sesión

- Acceso: revocación indirecta mediante TTL corto.
- Refresh tokens: rotación por uso; almacenar `jti`/hash en base segura, invalidar en logout y compromiso. Mantener deny‑list temporal en caché (p. ej., Redis) por `exp` restante.
- Para revocación inmediata de alto riesgo, opcionalmente consultar una lista de `jti` bloqueados en endpoints críticos.

## Paginación

- Parámetros estándar: `page` (≥ 1) y `pageSize` (1–100). Valor por defecto: `page=1`, `pageSize=20`.
- La respuesta debe incluir `meta.page`, `meta.pageSize`, `meta.totalItems`, `meta.totalPages` y, cuando sea útil, `links.first|prev|next|last`.
- Cabeceras opcionales: `X-Total-Count` con el número total de elementos (debe coincidir con `meta.totalItems`).
- Ordenamiento: parámetro `sort` (ej., `sort=-createdAt,name`).
- Filtrado: parámetros simples por campo (ej., `status=active`) o `filter[field]=value` para evitar colisiones.

## Seguridad

- Usar exclusivamente `HTTPS` (TLS 1.2+). Habilitar HSTS.
- Establecer `Content-Type: application/json; charset=utf-8` y validar `Accept`.
- No exponer datos sensibles en respuestas (p. ej., contraseñas, tokens, secretos, PII). Enmascarar u omitir.
- Mensajes de error genéricos hacia el cliente; incluir `traceId` para diagnóstico interno.
- Implementar rate limiting y devolver `429 Too Many Requests` con `Retry-After`.
- Configurar CORS con orígenes mínimos necesarios; denegar por defecto.
- Validar y sanear entradas; limitar tamaños de payload; rechazar JSON malformado (`400`).
- Registrar de forma segura y legible (sin datos sensibles ni JSON crudo innecesario).

## Cifrado y manejo de datos sensibles

- Transporte: todo el tráfico debe estar cifrado con TLS 1.2+.
- En reposo: cifrar datos sensibles (p. ej., credenciales, tokens de refresco, PII) con rotación de llaves.
- JWT: por defecto se FIRMAN (JWS). Sólo cifrar (JWE) cuando la confidencialidad del payload sea requisito. Nunca incluir secretos en el payload.
- Evitar exponer identificadores internos predecibles; considerar UUIDs.