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
