# Git & Version Control

## Introduction

Git and GitHub are fundamental tools for collaborative development. They keep an accurate history of changes, enable teamwork, and enforce quality before code reaches production.

At FIBEX, we adopt a structured approach based on industry best practices, including a simplified GitFlow model, Conventional Commits, and Semantic Versioning. This enables us to scale efficiently, reduce errors, and maintain a high quality bar.

This guide includes role-based workflows (Junior, Backend, Frontend, Fullstack) to provide clear expectations aligned with responsibilities.

Remember: version control is not just a technical tool; it is a discipline that protects the integrity and sustainable evolution of our software.

## Roles and workflows

### Junior developer

As a junior developer at FIBEX, your role is to learn version control fundamentals while contributing safely.

#### Simplified branching

- Always work in feature (`feat/`) or fix (`fix/`) branches.
- Create branches from `develop`: `git checkout -b feat/my-first-feature develop`
- Commit frequently with clear messages.
- When finished, open a Pull Request into `develop` for review.

#### Basic commit messages

Use Conventional Commits: `feat: add basic login` or `fix: correct form validation`.

#### Workflow

1. Update your local branch: `git pull origin develop`
2. Create your feature branch.
3. Develop and commit.
4. Push to GitHub: `git push origin feat/my-feature`
5. Open a PR.

### Backend developer

Backend work focuses on server logic, APIs, and databases. Use branches scoped to backend modules.

#### Branching

- Use names like `feat/api-users` for new endpoints.
- Ensure compatibility with frontend integrations.

#### Commits

- `feat: implement user API endpoint`
- `fix: resolve database connection issue`

#### Workflow

Same as junior, but include unit tests as part of the work and keep commits logically grouped.

### Frontend developer

Frontend work focuses on UI, components, and styling. Use branches for UI features.

#### Branching

- `feat/login-component`
- Coordinate with backend for API integration.

#### Commits

- `feat: add responsive login form`
- `style: update button colors`

#### Workflow

Include visual review evidence in PRs when applicable.

### Fullstack developer

Fullstack work covers both sides and must ensure end-to-end integration.

#### Branching

- Use branches that cover full features: `feat/user-management` (including backend and frontend).

#### Commits

- Separate commits by layer when possible: backend first, then frontend.

#### Workflow

Coordinate PRs across layers and ensure QA gates are met.

## Branching model

A simplified GitFlow model is the standard:

- **`main`**: production-ready code. Direct pushes are forbidden. Merges only from `qa` via Pull Requests.
- **`qa`**: code ready for QA validation. Direct pushes are forbidden. Merges only from `develop` via Pull Requests.
- **`develop`**: primary integration branch for features. All feature branches merge into `develop`.
- **`feat/feature-name`**: feature branches (e.g., `feat/user-authentication`) created from `develop`.
- **`fix/bug-name`**: bug fix branches (e.g., `fix/login-button-bug`) created from `develop`.

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

## Versioning

At FIBEX, we use Semantic Versioning (SemVer) for releases. Versions must clearly reflect change impact to make dependency management predictable.

### Semantic Versioning convention

Versions follow `MAJOR.MINOR.PATCH`:

- **MAJOR**: backward-incompatible changes (breaking changes).
- **MINOR**: backward-compatible new features.
- **PATCH**: backward-compatible bug fixes.

Examples:

- `1.0.0`: first stable release.
- `1.1.0`: new feature added.
- `1.1.1`: bug fix.
- `2.0.0`: breaking change, such as a major API refactor.

Versions should be determined automatically based on Conventional Commits messages using tools such as `semantic-release`.

### GitHub tags

Every release must have a corresponding GitHub tag:

- Create tags per version: `git tag v1.0.0`
- Push tags: `git push origin --tags`
- Create GitHub Releases from tags, including automatically generated changelogs.

This improves release traceability and enables automated deployments.

## Future Considerations

As our development process matures, we may evolve our branching model by adding stricter environment protection rules, automation, and evidence requirements (e.g., mandatory CI artifacts, signed releases, and expanded test gates) for `develop`, `qa`, and `main`. This will be evaluated as team size and project complexity grow.
