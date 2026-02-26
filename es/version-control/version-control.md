# Git y Control de Versiones en Fibex Telecom

## Introducción

Git y GitHub son herramientas fundamentales para el desarrollo colaborativo, permitiendo mantener un historial preciso de cambios, facilitar la colaboración en equipo y asegurar la calidad del código antes de llegar a producción.

En Fibex Telecom, adoptamos un enfoque estructurado basado en las mejores prácticas de la industria, como GitFlow simplificado, Conventional Commits y versionamiento semántico. Esto nos permite escalar nuestros proyectos de manera eficiente, reducir errores y mantener un alto estándar de calidad.

Esta guía está dividida por roles de desarrolladores (Junior, Backend, Frontend y Fullstack) para proporcionar explicaciones claras y adaptadas a las responsabilidades de cada uno. Cada sección incluye cómo aplicar los estándares generales en el contexto específico de su rol.

Recuerden: El control de versiones no es solo una herramienta técnica, sino una disciplina que asegura la integridad y evolución sostenible de nuestro software.

## Roles y Flujos de Trabajo

### Desarrollador Junior

Como desarrollador junior en Fibex Telecom, tu rol es aprender las bases del control de versiones mientras contribuyes al desarrollo. Git es un sistema de control de versiones distribuido que te permite rastrear cambios en el código, colaborar con el equipo y revertir errores de manera segura. GitHub es la plataforma que alojamos nuestros repositorios, facilitando la revisión de código a través de Pull Requests.

#### Modelo de Ramas Simplificado

- Siempre trabaja en ramas de funcionalidades (`feat/`) o correcciones (`fix/`).
- Crea tu rama desde `develop`: `git checkout -b feat/mi-primera-feature develop`
- Realiza commits frecuentes con mensajes claros.
- Cuando termines, crea un Pull Request hacia `develop` para revisión.

#### Mensajes de Commit Básicos

Usa Conventional Commits: `feat: agregar login básico` o `fix: corregir error en formulario`.

#### Flujo de Trabajo

1. Actualiza tu rama local: `git pull origin develop`
2. Crea rama feature.
3. Desarrolla y commitea.
4. Push a GitHub: `git push origin feat/mi-feature`
5. Crea PR.

### Desarrollador Backend

En el backend, enfócate en la lógica del servidor, APIs y bases de datos. Usa ramas específicas para módulos backend.

#### Modelo de Ramas

- Ramas como `feat/api-users` para nuevas APIs.
- Asegura que los cambios se integren correctamente con frontend.

#### Commits

- `feat: implement user API endpoint`
- `fix: resolve database connection issue`

#### Flujo

Similar al junior, pero incluye pruebas unitarias en commits.

### Desarrollador Frontend

Trabaja en la interfaz de usuario, componentes y estilos. Ramas para UI features.

#### Modelo de Ramas

- `feat/login-component`
- Coordina con backend para integraciones.

#### Commits

- `feat: add responsive login form`
- `style: update button colors`

#### Flujo

Incluye revisiones visuales en PR.

### Desarrollador Fullstack

Maneja ambos lados, asegurando la integración completa.

#### Modelo de Ramas

- Ramas que cubran full features: `feat/user-management` (incluyendo backend y frontend).

#### Commits

- Separa commits por capa: backend primero, luego frontend.

#### Flujo

Coordina PRs para ambas partes, asegura QA completa.

## Modelo de Ramas

El estándar es una versión simplificada de GitFlow:
- **`main`**: Código listo para producción. Los pushes directos están prohibidos. Se fusiona solo desde `qa` a través de Pull Requests.
- **`qa`**: Código listo para aplicar pruebas de calidad. Los pushes directos están prohibidos. Se fusiona solo desde `develop` a través de Pull Requests.
- **`develop`**: La rama principal de integración para funcionalidades. Todas las ramas de funcionalidades se fusionan en `develop`.
- **`feat/feature-name`**: Ramas para desarrollar nuevas funcionalidades (ej., `feat/user-authentication`). Se crean a partir de `develop`.
- **`fix/bug-name`**: Ramas para corregir errores (ej., `fix/login-button-bug`). Se crean a partir de `develop`.

## Mensajes de Commit

Todos los mensajes de commit deben seguir la especificación de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Esto es fundamental para generar changelogs automatizados y entender el historial del proyecto.

Esto será forzado por hooks de pre-commit.

### Ejemplos:
- **feat**: `feat: add user login functionality`
- **fix**: `fix: correct calculation in payment module`
- **docs**: `docs: update user guide for login section`
- **style**: `style: format code with prettier`
- **refactor**: `refactor: simplify user session management`
- **test**: `test: add unit tests for the payment calculator`
- **chore**: `chore: upgrade dependency to new version`

## Flujo de Trabajo para Terceros y Proveedores

Para proyectos desarrollados por terceros o contratistas externos, es obligatorio un esquema de tres ramas (`develop` -> `qa` -> `main`).

- **Responsabilidad del Proveedor**: Los desarrolladores externos realizarán todo su trabajo en ramas de funcionalidad (feature branches), fusionando sus cambios en `develop`. Cuando un conjunto de funcionalidades esté listo para ser revisado, fusionarán todos los cambios en la rama `qa`. La rama `qa` sirve como el punto de entrega oficial para todos los entregables.
- **Responsabilidad de FIBEX**: El equipo interno de FIBEX es el único responsable de revisar y aprobar el código en la rama `qa`. Tras una validación exitosa, **solo el equipo de FIBEX tiene permitido fusionar los cambios de `qa` a `main`**. Esto asegura un estricto control de calidad y seguridad antes de que cualquier código llegue a producción.

## Versionamiento

En Fibex Telecom, utilizamos Versionamiento Semántico (SemVer) para nuestras releases. Esto asegura que las versiones reflejen claramente el tipo de cambios realizados, facilitando la gestión de dependencias y actualizaciones.

### Convención de Versionamiento Semántico

Las versiones siguen el formato `MAJOR.MINOR.PATCH`:

- **MAJOR**: Cambios incompatibles hacia atrás (breaking changes). Incrementa cuando hay cambios que rompen la API existente.
- **MINOR**: Nuevas funcionalidades compatibles hacia atrás. Incrementa cuando se agregan nuevas features sin romper compatibilidad.
- **PATCH**: Correcciones de errores compatibles hacia atrás. Incrementa para bug fixes.

Ejemplos:
- `1.0.0`: Primera release estable.
- `1.1.0`: Nueva feature agregada.
- `1.1.1`: Bug fix en la feature anterior.
- `2.0.0`: Cambio breaking, como refactorización mayor de la API.

Las versiones se determinan automáticamente basándose en los mensajes de commit Conventional Commits, utilizando herramientas como `semantic-release`.

### Tags en GitHub

Cada release debe tener un tag correspondiente en GitHub:
- Crea tags para cada versión: `git tag v1.0.0`
- Push tags: `git push origin --tags`
- Crea releases en GitHub desde estos tags, incluyendo changelogs generados automáticamente.

Esto facilita el seguimiento de releases y permite deployments automatizados.

## Consideraciones Futuras

A medida que nuestro proceso de desarrollo madure, podríamos evolucionar el modelo para incorporar ramas adicionales cuando aporten control sin incrementar fricción de forma injustificada (p. ej., `release/` para estabilización con fechas fijas, o `hotfix/` para correcciones urgentes en producción). Cualquier cambio al modelo de ramas debe ser aprobado por el comité de arquitectura y reflejado en los workflows de CI/CD.
