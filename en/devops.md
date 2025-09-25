# Infrastructure & DevOps

This document covers standards related to deployment, containerization, and CI/CD.

## Deployment Platform

### New projects

For new developments, AWS will be used for infrastructure deployment.

TODO: Define the base architecture with the AWS cloud management provider and address project‑specific requirements.

### Caracas

- **On‑prem VPS (physical servers)**: For workloads requiring local data residency or low latency in Caracas.
  - Minimum: KVM/Proxmox virtualization, SSD/NVMe storage, redundant power/network.
  - Base OS: Ubuntu LTS, SSH keys, `ufw` default deny, fail2ban.
  - Containerization: Docker + Docker Compose or Docker Swarm for simple clustering.
  - Observability: metrics (Prometheus/node_exporter), centralized logs (Loki or alternative), alerts (Alertmanager).
  - Backups: daily volume snapshots and encrypted off‑site copies.
  - Security: TLS via Let's Encrypt with auto‑renewal, perimeter firewall, VPN access for internal panels.

### Valencia (Railway)

- **Railway (standard)**:
  - Deployment: auto‑build via Dockerfile or buildpacks. Environment variables managed in platform; never commit secrets.
  - Managed databases: prefer managed instances; enable automatic backups and replicas when available.
  - Network & security: custom domains with TLS, IP restrictions if needed, per‑environment variables (dev/stage/prod).
  - Observability: real‑time logs, CPU/memory metrics; configure alerts on critical thresholds.

### Dokploy (alternative)

- Use when self‑managed infrastructure or simplified multi‑tenant deployments are required.
- Practices: deployment templates with minimal images, HTTP/TCP healthchecks, and restart policies.

### Serverless functions

- Considerations: timeouts, cold starts, and memory limits; use idempotent patterns for retries.
- Triggers: HTTP, cron, queues/events. Keep functions small with minimal dependencies.
- Security: mandatory authentication, strict input validation, per‑function rate limits.

## Containerization

- **Standard**: All backend services must be containerized using [Docker](https://www.docker.com/).
- **Dockerfile**: Each service must include a multi-stage `Dockerfile` to produce a small, optimized, and secure production image.

## CI/CD

- **Platform**: [GitHub Actions](https://github.com/features/actions) is the standard for all CI/CD pipelines.
- **Required Workflows**: Every project must include workflows for:
  - **Linting & Formatting**: Run on every push to any branch.
  - **Testing**: Run unit and integration tests on every push to `develop` and feature branches.
  - **Building**: Create a production build and container image on every merge to `develop`.
  - **Deployment**: Automate deployment to staging/production environments.

## Package Management

- **Standard**: [pnpm](https://pnpm.io/) is the required package manager for all TypeScript/JavaScript projects to ensure efficient and deterministic dependency management.

## Password security (Argon2)

- Standard: Argon2id with recommended parameters (e.g., memoryCost ≥ 64MB, timeCost 2–4, parallelism per CPU).
- Usage: include unique per‑user `salt` and encode parameters in the hash to enable future recalibration.
- Migration: on successful login, detect legacy hashes (bcrypt/scrypt) and rehash with Argon2id.

TODO: Based on new developments, clearly define standards for password management.

## Domain and IP management

- Domains: centralize DNS in a single provider. Use `A/AAAA` for IPs and `CNAME` for subdomains. Enable DNSSEC when possible.
- TLS: automated certificates (Let's Encrypt) with continuous renewal. Enforce `HTTPS` and HSTS.
- IPs: document public IPs per environment/service. Apply allowlists on sensitive panels.
- Routing: redirect `www` → apex with 301; configure `robots.txt` and `sitemap.xml` for public sites.
 - Through AWS, configure domains and environment separation with distinct names for applications or APIs, e.g., app-dev.fibextelecom.com or api-dev.fibextelecom.com for the development environment.

## Logging

- Readable, structured format: timestamp, level, `traceId`, message, and key fields; avoid unnecessary raw JSON.
- Centralization: ship logs to an aggregator (e.g., Loki/ELK) with per‑environment retention.
- Levels: `debug` (development), `info` (normal flow), `warn` (recoverable anomalies), `error` (failures). Never log PII or secrets.
- Correlation: propagate `traceId` and `spanId` from gateway/middleware across services.

TODO: Define policies for centralized logging and handling.
