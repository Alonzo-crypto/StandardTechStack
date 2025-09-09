# Stack Tecnológico de Python

Este documento describe los estándares y convenciones específicas para desarrollar servicios de backend con Python.

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
