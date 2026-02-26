# Python Technology Stack

## Effective standard

This document defines the **mandatory standard** for building backend services with Python at FIBEX.

- **Compliance**: mandatory for new services and for significant structural changes.
- **Exceptions**: require technical justification, risk assessment, and explicit approval by the architecture committee.
- **Quality (ISO/IEC 25010)**: CI/CD must enforce style, types, tests, and dependency security gates.

This document outlines the specific standards and conventions for developing backend services with Python.

## Quality Gates (mandatory)

The following controls are **merge-blocking**: if they fail, the PR cannot be merged.

Levels:

- **Standard**: internal services or moderate impact.
- **TELCO Critical**: strict SLAs, high exposure, operational/regulatory impact, or network/service criticality.

| Control | Standard tool | Standard | TELCO Critical | Blocks merge |
|---|---|---:|---:|:---:|
| Formatting | Black | No diffs | No diffs | Yes |
| Lint | Ruff (preferred) or Pylint | 0 errors | 0 errors | Yes |
| Type-check | mypy | No errors | No errors | Yes |
| Tests | Pytest | Coverage >= 80% overall; 100% in critical code | Coverage >= 90% overall; 100% in critical code | Yes |
| Security (code) | Bandit | 0 High findings without exception | 0 Medium/High findings without exception | Yes |
| Dependencies | pip-audit / Snyk / Dependabot | 0 High/Critical without exception | 0 High/Critical without exception | Yes |
| Secrets | Gitleaks (or equivalent) | 0 findings | 0 findings | Yes |
| Containers (if applicable) | Trivy | 0 High/Critical without exception | 0 High/Critical without exception | Yes |

## Security & operations (mandatory)

- Authentication/authorization: permissions are verified in backend (never trust the client). Audit critical endpoints.
- Validation: all inputs must be validated with Pydantic; reject invalid payloads with semantic 4xx errors.
- Observability: structured logs with propagated `traceId`; minimum metrics (latency, error rate, saturation) and alerts.
- Performance: use async IO where applicable; avoid blocking calls in async routes; enforce connection pool limits.

## Core Stack
- **Language**: [Python](https://www.python.org/)
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) is the required web framework.
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [SQLAlchemy](https://www.sqlalchemy.org/) (with `asyncio`) is required for all database interactions.
- **Type Hinting**: Code must include type hints, and `mypy` should be used for static analysis.

## Testing
- **Standard**: [Pytest](https://docs.pytest.org/en/stable/) is the required framework for all testing.

## Naming Conventions
- **Variables, Functions, Files**: `snake_case`.
- **Classes**: `PascalCase`.

## Dependency Management
- **Standard**: [Poetry](https://python-poetry.org/) is the required tool for dependency management and packaging.

## Directory Structure
A standard structure for FastAPI projects is as follows:

`project_name/`
`├── alembic/                      # Database migrations`
`├── tests/                        # All tests`
`├── project_name/`
`│   ├── api/                      # API endpoints and routers`
`│   │   └── v1/`
`│   │       └── endpoints/`
`│   │           └── users.py`
`│   ├── core/                     # Configuration, startup events`
`│   ├── db/                       # Database session, models`
`│   ├── schemas/                  # Pydantic schemas`
`│   ├── services/                 # Business logic`
`│   └── main.py                   # FastAPI app instantiation`
`├── .env`
`├── poetry.lock`
`└── pyproject.toml`
