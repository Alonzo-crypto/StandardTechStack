# Stack Tecnológico de Next.js

NOTA IMPORTANTE: Este documento no es definitivo, está en revisión.

Este documento define estándares y convenciones para construir aplicaciones web con Next.js.

## Stack Principal

- **Framework**: [Next.js](https://nextjs.org/) (v14+ con app router)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Monorepo**: [Turborepo](https://turbo.build/repo) con workspaces de `pnpm`
- **Empaquetado/Build**: Toolchain integrado de Next; usar pipelines de Turborepo para caché/paralelismo
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) es requerido.
- **Componentes de UI**: [shadcn/ui](https://ui.shadcn.com/) es recomendado.

## Obtención y caché de datos

- Preferir Server Components y `fetch` con caché cuando sea posible.
- Usar React Query (`@tanstack/react-query`) para estado de cliente que refleje caché del servidor.
- Colocar la obtención de datos cerca de los componentes; usar route handlers para endpoints de API.

## Formularios

- Usar [React Hook Form](https://react-hook-form.com/) con [Zod](https://zod.dev/) para validación de esquemas.

## Rutas de API

- Usar Route Handlers de Next.js bajo `app/api/.../route.ts`.
- Seguir convenciones REST y responder con payloads tipados.

## Pruebas (Testing)

- **Unitarias/Integración**: [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
- **E2E**: [Playwright](https://playwright.dev/) o [Cypress](https://www.cypress.io/).

## Convenciones de Nomenclatura

- Componentes: `PascalCase`.
- Hooks: prefijo `use` con `camelCase`.
- Archivos/directorios: `kebab-case`.

## Estructura de Directorios (App Router)

`src`
`├── app`
`│   ├── (marketing)/`  # Grupos de rutas opcionales
`│   ├── dashboard/`
`│   │   ├── page.tsx`
`│   │   └── layout.tsx`
`│   ├── api/`
`│   │   └── users/route.ts`  # Route handlers
`│   └── globals.css`
`├── components/`
`├── features/`          # Módulos por funcionalidades
`├── lib/`               # Utilidades
`├── providers/`
`└── types/`

## Monorepo con Turborepo

- Raíz gestionada con workspaces de `pnpm` y Turborepo.
- Paquetes comunes en `packages/` (p. ej., `ui`, `tsconfig`, `eslint-config`).
- Apps en `apps/` (p. ej., `web`, `admin`).
- `turbo.json` con targets `build`, `lint`, `test`, `dev` con caché y `dependsOn`.


