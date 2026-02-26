# React Technology Stack

## Effective standard

This document defines the **mandatory standard** for building React web applications at FIBEX.

- **Compliance**: mandatory for new projects and for significant refactors/modernizations.
- **Exceptions**: require technical justification and explicit approval by the architecture committee.
- **Quality (ISO/IEC 25010)**: quality level must be proven with automated CI/CD evidence (lint, tests, static analysis, dependency security).

This document outlines the specific standards and conventions for developing web applications with React.

## Quality Gates (mandatory)

The following controls are **merge-blocking**: if they fail, the PR cannot be merged.

Levels:

- **Standard**: internal applications or moderate impact.
- **TELCO Critical**: strict SLAs, high exposure, operational/regulatory impact, or network/service criticality.

| Control | Standard tool | Standard | TELCO Critical | Blocks merge |
|---|---|---:|---:|:---:|
| Formatting | Prettier | No diffs | No diffs | Yes |
| Lint | ESLint | 0 errors | 0 errors | Yes |
| Type-check | TypeScript | `strict: true` (no errors) | `strict: true` (no errors) | Yes |
| Unit/Integration tests | Jest + Testing Library | Coverage >= 80% overall; 100% in critical code | Coverage >= 90% overall; 100% in critical code | Yes |
| E2E | Cypress | Critical flows on `main`/release | Critical flows + critical-route regression on `main`/release | Yes |
| Dependencies | `npm audit` / Snyk / Dependabot | 0 High/Critical without exception | 0 High/Critical without exception | Yes |
| Secrets | Gitleaks (or equivalent) | 0 findings | 0 findings | Yes |
| Performance (web) | Lighthouse CI | Defined budget met | Stricter budgets on critical routes + CI monitoring | Yes |

## Security & supply chain (mandatory)

- Secrets management: forbidden in repo. Use per-environment variables and a vault when applicable.
- Dependencies: any new library requires justification (maintainability, community health, licensing, attack surface).
- UI components: standardize accessibility (WCAG 2.1 AA). Components must expose correct focus and aria states.

## Core Stack
- **Framework**: [React](https://react.dev/) (v19 with [Vite](https://vitejs.dev/) v6, or v18 with Vite v5)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) is the required styling solution.
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/) is the recommended base component library.

## State Management
- **Client State**: [Zustand](https://github.com/pmndrs/zustand) is the preferred library for managing global client-side state.
- **Server State**: [React Query (`@tanstack/react-query`)](https://tanstack.com/query/latest) must be used for managing server cache, including data fetching, caching, and synchronization.

## Forms
- **Standard**: [React Hook Form](https://react-hook-form.com/) must be used for all form handling.
- **Validation**: Schema validation must be implemented using [Zod](https://zod.dev/).

## Testing
- **Unit/Integration**: [Jest](https://jestjs.io/) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
- **E2E**: [Cypress](https://www.cypress.io/).

## Naming Conventions
- **Components**: `PascalCase` (e.g., `UserProfile.tsx`).
- **Hooks**: `use` prefix with `camelCase` (e.g., `useUserData.ts`).
- **Files and Directories**: `kebab-case`.

## Directory Structure
A feature-based directory structure is the standard.

`src`
`├── assets                         # Static assets`
`├── components                     # Shared/reusable components (dumb UI)`
`├── features                       # Feature-based modules`
`│   └── user-profile`
`│       ├── components             # Components specific to this feature`
`│       ├── hooks                  # Hooks for business logic`
`│       ├── index.ts               # Public API for the feature module`
`│       └── types.ts               # Types specific to this feature`
`├── hooks                          # Global custom hooks`
`├── lib                            # Utility functions, helpers`
`├── providers                      # Global React context providers`
`├── styles                         # Global styles, Tailwind config`
`└── types                          # Global TypeScript types`
