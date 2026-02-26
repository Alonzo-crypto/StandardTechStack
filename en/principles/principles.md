# Guiding Principles

These principles are mandatory and do not allow exceptions without explicit approval by the architecture committee. They apply to all projects at FIBEX.

- **Use approved languages**: projects must use only the languages and frameworks approved per platform. Any deviation requires technical justification and architecture committee approval.

  - **TypeScript**:
    - Backend: NestJS (recommended for scalable, modular APIs).
    - Web frontend: Next.js (recommended for SSR/SSG), Angular (complex enterprise apps), React (dynamic UIs), Vue.js (rapid, maintainable prototyping).
  - **Python**:
    - Frameworks: Django (full-stack with integrated ORM), FastAPI (high-performance REST/GraphQL APIs), Flask (simple microservices).
    - Guidance: use async/await in FastAPI where applicable; Poetry for dependency management; Pydantic for validation.
  - **PHP**:
    - Laravel (robust web applications with Eloquent ORM).
  - **Dart**:
    - Mobile apps: Flutter (recommended for cross-platform with declarative UI).

- **Simplicity and maintainability**: prefer simple, clear solutions. Avoid unnecessary complexity; code must be readable by any developer. Use well-known patterns; do not reinvent the wheel.
- **Consistency**: strictly follow conventions. Automated tools (linters, formatters) must enforce compliance. Inconsistencies are considered critical bugs.
- **Test-driven development (TDD/BDD)**: write tests before code. Minimum coverage 80%; failing tests block commits. Code without associated tests is not allowed.
- **API-first design**: design APIs with OpenAPI before implementation. APIs must be versioned, documented, and thoroughly tested.
- **Security by design**: integrate security from day one. Use principles such as Zero Trust, end-to-end encryption, and data minimization.
- **Least privilege**: grant only the minimum permissions required. Applies to code, infrastructure, and access.
- **Immutability and reproducibility**: use immutable containers (Docker) and reproducible environments. No manual changes in production.
- **Fail-fast**: design systems to fail fast and visibly. Silent failures are forbidden; logging is mandatory.
- **Separation of concerns**: keep clear layers (frontend, backend, data). Avoid tight coupling.
- **Maximal automation**: everything automatable must be automated: builds, tests, deployments. Manual steps only for critical exceptions.

## TELCO-Grade Principles

At FIBEX, these principles are critical for operating under high demand and strict regulation. They apply without exceptions to ensure compliance and operational excellence.

- **High availability and scalability**: minimum 99.99% uptime. Serverless or microservices with auto-scaling. Mandatory load testing; capacity for 10x traffic spikes.
- **Quality of service (QoS)**: latency <100 ms for critical APIs; throughput defined by SLA. Continuous QoS monitoring; non-compliance is treated as an incident.
- **Monitoring and observability**: mandatory Prometheus/Grafana metrics. Structured logs in ELK (or equivalent). Distributed tracing (Jaeger/OpenTelemetry). 24/7 alerting; real-time dashboards.
- **Reusable and modular design**: microservices with stable API contracts. Reusable component catalog. Strict SemVer to avoid breaking changes.
- **Regulatory compliance**: adhere to telecom/data laws (e.g., GDPR). Annual audits; mandatory encryption of sensitive data.
- **Resilience to failures**: circuit breakers, retries, fallbacks. Quarterly chaos testing.
- **Resource optimization**: energy and cost efficiency. CDN for global distribution; aggressive caching.
- **Integration with telco infrastructure**: compatibility with 5G/IoT. Standardized APIs for interoperability.

## General Conventions

These conventions are mandatory and apply to all code. Automated tooling must prevent commits that do not comply.

- **Language in code**: all code must be in **English**. Internal team comments and documentation may be in Spanish; external vendors must use English.
- **Formatting**: use [Prettier](https://prettier.io/) with a shared configuration. Pre-commit hooks must block unformatted commits.
- **Linting**: pass [ESLint](https://eslint.org/) for TS/JS; equivalent linters for other languages. Shared configuration; CI must fail on errors.
- **Variable/function naming**: `camelCase` for JS/TS; `snake_case` for Python. Descriptive and in English. Avoid ambiguous abbreviations.
- **Project structure**: follow a standard layout (`src/`, `tests/`, `docs/`). Use monorepos for multi-project setups.
- **Error handling**: clear exceptions; do not silence errors. Structured logging is mandatory.
- **Dependency versioning**: use pinned versions; upgrades only via PR with tests.
- **Commits and messages**: strict Conventional Commits; hooks must prevent non-compliant messages.
- **Documentation**: README is mandatory; self-documenting code; APIs documented with Swagger/OpenAPI.
- **Secrets management**: never in code; use vaults (e.g., HashiCorp Vault). Regular audits.

## Security principles

Security is a top priority and non-negotiable. Violations may result in immediate project suspension.

- **Zero Trust architecture**: verify every access; do not trust perimeters. MFA is mandatory.
- **End-to-end encryption**: sensitive data encrypted at rest and in transit. Use at least TLS 1.3 where applicable.
- **Security audits**: SAST/DAST scanners in CI; quarterly pentesting. Must meet OWASP Top 10.
- **Vulnerability management**: security updates within 24 hours; dependencies scanned daily.
- **Defense in depth**: multiple security layers; network segmentation.

## Architecture principles

Architectures must be scalable, maintainable, and aligned with modern standards.

- **Microservices**: independent services with asynchronous communication (events) where applicable. Avoid monoliths.
- **Event-driven**: use event patterns for decoupling (e.g., Kafka) when justified.
- **Serverless when applicable**: targeted functions to reduce infrastructure overhead.
- **RESTful/GraphQL APIs**: standardized, versioned, with throttling and rate limiting.
- **Databases**: PostgreSQL/MySQL for relational; MongoDB for NoSQL. Versioned migrations.

## Governance and compliance

Ensure alignment with business goals and regulations.

- **Architecture review**: mandatory for new projects; committee approves designs.
- **Success metrics**: project KPIs defined; quarterly reviews.
- **Regulatory compliance**: annual external audits; compliance documentation.
- **Risk management**: risk assessment on every release; contingency plans.
- **Continuous training**: mandatory training on security and best practices.

## Clean design and code principles

These principles guide building high-quality, maintainable, and scalable software. They are mandatory for all code.

- **SOLID**: object-oriented design principles.
  - Single Responsibility: each class has a single responsibility.
  - Open-Closed: open for extension, closed for modification.
  - Liskov Substitution: subtypes substitutable for their base types.
  - Interface Segregation: specific interfaces rather than broad ones.
  - Dependency Inversion: depend on abstractions, not concretions.
- **DRY (Don't Repeat Yourself)**: avoid duplication; use reusable functions/classes/modules.
- **KISS (Keep It Simple, Stupid)**: keep solutions simple; avoid over-engineering.
- **Clean Code**: readable, expressive, well-structured code. Descriptive names, short functions, minimal comments.
- **Result pattern**: use Result types for errors instead of exceptions; improves predictability and avoids silent failures.
- **Resilience pattern**: design for failure: circuit breakers, retries, timeouts.
- **No generic try/catch as technical debt**: avoid excessive or generic try/catch; it masks errors and complicates debugging. Use Result pattern, upfront validations, or specific exception handling.

## Clean Architecture

Clean Architecture promotes separation of concerns, testability, and maintainability. At FIBEX, projects are evaluated to choose between a basic version and a more structured professional standard. Choice depends on complexity: basic for simple projects, professional for scalable/long-term systems.

### Basic version (Clean Architecture)

Based on Uncle Bob's Clean Architecture: concentric layers with dependencies pointing inward.

- **Layers**:
  - Entities: core business rules (framework-independent).
  - Use Cases / Interactors: application logic orchestrating entities.
  - Interface Adapters: adapters for UI/persistence (Controllers, Gateways).
  - Frameworks & Drivers: external frameworks (DB, web frameworks).
- **Rules**: dependencies only inward; dependency injection.
- **When to use**: medium projects; easy to implement; good separation.

### Professional standardized version (Hexagonal/Onion Architecture)

A more structured evolution that emphasizes ports and adapters (Hexagonal) or onion layers.

- **Layers**:
  - Domain: pure entities and business rules.
  - Application: use cases, commands/queries.
  - Infrastructure: external adapters (repositories, external APIs).
  - Presentation: controllers, DTOs.
- **Ports and adapters**: interfaces (ports) define contracts; adapters implement them (e.g., DB adapters).
- **Rules**: domain independent; application depends only on domain; infrastructure depends on application.
- **When to use**: complex/scalable projects; best for microservices; improves testing and changeability.

**Decision**: evaluate size, team, and requirements. Basic for fast start; professional for long term. Architecture committee approves the choice.

## Basic Clean Architecture implementations per language/framework

Below are complete folder structures to implement Clean Architecture in the approved languages and frameworks.

### TypeScript - NestJS (Backend)

```
src/
├── domain/
│   ├── entities/
│   ├── services/
│   └── utils/
├── application/
│   ├── use-cases/
│   ├── services/
│   └── dto/
├── infrastructure/
│   ├── repositories/
│   ├── adapters/
│   ├── config/
│   └── database/
├── presentation/
│   ├── controllers/
│   ├── guards/
│   ├── interceptors/
│   └── modules/
└── main.ts
```

### TypeScript - Next.js (Frontend)

```
src/
├── domain/
│   ├── entities/
│   ├── services/
│   └── utils/
├── application/
│   ├── hooks/
│   ├── services/
│   └── types/
├── infrastructure/
│   ├── api/
│   ├── adapters/
│   └── config/
├── presentation/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── styles/
│   └── utils/
├── lib/
└── app/
```

### TypeScript - Angular

```
src/
├── app/
│   ├── domain/
│   │   ├── entities/
│   │   ├── services/
│   │   └── utils/
│   ├── application/
│   │   ├── services/
│   │   └── guards/
│   ├── infrastructure/
│   │   ├── adapters/
│   │   └── config/
│   ├── presentation/
│   │   ├── components/
│   │   ├── modules/
│   │   └── routing/
│   └── core/
├── assets/
├── environments/
└── main.ts
```

### TypeScript - React

```
src/
├── domain/
│   ├── entities/
│   ├── services/
│   └── utils/
├── application/
│   ├── hooks/
│   ├── services/
│   └── context/
├── infrastructure/
│   ├── api/
│   ├── adapters/
│   └── config/
├── presentation/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── styles/
│   └── utils/
├── lib/
└── index.tsx
```

### TypeScript - Vue.js

```
src/
├── domain/
│   ├── entities/
│   ├── services/
│   └── utils/
├── application/
│   ├── composables/
│   ├── services/
│   └── types/
├── infrastructure/
│   ├── api/
│   ├── adapters/
│   └── config/
├── presentation/
│   ├── components/
│   ├── views/
│   ├── layouts/
│   ├── router/
│   ├── store/
│   └── styles/
├── utils/
└── main.js
```

### Python - Django

```
myproject/
├── myapp/
│   ├── domain/
│   │   ├── models.py
│   │   ├── services.py
│   │   └── utils.py
│   ├── application/
│   │   ├── views.py
│   │   ├── forms.py
│   │   └── services.py
│   ├── infrastructure/
│   │   ├── repositories.py
│   │   ├── adapters.py
│   │   └── config.py
│   ├── presentation/
│   │   ├── templates/
│   │   ├── static/
│   │   └── controllers.py
│   ├── migrations/
│   └── __init__.py
├── manage.py
└── settings.py
```

### Python - FastAPI

```
project/
├── domain/
│   ├── models.py
│   ├── entities/
│   ├── services/
│   └── utils/
├── application/
│   ├── routers/
│   ├── dependencies/
│   ├── services/
│   └── dto/
├── infrastructure/
│   ├── repositories/
│   ├── adapters/
│   ├── database/
│   └── config/
├── presentation/
│   ├── routes/
│   ├── controllers/
│   └── templates/
├── main.py
└── requirements.txt
```

### Python - Flask

```
project/
├── app/
│   ├── domain/
│   │   ├── models.py
│   │   ├── services/
│   │   └── utils/
│   ├── application/
│   │   ├── blueprints/
│   │   ├── services/
│   │   └── forms/
│   ├── infrastructure/
│   │   ├── repositories/
│   │   ├── adapters/
│   │   └── config/
│   ├── presentation/
│   │   ├── templates/
│   │   ├── static/
│   │   └── routes/
│   └── __init__.py
├── config.py
├── run.py
└── requirements.txt
```

### PHP - Laravel

```
app/
├── Domain/
│   ├── Entities/
│   ├── Services/
│   └── Utils/
├── Application/
│   ├── UseCases/
│   ├── Services/
│   └── DTO/
├── Infrastructure/
│   ├── Repositories/
│   ├── Adapters/
│   ├── Config/
│   └── Database/
├── Presentation/
│   ├── Controllers/
│   ├── Middleware/
│   ├── Requests/
│   └── Resources/
├── Console/
├── Exceptions/
├── Http/
└── Providers/
```

### Dart - Flutter

```
lib/
├── domain/
│   ├── entities/
│   ├── services/
│   └── utils/
├── application/
│   ├── blocs/
│   ├── cubits/
│   └── services/
├── infrastructure/
│   ├── repositories/
│   ├── adapters/
│   ├── api/
│   └── config/
├── presentation/
│   ├── widgets/
│   ├── screens/
│   ├── blocs/
│   ├── theme/
│   └── utils/
├── core/
├── main.dart
└── pubspec.yaml
```
