# Python Technology Stack

This document outlines the specific standards and conventions for developing backend services with Python.

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
