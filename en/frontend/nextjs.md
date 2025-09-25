# Next.js Technology Stack

IMPORTANT NOTE: This document is not final; it is under review.

This document outlines standards and conventions for building web applications with Next.js.

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


