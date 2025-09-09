# FIBEX Standard Technology Stack (English)

## 1. Introduction

This document defines the standard technology stack, architectural principles, and coding conventions for all new software projects at FIBEX. Adhering to these standards is mandatory to ensure consistency, maintainability, and quality across our entire technology landscape.

## 2. Guiding Principles

- **Use Approved Languages**: Projects must use the designated language for their platform: **TypeScript** for web frontend and backend services, **Python** for backend services, and **Dart** for mobile applications. This ensures consistency and leverages platform strengths.
- **Simplicity and Maintainability**: Prefer simple, clear, and maintainable solutions over complex and overly-engineered ones. Code should be easy to read and understand.
- **Consistency**: Follow the conventions and patterns outlined in this document to ensure a consistent developer experience across all projects.
- **Test-Driven Development (TDD)**: Write tests before or alongside your code. Every new feature or bug fix must be accompanied by relevant tests.
- **API-First Design**: Design APIs thoughtfully before implementation. Use standards like OpenAPI to document them.

## 3. Technology Stack

### 3.1. Web Frontend

- **Frameworks**:
  - [React](https://react.dev/) (v19 with [Vite](https://vitejs.dev/) v6, or v18 with Vite v5)
  - [Angular](https://angular.io/) (latest stable version)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**:
  - For **React**: [Shadcn/ui](https://ui.shadcn.com/) with [Tailwind CSS](https://tailwindcss.com/).
  - For **Angular**: [Angular Material](https://material.angular.io/).
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) is the preferred styling solution.
- **State Management**:
  - For **React**: [Zustand](https://github.com/pmndrs/zustand) for client state and [React Query (`@tanstack/react-query`)](https://tanstack.com/query/latest) for server state.
  - For **Angular**: [NgRx](https://ngrx.io/) for complex state management or native [RxJS](https://rxjs.dev/) services for simpler cases.
- **Forms**:
  - For **React**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation.
  - For **Angular**: Built-in Reactive Forms.
- **Testing**:
  - Unit/Integration (React): [Jest](https://jestjs.io/) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
  - Unit/Integration (Angular): [Jest](https://jestjs.io/) is preferred over Jasmine/Karma.
  - E2E (Both): [Cypress](https://www.cypress.io/).

### 3.2. Mobile

- **Framework**: [Flutter](https://flutter.dev/)
- **Language**: [Dart](https://dart.dev/) (v3.x or higher)

### 3.3. Backend

- **Languages**: [TypeScript](https://www.typescriptlang.org/), [Python](https://www.python.org/)
- **Frameworks**:
  - **TypeScript**: [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/) for simple services, or [NestJS](https://nestjs.com/) for complex microservices.
  - **Python**: [FastAPI](https://fastapi.tiangolo.com/) is the preferred choice.
- **Database**: [PostgreSQL](https://www.postgresql.org/) (common for both)
- **ORM**:
  - For **TypeScript**: [Prisma](https://www.prisma.io/)
  - For **Python**: [SQLAlchemy](https://www.sqlalchemy.org/)
- **Authentication**: Use standard JWT-based authentication.
- **API Specification**: [OpenAPI (Swagger)](https://swagger.io/specification/)
- **Testing**:
  - For **TypeScript**: [Jest](https://jestjs.io/) (Unit/Integration) and [Supertest](https://github.com/visionmedia/supertest) (E2E).
  - For **Python**: [Pytest](https://docs.pytest.org/en/stable/)

### 3.4. Infrastructure & DevOps

- **Deployment Platform**: Cloud providers like AWS, Azure, or Google Cloud.
- **Containerization**: [Docker](https://www.docker.com/) for microservices and other applications.
- **CI/CD**: [GitHub Actions](https://github.com/features/actions)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 4. Coding Conventions

### 4.1. General

- **Language in Code**: All code, including variable names, function names, comments, and documentation, must be in **English**.
- **Formatting**: Code must be formatted using [Prettier](https://prettier.io/) with the provided configuration file (`.prettierrc`). A pre-commit hook should enforce this.
- **Linting**: Code must pass linting checks using [ESLint](https://eslint.org/) with the provided configuration file (`.eslintrc.js`).

### 4.2. Naming Conventions

- **Variables and Functions**: `camelCase` (e.g., `const userProfile;`, `function getUserProfile() {}`)
- **Classes and React Components**: `PascalCase` (e.g., `class UserSession {}`, `function UserProfile() {}`)
- **Constants and Enums**: `UPPER_SNAKE_CASE` (e.g., `const MAX_RETRIES = 3;`, `enum UserRole { ADMIN, USER }`)
- **Files and Directories**: `kebab-case` (e.g., `user-profile.tsx`, `api-helpers/`)
- **TypeScript Types and Interfaces**: `PascalCase` (e.g., `type User = {}`, `interface IProduct {}`)

### 4.3. Directory Structure (Generic Frontend)

This structure is a recommendation for feature-based organization in both Angular and React projects.

`src`
`├── assets                         # Static assets like images, fonts`
`├── components                     # Shared/reusable components`
`│   └── ui                         # Pure UI components (Button, Input, etc.)`
`├── features                       # Feature-based modules`
`│   └── user-profile`
`│       ├── components             # Components specific to this feature`
`│       ├── services               # Services or hooks for business logic`
`│       └── index.ts               # Public API for the feature module`
`├── hooks                          # Global custom hooks (React)`
`├── services                       # Global services (Angular)`
`├── lib                            # Utility functions, helpers`
`├── styles                         # Global styles, Tailwind config`
`└── types                          # Global TypeScript types`

### 4.4. API Design

- **Style**: RESTful principles should be followed.
- **Versioning**: APIs should be versioned (e.g., `/api/v1/...`).
- **Responses**: Use standard HTTP status codes. JSON responses should be consistent, using a format like `{ "data": ..., "error": ... }`.
- **Authentication**: Secure endpoints using JWTs sent in the `Authorization` header (`Bearer <token>`).

## 5. Git & Version Control

- **Branching Model**: A simplified version of GitFlow.
  - `main`: Production-ready code. Direct pushes are forbidden.
  - `develop`: Integration branch for features.
  - `feat/feature-name`: Branches for new features.
  - `fix/bug-name`: Branches for bug fixes.
- **Commit Messages**: Must follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. This is enforced by commit hooks.
  - Example: `feat: add user login functionality`
  - Example: `fix: correct calculation in payment module`

## 6. Documentation

- **Code Comments**: Use TSDoc for documenting functions, classes, and types.
- **README**: Every project must have a `README.md` file explaining what the project is, how to set it up, and how to run it.
- **Architectural Decisions**: Document significant architectural decisions in an `/docs/adr` directory using Architecture Decision Records (ADRs).
