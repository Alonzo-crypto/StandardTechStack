# API Design Specifications

This document outlines the standards for designing and building RESTful APIs at FIBEX.

## Principles
- **Style**: Follow RESTful principles for all API design.
- **Specification**: Use the [OpenAPI 3.0 (Swagger)](https://swagger.io/specification/) standard to define and document APIs. This is mandatory for all new services.

## Naming Conventions
- **Endpoints**: Use `kebab-case` and plural nouns for resources (e.g., `/user-profiles`, `/purchase-orders`).
- **JSON Properties**: Use `camelCase` for all JSON object keys in requests and responses (e.g., `"userName": "john.doe"`).

## Versioning
All APIs must be versioned. Versioning should be included in the URL path.
- Example: `/api/v1/users`
- Example: `/api/v2/users`

## Responses

- **Status Codes**: Use standard HTTP status codes correctly (e.g., `200 OK`, `201 Created`, `204 No Content`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `409 Conflict`, `422 Unprocessable Entity`, `429 Too Many Requests`, `500 Internal Server Error`).
- **Response Body**: JSON responses should have a consistent structure.

### Status codes: usage guide

- `200 OK`: Successful read (`GET`), update returning resource (`PUT`/`PATCH`), idempotent actions.
- `201 Created`: Resource created via `POST`. Include `Location: /api/v1/resource/{id}` and return the created resource in the body.
- `202 Accepted`: Request accepted for async processing. Include `Location` to an operation/status resource and, optionally, `Retry-After`.
- `204 No Content`: No response body. Useful for successful `DELETE` or `PUT`/`PATCH` when no resource needs to be returned.
- `304 Not Modified`: Conditional response with `ETag`/`If-None-Match` or `Last-Modified`/`If-Modified-Since`. No body.
- `400 Bad Request`: Invalid format, malformed JSON, missing required fields, wrong types. Do not use for business rules.
- `401 Unauthorized`: Missing or invalid token. Include `WWW-Authenticate` when applicable.
- `403 Forbidden`: Authenticated but lacks permissions.
- `404 Not Found`: Resource does not exist or is not accessible.
- `405 Method Not Allowed`: Method not supported for the resource. Include `Allow` header with permitted methods.
- `409 Conflict`: State/business conflict (duplicates, incompatible states) or version conflict.
- `410 Gone`: Resource permanently removed; optional for public APIs.
- `412 Precondition Failed`: `If-Match`/ETag mismatch → prevents lost updates.
- `413 Payload Too Large`: Request body exceeds allowed size.
- `415 Unsupported Media Type`: Unsupported `Content-Type` (e.g., not `application/json`).
- `422 Unprocessable Entity`: Business validations failed (well-formed inputs but invalid per rules).
- `429 Too Many Requests`: Rate limit exceeded. Include `Retry-After` if applicable.
- `500 Internal Server Error`: Unhandled server error.
- `502 Bad Gateway`: Upstream dependency error.
- `503 Service Unavailable`: Dependencies down or maintenance; include `Retry-After` if temporary.
- `504 Gateway Timeout`: Timeout invoking an upstream dependency.

Notes on conditionals and caching:

- Expose `ETag` in `GET` responses. Support `If-None-Match` → return `304` when unchanged.
- For safe updates, require `If-Match` with current `ETag` → return `412` if it does not match.
- Avoid `Cache-Control: no-store` except for sensitive responses; prefer `no-cache` with conditional validation.

### Standard envelope

All APIs should respond with the following envelope. `success` indicates the result; `data` contains the resource or collection; `error` describes failures; `meta` and `links` are optional and mainly used for paginated collections.

  **Success (single resource):**
  ```json
  {
    "success": true,
    "data": {
      "userId": "123",
      "name": "John Doe"
    }
  }
  ```

  **Success (collection with pagination):**
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
      "message": "The email address is not valid.",
      "details": [
        { "field": "email", "issue": "invalid_format" }
      ],
      "traceId": "b1b6f2c5-2c1c-4a34-9f6e-0b2a5c1a9cdd"
    }
  }
  ```

Notes:

- `traceId` should be propagated from tracing/observability middleware to ease support.
- Do not include stack traces or sensitive information in `message` or `details`.
- When there is no content to return (e.g., successful `DELETE`), use `204 No Content` and do not send a body.

### Recommended status mapping

- `GET /resources` → `200 OK`. Use `ETag` and support `If-None-Match` → `304`.
- `GET /resources/{id}` → `200 OK`; `404 Not Found` if it does not exist; `304 Not Modified` with conditionals.
- `POST /resources` → `201 Created` with `Location: /api/v1/resources/{id}` and body containing the resource.
- `POST /jobs` (async process) → `202 Accepted` with `Location: /api/v1/operations/{opId}`.
- `PUT /resources/{id}` → `200 OK` (returns resource) or `204 No Content`; `404 Not Found` if missing; require `If-Match` for concurrency → `412` if mismatch.
- `PATCH /resources/{id}` → `200 OK` or `204 No Content`; `404 Not Found` if missing.
- `DELETE /resources/{id}` → `204 No Content` (idempotent; return `204` even if it no longer existed).
- Format validation: `400 Bad Request`.
- Business rules: `422 Unprocessable Entity` with `error.details` per field/rule.
- AuthN/AuthZ: `401 Unauthorized` (missing/invalid token), `403 Forbidden` (no permissions).
- Method not allowed: `405 Method Not Allowed` with `Allow` header.
- Conflicts: `409 Conflict` (duplicates, incompatible states, versioning).
- Rate limit: `429 Too Many Requests` with `Retry-After`.
- Server errors: `500 Internal Server Error`; dependencies: `502/503/504`.

## Authentication

- Secure endpoints using JWTs sent in the `Authorization` header.
- The token should be prefixed with `Bearer`.
- Example: `Authorization: Bearer <your-jwt-token>`
- Do not send tokens in URLs or public cookies. Prefer headers and secure `HttpOnly` cookies where applicable.
- For `POST` requests, send parameters in the body, not in the query string.

### JWT: signing, encryption, and key management

- Signing algorithms: prefer asymmetric (`RS256` with RSA‑2048+ or `EdDSA`/`Ed25519`). Avoid `HS256` shared across services.
- Private key storage: manage in KMS/HSM (e.g., AWS KMS, GCP KMS, Azure Key Vault, HashiCorp Vault). Never store keys in repos or plaintext.
- Key publication: expose `JWKS` (`/.well-known/jwks.json`) from the auth service. Include `kid` in the JWT header to select the key.
- Key rotation:
  - Keep at least two keys during rollover (new for signing, previous for verification).
  - Steps: generate key → publish in JWKS → start signing with the new key → keep the previous key until `accessTokenTTL + skew` → retire the old key.
  - Document rotation cadence (e.g., every 90 days) and record active `kid` per environment.
- Token encryption (JWE): by default sign only (JWS). Encrypt only if payload confidentiality is required; prefer `RSA-OAEP` + `A256GCM` or `ECDH-ES` + `A256GCM`.
- Mandatory validations on verification: `iss`, `aud`, `exp`, `iat`, `nbf` (if used), `kid` existing in JWKS, and allowed algorithm. Reject `alg=none`.
- Time limits: `accessToken` 5–15 min; `refreshToken` 7–30 days. Allow clock skew ±60 s.
- Minimum claims:
  - Required: `iss`, `aud`, `sub`, `exp`, `iat`, `jti`.
  - Recommended: `scope`/`permissions`, `tenantId` in multi‑tenant.
  - Avoid PII in the token; keep payload small.

### Centralized authentication (external and internal)

- Single issuer per environment: a central auth service signs all JWTs. Apps verify against JWKS; they do not sign tokens themselves.
- "One key for all apps": implement as a key set owned by the central issuer per environment, not as a symmetric secret shared between services.
- External (users):
  - Use OIDC/OAuth 2.1 with Authorization Code + PKCE for public clients.
  - Protect against CSRF/Replay with `state` and `nonce`.
  - Map external identity to internal user; persist `provider`, `providerUserId`, and last login timestamp.
- Internal (service to service):
  - Prefer mTLS and/or Client Credentials to obtain JWTs issued by the central issuer.
  - Tokens with specific `aud` for the target service and minimum `scope`.
  - No secret sharing across services; each service trusts the issuer and verifies via JWKS.

### Revocation and logout

- Access: indirect revocation via short TTL.
- Refresh tokens: rotate on use; store `jti`/hash in secure storage, invalidate on logout and compromise. Maintain a temporary deny‑list in cache (e.g., Redis) for the remaining `exp`.
- For immediate high‑risk revocation, optionally consult a blocked `jti` list on critical endpoints.

## Pagination

- Standard params: `page` (≥ 1) and `pageSize` (1–100). Default: `page=1`, `pageSize=20`.
- Response must include `meta.page`, `meta.pageSize`, `meta.totalItems`, `meta.totalPages` and, when useful, `links.first|prev|next|last`.
- Optional headers: `X-Total-Count` with the total item count (must match `meta.totalItems`).
- Sorting: `sort` parameter (e.g., `sort=-createdAt,name`).
- Filtering: simple field params (e.g., `status=active`) or `filter[field]=value` to avoid collisions.

## Security

- Use `HTTPS` (TLS 1.2+) exclusively. Enable HSTS.
- Set `Content-Type: application/json; charset=utf-8` and validate `Accept`.
- Do not expose sensitive data in responses (e.g., passwords, tokens, secrets, PII). Mask or omit.
- Client‑facing error messages should be generic; include `traceId` for internal diagnostics.
- Implement rate limiting and return `429 Too Many Requests` with `Retry-After`.
- Configure CORS with the minimum necessary origins; deny by default.
- Validate and sanitize inputs; limit payload sizes; reject malformed JSON (`400`).
- Log securely and readably (no sensitive data and no unnecessary raw JSON).

## Encryption and sensitive data handling

- In transit: all traffic must be encrypted with TLS 1.2+.
- At rest: encrypt sensitive data (e.g., credentials, refresh tokens, PII) with key rotation.
- JWT: by default tokens are SIGNED (JWS). Only encrypt (JWE) when payload confidentiality is a requirement. Never include secrets in the payload.
- Avoid exposing predictable internal identifiers; consider UUIDs.
