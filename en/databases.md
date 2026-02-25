# Databases

This document summarizes usage criteria and best practices for Redis, MongoDB, PostgreSQL, and MySQL.

## General conventions and best practices

The following rules apply to **all** databases used in the project:

- **Column and field names in `snake_case`:** all column, field, and attribute names must be written in `snake_case` (lowercase words separated by underscores). Example: `new_clients`, `created_at`, `user_id`.
- **Names in English:** all identifiers (columns, tables, collections, indexes, keys, etc.) must be in **English**. This ensures consistency and facilitates collaboration with tools, libraries, and international teams.
- **Descriptive names without ambiguous abbreviations:** use clear names that express the purpose of the field. Prefer `invoice_total` over `inv_tot` or `total`.
- **Avoid reserved words:** do not use SQL or engine reserved words as column or table names (e.g., `order`, `user`, `table`). If unavoidable, apply the appropriate escaping.
- **Consistent data types:** define the most specific and appropriate data type for each field. Avoid storing numbers as text or dates as strings.
- **Controlled nulls:** document and restrict the use of `NULL`; prefer explicit default values when it makes sense.
- **Primary keys:** always define an explicit primary key. Prefer technical identifiers (UUID v4/v7 or serial/bigserial) over natural keys when data may change.
- **Basic audit fields:** include `created_at` and `updated_at` fields with default values and automatic updates in all main tables/collections.
- **Versioned migrations:** all schema changes must be performed through versioned migrations. Never modify the production schema manually.
- **No secrets in plain text:** passwords, tokens, and sensitive data must be hashed or encrypted before being persisted.

## Redis

- Recommended use cases: read/write cache, rate limiting, lightweight queues, distributed locks.
- Operations: prefer AOF persistence for durability; set explicit expirations (TTL); use replicas and cluster for HA when needed.
- Best practices:
  - Design keys with clear domain prefixes (e.g., `auth:sessions:{id}`).
  - Always set TTL for temporary data to avoid unbounded growth.
  - Use `pipeline`/`multi` to reduce latency; consider Lua for complex atomic ops.
  - Avoid storing PII or large payloads; keep values small with efficient serialization.

## MongoDB

- Recommended use cases: flexible documents, events, catalogs, audits with evolving schemas.
- Modeling:
  - Embed for local reads and high cohesion; reference for N:N relationships or unbounded growth.
  - Compound indexes, TTL for ephemeral data, and JSON Schema validation.
  - ~16 MB document limit: store large binaries elsewhere (e.g., S3; GridFS only when necessary).
- Operations: replica set by default; shard only with evidence; backups via `mongodump`/snapshots.
- Performance: projections to reduce payload, early selective stages in aggregation, avoid `$where`.

## PostgreSQL

- Recommended use cases: strong transactions, referential integrity, reporting, light analytics.
- Modeling and performance:
  - Thoughtful normalization; use `ENUM`/reference tables for controlled domains.
  - Proper indexes (BTREE default; GIN/GiST for JSONB, full‑text, geospatial).
  - Partition very large tables; maintenance with `VACUUM (AUTO)` and `ANALYZE`.
  - Connection pooling (e.g., PgBouncer) for high‑concurrency services.
- Security: SSL/TLS, least‑privilege roles, at‑rest encryption where applicable, RLS for multi‑tenant.
- Migrations: always use the project migration tool; never mutate schemas manually in production.

## MySQL

- Recommended use cases: OLTP, compatibility with existing MySQL ecosystems, read‑heavy workloads with replicas.
- Best practices:
  - `InnoDB` as default engine; `utf8mb4` for full Unicode support.
  - Design indexes based on real queries (use `EXPLAIN` regularly).
  - Schema changes in controlled windows; for huge tables, online strategies (e.g., pt‑online‑schema‑change).
- Operations: replicas for read scaling; consistent backups; monitor slow query log.

## Quick selection

- Redis: cache, counters, locks, simple queues.
- MongoDB: flexible documents and fast‑evolving schemas.
- PostgreSQL: integrity and complex transactions.
- MySQL: OLTP with existing MySQL ecosystem.

