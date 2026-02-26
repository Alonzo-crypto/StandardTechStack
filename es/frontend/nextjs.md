# Stack Tecnológico de Next.js

## Estándar vigente

Este documento define el **estándar obligatorio** para construir aplicaciones web con Next.js en Fibex Telecom.

- **Cumplimiento**: obligatorio para nuevos proyectos y para migraciones hacia App Router.
- **Excepciones**: requieren justificación técnica, evaluación de impacto y aprobación del comité de arquitectura.
- **Calidad (ISO/IEC 25010)**: el estándar se valida por gates en CI/CD (lint, tests, análisis estático, y controles de seguridad).

Este documento define estándares y convenciones para construir aplicaciones web con Next.js.

## Quality Gates (obligatorios)

Los siguientes controles son **bloqueantes**: si fallan, el PR no se puede fusionar.

Niveles:

- **Estándar**: aplicaciones internas o de impacto moderado.
- **TELCO Crítico**: sistemas con SLA estricto, alta exposición, impacto operacional/regulatorio o criticidad de red.

| Control | Herramienta estándar | Estándar | TELCO Crítico | Bloquea merge |
|---|---|---:|---:|:---:|
| Formato | Prettier | Sin diffs | Sin diffs | Sí |
| Lint | ESLint (Next.js) | 0 errores | 0 errores | Sí |
| Type-check | TypeScript | `strict: true` (sin errores) | `strict: true` (sin errores) | Sí |
| Unit/Integration tests | Jest + Testing Library | Cobertura >= 80% global; 100% en código crítico | Cobertura >= 90% global; 100% en código crítico | Sí |
| E2E | Playwright (preferido) o Cypress | Flujos críticos en `main`/release | Flujos críticos + regresión de rutas críticas en `main`/release | Sí |
| Dependencias | `npm audit` / Snyk / Dependabot | 0 High/Critical sin excepción | 0 High/Critical sin excepción | Sí |
| Secretos | Gitleaks (o equivalente) | 0 hallazgos | 0 hallazgos | Sí |
| Performance (web) | Lighthouse CI | Presupuesto definido y cumplido | Presupuesto más estricto en rutas críticas + monitoreo en CI | Sí |

## Seguridad y supply chain (obligatorio)

- **Server/Client boundaries**: evitar fuga de secretos; cualquier acceso a credenciales o servicios internos ocurre solo en Server Components, Route Handlers o infraestructura (nunca en client bundles).
- **Headers**: exigir `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` y HSTS según el contexto del producto.
- **Gestión de secretos**: prohibido hardcodear claves o URLs sensibles. Variables por entorno; vault cuando aplique.
- **Autenticación**: preferir sesiones seguras (`HttpOnly`, `Secure`, `SameSite`) o tokens manejados por backend/gateway; evitar guardar tokens en `localStorage`.

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


