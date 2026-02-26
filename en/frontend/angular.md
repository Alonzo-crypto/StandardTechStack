# Angular Technology Stack

## Effective standard

This document defines the **mandatory standard** for building Angular web applications at FIBEX.

- **Compliance**: mandatory for new projects and for significant refactors/modernizations.
- **Exceptions**: any deviation requires technical justification, risk analysis, and explicit approval by the architecture committee.
- **Quality (ISO/IEC 25010)**: maintainability, security, reliability, and compatibility must be proven with CI/CD evidence (lint, tests, static analysis).

This document outlines the specific standards and conventions for developing web applications with Angular.

## Quality Gates (mandatory)

The following controls are **merge-blocking**: if they fail, the PR cannot be merged.

Levels:

- **Standard**: internal applications or moderate impact.
- **TELCO Critical**: strict SLAs, high exposure, operational/regulatory impact, or network/service criticality.

| Control | Standard tool | Standard | TELCO Critical | Blocks merge |
|---|---|---:|---:|:---:|
| Formatting | Prettier | No diffs | No diffs | Yes |
| Lint | `@angular-eslint` + ESLint | 0 errors | 0 errors | Yes |
| Type-check | TypeScript | `strict: true` (no errors) | `strict: true` (no errors) | Yes |
| Unit/Integration tests | Jest | Coverage >= 80% overall; 100% in critical code | Coverage >= 90% overall; 100% in critical code | Yes |
| E2E | Cypress | Critical flows on `main`/release | Critical flows + critical-route regression on `main`/release | Yes |
| Dependencies | `npm audit` / Snyk / Dependabot | 0 High/Critical without exception | 0 High/Critical without exception | Yes |
| Secrets | Gitleaks (or equivalent) | 0 findings | 0 findings | Yes |
| Performance (web) | Lighthouse CI | Defined budget met | Stricter budgets on critical routes + CI monitoring | Yes |

## Security & supply chain (mandatory)

- Secrets management: forbidden in repo. Use per-environment variables and a vault when applicable.
- Headers: for FIBEX-hosted apps, enforce `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and HSTS as applicable.
- Authentication/authorization: do not implement ad-hoc permission logic in UI; UI consumes claims/roles from backend (validated by backend/gateway).
- Dependencies: any new library must be justified (maintainability, community health, licensing).

## Core Stack
- **Framework**: [Angular](https://angular.io/) (latest stable version)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [Angular Material](https://material.angular.io/) is the required component library.

## State Management
- **Complex State**: [NgRx](https://ngrx.io/) should be used for complex, global state management scenarios.
- **Simple State**: For simpler, component-level or service-level state, native [RxJS](https://rxjs.dev/) BehaviorSubjects are preferred.

## Forms
- **Standard**: Angular's built-in **Reactive Forms** module must be used for all form handling. Do not use template-driven forms.

## Testing
- **Unit/Integration**: [Jest](https://jestjs.io/) is the preferred framework for unit and integration testing.
- **E2E**: [Cypress](https://www.cypress.io/).

## Naming Conventions
- **Modules, Components, Services**: `PascalCase` with the appropriate suffix (e.g., `UserProfileComponent`, `AuthService`).
- **Files**: Follow the Angular CLI convention (`kebab-case.type.ts`, e.g., `user-profile.component.ts`).

## Directory Structure
A feature-based directory structure using Angular modules is the standard.

`src`
`├── app`
`│   ├── core                         # Core module (guards, interceptors, single-use services)`
`│   ├── features                     # Feature modules`
`│   │   └── user-profile`
`│   │       ├── components`
`│   │       ├── services`
`│   │       ├── user-profile.component.ts`
`│   │       └── user-profile.module.ts`
`│   ├── shared                       # Shared module (common components, pipes, directives)`
`│   └── app.module.ts`
`├── assets                         # Static assets`
`├── environments                   # Environment configuration`
`└── styles                         # Global styles`
