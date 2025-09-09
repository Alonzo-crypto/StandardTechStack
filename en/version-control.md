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

## Third-Party & Vendor Workflow

For projects developed by third parties or external contractors, a three-branch scheme (`develop` -> `qa` -> `main`) is mandatory.

- **Vendor Responsibility**: External developers will perform all their work in feature branches, merging into `develop`. When a feature set is ready for review, they will merge all changes into the `qa` branch. The `qa` branch serves as the official handover point for all deliverables.
- **FIBEX Responsibility**: The internal FIBEX team is solely responsible for reviewing and approving the code on the `qa` branch. After successful validation, **only the FIBEX team is permitted to merge changes from `qa` to `main`**. This ensures a strict quality and security gate before any code reaches production.

## Future Considerations

As our development process matures, we may evolve our branching model to include a dedicated `qa` branch. This would create a flow such as `develop` -> `qa` -> `main`, allowing for a more robust testing and stabilization phase before code is released to production. This will be evaluated as team size and project complexity grow.
