# Git & Version Control

## Branching Model
A simplified version of GitFlow is the standard:
- **`main`**: Production-ready code. Direct pushes are forbidden. Merges only from `develop` via Pull Requests.
- **`develop`**: The primary integration branch for features. All feature branches are merged into `develop`.
- **`feat/feature-name`**: Branches for developing new features (e.g., `feat/user-authentication`). Branched from `develop`.
- **`fix/bug-name`**: Branches for bug fixes (e.g., `fix/login-button-bug`). Branched from `develop`.

## Commit Messages
All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. This is critical for generating automated changelogs and understanding project history.

This will be enforced by pre-commit hooks.

### Examples:
- **feat**: `feat: add user login functionality`
- **fix**: `fix: correct calculation in payment module`
- **docs**: `docs: update user guide for login section`
- **style**: `style: format code with prettier`
- **refactor**: `refactor: simplify user session management`
- **test**: `test: add unit tests for the payment calculator`
- **chore**: `chore: upgrade dependency to new version`
