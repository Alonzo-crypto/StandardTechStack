# Infrastructure & DevOps

## Effective standard

This document defines the **mandatory standard** for infrastructure and DevOps at FIBEX.

- **Compliance**: applies to all services and applications deployed by FIBEX or by third parties.
- **Exceptions**: require technical justification, risk assessment, and explicit approval.

This document covers standards related to deployment, containerization, and CI/CD.

## CI/CD Quality Gates (mandatory)

The following controls are **merge-blocking** for merges into `develop`, `qa`, and `main`.

Levels:

- **Standard**: internal systems or moderate impact.
- **TELCO Critical**: strict SLAs, high exposure, operational/regulatory impact, or network/service criticality.

| Gate | Evidence | Standard | TELCO Critical | Blocks merge |
|---|---|---:|---:|:---:|
| Lint/Format | CI job + artifact/report | 0 errors | 0 errors | Yes |
| Tests | CI job + coverage report | Coverage >= 80% overall; 100% in critical code | Coverage >= 90% overall; 100% in critical code | Yes |
| SAST | Report (SonarQube/Semgrep or equivalent) | 0 High findings without exception | 0 Medium/High findings without exception | Yes |
| Secret scanning | Report (Gitleaks or equivalent) | 0 findings | 0 findings | Yes |
| Dependency scanning | Report (Snyk/Dependabot or equivalent) | 0 High/Critical without exception | 0 High/Critical without exception | Yes |
| Container scanning (if applicable) | Report (Trivy or equivalent) | 0 High/Critical without exception | 0 High/Critical without exception | Yes |
| Reproducible build | Versioned artifact/image with digest | Built in CI (never local) | Built in CI + signed when applicable | Yes |

## Release and traceability (mandatory)

- Every deployable image/artifact must be traceable to commit SHA, version, and pipeline.
- Deploying artifacts not produced by CI is forbidden.
- Versioning: SemVer when applicable; tags and releases must be auditable.

## Deployment Platform

### New projects

For new developments, AWS will be used for infrastructure deployment.

The AWS base architecture must be defined and approved by the architecture and security committee, including at minimum: per-environment accounts, role-based IAM, network (VPC/subnets), observability, backups, and deployment strategy.

Execution may vary by site/environment while maintaining operational and security consistency:

| Site / context | Deployment standard | Typical use |
|---|---|---|
| Caracas | On‑prem VPS (physical servers) + Docker (Compose/Swarm as needed) | Local data residency, low latency, local infrastructure dependency |
| Valencia | Railway as default managed platform; Dokploy as a controlled alternative | Time-to-market, simplified operations, standard apps |
| New projects (corporate) | AWS | Critical systems, scalability, compliance, managed services, centralized governance |

## Security

This section defines baseline security controls applicable to all projects, regardless of infrastructure provider.

- **Password security (Argon2)**:

  - Standard: Argon2id with recommended parameters (e.g., memoryCost ≥ 64MB, timeCost 2–4, parallelism per CPU).
  - Usage: include a unique per‑user `salt`, and encode parameters in the hash to enable future recalibration.
  - Migration: upon authentication, detect legacy hashes (bcrypt/scrypt) and rehash with Argon2id after successful login.

  - Operations: recalibrate parameters at least every 6 months or when hardware/threat landscape changes; record the parameter version for auditability.

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
  - Standard: all new applications must be designed to be deployable on **Railway**.
  - Serverless: for applicable services (e.g., APIs, small functions), prefer serverless deployments to reduce operational load.
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

- Minimum retention: define per environment (lower for dev, higher for prod) and per regulatory requirement. Any exception must be justified and explicitly approved.
