# Angular Technology Stack

IMPORTANT NOTE: This document is not final; it is under review.

This document outlines the specific standards and conventions for developing web applications with Angular.

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
