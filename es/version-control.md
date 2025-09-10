# Git y Control de Versiones

## Modelo de Ramas

El estándar es una versión simplificada de GitFlow:
- **`main`**: Código listo para producción. Los pushes directos están prohibidos. Se fusiona solo desde `develop` a través de Pull Requests.
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

TODO: Versionamiento semántico... agregar convención.
TODO: Agregar tags de github en cada release

## Consideraciones Futuras

A medida que nuestro proceso de desarrollo madure, podríamos evolucionar nuestro modelo de ramas para incluir una rama `qa` dedicada. Esto crearía un flujo como `develop` -> `qa` -> `main`, permitiendo una fase de pruebas y estabilización más robusta antes de que el código sea liberado a producción. Esto se evaluará a medida que el tamaño del equipo y la complejidad del proyecto crezcan.
