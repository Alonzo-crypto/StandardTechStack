# Databases

This document summarizes usage criteria and best practices for Redis, MongoDB, PostgreSQL, and MySQL.

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

