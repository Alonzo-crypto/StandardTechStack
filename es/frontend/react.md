# Stack Tecnológico de React

## Estándar vigente

Este documento define el **estándar obligatorio** para construir aplicaciones web con React en Fibex Telecom.

- **Cumplimiento**: obligatorio para nuevos proyectos y para refactors/modernizaciones relevantes.
- **Excepciones**: requieren justificación técnica y aprobación del comité de arquitectura.
- **Calidad (ISO/IEC 25010)**: el nivel de calidad se demuestra con evidencia automatizada en CI/CD (lint, tests, análisis estático, seguridad de dependencias).

Este documento describe los estándares y convenciones específicas para desarrollar aplicaciones web con React.

## Quality Gates (obligatorios)

Los siguientes controles son **bloqueantes**: si fallan, el PR no se puede fusionar.

Niveles:

- **Estándar**: aplicaciones internas o de impacto moderado.
- **TELCO Crítico**: sistemas con SLA estricto, alta exposición, impacto operacional/regulatorio o criticidad de red.

| Control | Herramienta estándar | Estándar | TELCO Crítico | Bloquea merge |
|---|---|---:|---:|:---:|
| Formato | Prettier | Sin diffs | Sin diffs | Sí |
| Lint | ESLint | 0 errores | 0 errores | Sí |
| Type-check | TypeScript | `strict: true` (sin errores) | `strict: true` (sin errores) | Sí |
| Unit/Integration tests | Jest + Testing Library | Cobertura >= 80% global; 100% en código crítico | Cobertura >= 90% global; 100% en código crítico | Sí |
| E2E | Cypress | Flujos críticos en `main`/release | Flujos críticos + regresión de rutas críticas en `main`/release | Sí |
| Dependencias | `npm audit` / Snyk / Dependabot | 0 High/Critical sin excepción | 0 High/Critical sin excepción | Sí |
| Secretos | Gitleaks (o equivalente) | 0 hallazgos | 0 hallazgos | Sí |
| Performance (web) | Lighthouse CI | Presupuesto definido y cumplido | Presupuesto más estricto en rutas críticas + monitoreo en CI | Sí |

## Seguridad y supply chain (obligatorio)

- Gestión de secretos: prohibido en repositorio. Variables por entorno y vault cuando aplique.
- Dependencias: cualquier librería nueva requiere justificación (mantenibilidad, comunidad, licenciamiento, superficie de ataque).
- Componentes UI: estandarizar accesibilidad (WCAG 2.1 AA). Los componentes deben exponer estados de focus/aria correctamente.

## Stack Principal
- **Framework**: [React](https://react.dev/) (v19 con [Vite](https://vitejs.dev/) v6, o v18 con Vite v5)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) es la solución de estilos requerida.
- **Componentes de UI**: [Shadcn/ui](https://ui.shadcn.com/) es la biblioteca de componentes base recomendada.

## Manejo de Estado
- **Estado de Cliente**: [Zustand](https://github.com/pmndrs/zustand) es la biblioteca preferida para manejar el estado global del lado del cliente.
- **Estado de Servidor**: Se debe usar [React Query (`@tanstack/react-query`)](https://tanstack.com/query/latest) para gestionar la caché del servidor, incluyendo la obtención, el almacenamiento en caché y la sincronización de datos.

## Formularios
- **Estándar**: Se debe usar [React Hook Form](https://react-hook-form.com/) para todo el manejo de formularios.
- **Validación**: La validación de esquemas debe implementarse usando [Zod](https://zod.dev/).

## Pruebas (Testing)
- **Unitarias/Integración**: [Jest](https://jestjs.io/) con [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
- **E2E**: [Cypress](https://www.cypress.io/).

## Convenciones de Nomenclatura
- **Componentes**: `PascalCase` (ej., `UserProfile.tsx`).
- **Hooks**: Prefijo `use` con `camelCase` (ej., `useUserData.ts`).
- **Archivos y Directorios**: `kebab-case`.

## Estructura de Directorios
El estándar es una estructura de directorios basada en funcionalidades (features).

`src`
`├── assets                         # Activos estáticos`
`├── components                     # Componentes compartidos/reutilizables (UI simple)`
`├── features                       # Módulos basados en funcionalidades`
`│   └── user-profile`
`│       ├── components             # Componentes específicos de esta funcionalidad`
`│       ├── hooks                  # Hooks para la lógica de negocio`
`│       ├── index.ts               # API pública del módulo de funcionalidad`
`│       └── types.ts               # Tipos específicos de esta funcionalidad`
`├── hooks                          # Hooks personalizados globales`
`├── lib                            # Funciones de utilidad, helpers`
`├── providers                      # Proveedores de contexto de React globales`
`├── styles                         # Estilos globales, config de Tailwind`
`└── types                          # Tipos globales de TypeScript`
