# Next.js Technology Stack

## Effective standard

This document defines the **mandatory standard** for building Next.js web applications at FIBEX.

- **Compliance**: mandatory for new projects and for significant refactors/modernizations.
- **Exceptions**: require technical justification, risk analysis, and explicit approval by the architecture committee.
- **Quality (ISO/IEC 25010)**: maintainability, security, reliability, and compatibility must be proven with CI/CD evidence (lint, tests, static analysis, dependency security).

This document outlines standards and conventions for building web applications with Next.js.

## Quality Gates (mandatory)

The following controls are **merge-blocking**: if they fail, the PR cannot be merged.

Levels:

- **Standard**: internal applications or moderate impact.
- **TELCO Critical**: strict SLAs, high exposure, operational/regulatory impact, or network/service criticality.

| Control | Standard tool | Standard | TELCO Critical | Blocks merge |
|---|---|---:|---:|:---:|
| Formatting | Prettier | No diffs | No diffs | Yes |
| Lint | Next.js ESLint + ESLint | 0 errors | 0 errors | Yes |
| Type-check | TypeScript | `strict: true` (no errors) | `strict: true` (no errors) | Yes |
| Unit/Integration tests | Jest + Testing Library | Coverage >= 80% overall; 100% in critical code | Coverage >= 90% overall; 100% in critical code | Yes |
| E2E | Playwright (preferred) or Cypress | Critical flows on `main`/release | Critical flows + critical-route regression on `main`/release | Yes |
| Dependencies | `npm audit` / Snyk / Dependabot | 0 High/Critical without exception | 0 High/Critical without exception | Yes |
| Secrets | Gitleaks (or equivalent) | 0 findings | 0 findings | Yes |
| Performance (web) | Lighthouse CI | Defined budget met | Stricter budgets on critical routes + CI monitoring | Yes |

## Security & supply chain (mandatory)

- Secrets management: forbidden in repo. Use per-environment variables and a vault when applicable.
- Server/client boundaries: never access private secrets in Client Components; only in server-only contexts (Route Handlers, Server Actions, server components).
- Authentication/authorization: enforced on server (Route Handlers / backend / gateway). Never rely on client checks.
- Dependencies: any new library must be justified (maintainability, community health, licensing, attack surface).

## Core Stack

- **Framework**: [Next.js](https://nextjs.org/) (v14+ app router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Monorepo**: [Turborepo](https://turbo.build/repo) with `pnpm` workspaces
- **Bundler/Build**: Next built-in toolchain; use Turborepo pipelines for caching/parallelism
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) is required.
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) is recommended.

## Data Fetching & Caching

- Prefer Server Components and `fetch` with caching where possible.
- Use React Query (`@tanstack/react-query`) for client state that mirrors server cache.
- Co-locate data fetching with components; use route handlers for API endpoints.

## Forms

- Use [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for schema validation.

## API Routes

- Use Next.js Route Handlers under `app/api/.../route.ts`.
- Follow RESTful conventions and respond with typed payloads.

## Testing

- **Unit/Integration**: [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
- **E2E**: [Playwright](https://playwright.dev/) or [Cypress](https://www.cypress.io/).

## Naming Conventions

- Components: `PascalCase`.
- Hooks: `use` prefix with `camelCase`.
- Files/dirs: `kebab-case`.

## Directory Structure (App Router)

`src`
`├── app`
`│   ├── (marketing)/`  # Optional route groups
`│   ├── dashboard/`
`│   │   ├── page.tsx`
`│   │   └── layout.tsx`
`│   ├── api/`
`│   │   └── users/route.ts`  # Route handlers
`│   └── globals.css`
`├── components/`
`├── features/`          # Feature-based modules
`├── lib/`               # Utilities
`├── providers/`
`└── types/`

## Monorepo with Turborepo

- Root managed with `pnpm` workspaces and Turborepo.
- Common packages under `packages/` (e.g., `ui`, `tsconfig`, `eslint-config`).
- Apps under `apps/` (e.g., `web`, `admin`).
- Sample `turbo.json` targets: `build`, `lint`, `test`, `dev` with caching and `dependsOn`.


