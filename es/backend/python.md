# Stack Tecnológico de Python

## Estándar vigente

Este documento define el **estándar obligatorio** para construir servicios backend con Python en Fibex Telecom.

- **Cumplimiento**: obligatorio para nuevos servicios y para cambios estructurales relevantes.
- **Excepciones**: requieren justificación técnica, evaluación de riesgo y aprobación explícita del comité de arquitectura.
- **Calidad (ISO/IEC 25010)**: deben existir gates automatizados en CI/CD para style, tipos, pruebas y seguridad de dependencias.

Este documento describe los estándares y convenciones específicas para desarrollar servicios de backend con Python.

## Quality Gates (obligatorios)

Los siguientes controles son **bloqueantes**: si fallan, el PR no se puede fusionar.

Niveles:

- **Estándar**: servicios internos o de impacto moderado.
- **TELCO Crítico**: servicios con SLA estricto, alta exposición, impacto operacional/regulatorio o criticidad de red.

| Control | Herramienta estándar | Estándar | TELCO Crítico | Bloquea merge |
|---|---|---:|---:|:---:|
| Formato | Black | Sin diffs | Sin diffs | Sí |
| Lint | Ruff (preferido) o Pylint | 0 errores | 0 errores | Sí |
| Type-check | mypy | Sin errores | Sin errores | Sí |
| Tests | Pytest | Cobertura >= 80% global; 100% en código crítico | Cobertura >= 90% global; 100% en código crítico | Sí |
| Seguridad (código) | Bandit | 0 hallazgos High sin excepción | 0 hallazgos Medium/High sin excepción | Sí |
| Dependencias | pip-audit / Snyk / Dependabot | 0 High/Critical sin excepción | 0 High/Critical sin excepción | Sí |
| Secretos | Gitleaks (o equivalente) | 0 hallazgos | 0 hallazgos | Sí |
| Contenedores (si aplica) | Trivy | 0 High/Critical sin excepción | 0 High/Critical sin excepción | Sí |

## Seguridad y operación (obligatorio)

- **Autenticación/autorización**: la verificación de permisos ocurre en backend (no confiar en el cliente). Auditar endpoints críticos.
- **Validación**: toda entrada debe validarse con Pydantic; rechazar payloads inválidos con errores 4xx semánticos.
- **Observabilidad**: logs estructurados y `traceId` propagado; métricas mínimas (latencia, tasa de error, saturación) y alertas.
- **Rendimiento**: usar IO asíncrona donde aplique; evitar llamadas bloqueantes en rutas async; pool de conexiones y límites.

## Stack Principal
- **Lenguaje**: [Python](https://www.python.org/)
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) es el framework web requerido.
- **Base de Datos**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [SQLAlchemy](https://www.sqlalchemy.org/) (con `asyncio`) es requerido para todas las interacciones con la base de datos.
- **Type Hinting**: El código debe incluir type hints, y se debe usar `mypy` para el análisis estático.

## Pruebas (Testing)
- **Estándar**: [Pytest](https://docs.pytest.org/en/stable/) es el framework requerido para todas las pruebas.

## Convenciones de Nomenclatura
- **Variables, Funciones, Archivos**: `snake_case`.
- **Clases**: `PascalCase`.

## Gestión de Dependencias
- **Estándar**: [Poetry](https://python-poetry.org/) es la herramienta requerida para la gestión de dependencias y empaquetado.

## Estructura de Directorios
Una estructura estándar para proyectos FastAPI es la siguiente:

`nombre_proyecto/`
`├── alembic/                      # Migraciones de base de datos`
`├── tests/                        # Todas las pruebas`
`├── nombre_proyecto/`
`│   ├── api/                      # Endpoints y enrutadores de la API`
`│   │   └── v1/`
`│   │       └── endpoints/`
`│   │           └── users.py`
`│   ├── core/                     # Configuración, eventos de inicio`
`│   ├── db/                       # Sesión de base de datos, modelos`
`│   ├── schemas/                  # Esquemas de Pydantic`
`│   ├── services/                 # Lógica de negocio`
`│   └── main.py                   # Instancia de la app FastAPI`
`├── .env`
`├── poetry.lock`
`└── pyproject.toml`
