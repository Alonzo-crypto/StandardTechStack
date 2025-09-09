# React Technology Stack

This document outlines the specific standards and conventions for developing web applications with React.

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
