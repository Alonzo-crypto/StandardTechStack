# Stack Tecnológico de Angular

## Estándar vigente

Este documento define el **estándar obligatorio** para construir aplicaciones web con Angular en Fibex Telecom.

- **Cumplimiento**: el estándar se aplica a nuevos proyectos y a cambios significativos en proyectos existentes.
- **Excepciones**: cualquier desviación requiere justificación técnica, análisis de riesgo y aprobación explícita del comité de arquitectura.
- **Calidad (ISO/IEC 25010)**: los criterios de mantenibilidad, seguridad, fiabilidad y compatibilidad deben evidenciarse en CI/CD (lint, tests, análisis estático).

Este documento describe los estándares y convenciones específicas para desarrollar aplicaciones web con Angular.

## Quality Gates (obligatorios)

Los siguientes controles son **bloqueantes**: si fallan, el PR no se puede fusionar.

Niveles:

- **Estándar**: aplicaciones internas o de impacto moderado.
- **TELCO Crítico**: sistemas con SLA estricto, alta exposición, impacto operacional/regulatorio o criticidad de red.

| Control | Herramienta estándar | Estándar | TELCO Crítico | Bloquea merge |
|---|---|---:|---:|:---:|
| Formato | Prettier | Sin diffs | Sin diffs | Sí |
| Lint | `@angular-eslint` + ESLint | 0 errores | 0 errores | Sí |
| Type-check | TypeScript | `strict: true` (sin errores) | `strict: true` (sin errores) | Sí |
| Unit/Integration tests | Jest | Cobertura >= 80% global; 100% en código crítico | Cobertura >= 90% global; 100% en código crítico | Sí |
| E2E | Cypress | Flujos críticos en `main`/release | Flujos críticos + regresión de rutas críticas en `main`/release | Sí |
| Dependencias | `npm audit` / Snyk / Dependabot | 0 High/Critical sin excepción | 0 High/Critical sin excepción | Sí |
| Secretos | Gitleaks (o equivalente) | 0 hallazgos | 0 hallazgos | Sí |
| Performance (web) | Lighthouse CI | Presupuesto definido y cumplido | Presupuesto más estricto en rutas críticas + monitoreo en CI | Sí |

## Seguridad y supply chain (obligatorio)

- Gestión de secretos: prohibido en repositorio. Usar variables por entorno y vault cuando aplique.
- Cabeceras: en apps servidas por Fibex, exigir `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` y HSTS según contexto.
- Autenticación/autorización: no implementar lógica ad-hoc en UI; la UI consume claims/roles provenientes del backend (token validado por backend/gateway).
- Dependencias: cualquier librería nueva debe justificarse (mantenibilidad, comunidad, licenciamiento).

## Stack Principal
- **Framework**: [Angular](https://angular.io/) (última versión estable)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Componentes de UI**: [Angular Material](https://material.angular.io/) es la biblioteca de componentes requerida.

## Manejo de Estado
- **Estado Complejo**: Se debe usar [NgRx](https://ngrx.io/) para escenarios de manejo de estado global y complejo.
- **Estado Simple**: Para un estado más simple a nivel de componente o servicio, se prefieren los BehaviorSubjects nativos de [RxJS](https://rxjs.dev/).

## Formularios
- **Estándar**: Se debe usar el módulo **Reactive Forms** integrado de Angular para todo el manejo de formularios. No usar formularios basados en plantillas (template-driven).

## Pruebas (Testing)
- **Unitarias/Integración**: [Jest](https://jestjs.io/) es el framework preferido para pruebas unitarias y de integración.
- **E2E**: [Cypress](https://www.cypress.io/).

## Convenciones de Nomenclatura
- **Módulos, Componentes, Servicios**: `PascalCase` con el sufijo apropiado (ej., `UserProfileComponent`, `AuthService`).
- **Archivos**: Seguir la convención de la CLI de Angular (`kebab-case.type.ts`, ej., `user-profile.component.ts`).

## Estructura de Directorios
El estándar es una estructura de directorios basada en funcionalidades (features) usando módulos de Angular.

`src`
`├── app`
`│   ├── core                         # Módulo core (guards, interceptors, servicios de un solo uso)`
`│   ├── features                     # Módulos de funcionalidades`
`│   │   └── user-profile`
`│   │       ├── components`
`│   │       ├── services`
`│   │       ├── user-profile.component.ts`
`│   │       └── user-profile.module.ts`
`│   ├── shared                       # Módulo compartido (componentes, pipes, directivas comunes)`
`│   └── app.module.ts`
`├── assets                         # Activos estáticos`
`├── environments                   # Configuración de entornos`
`└── styles                         # Estilos globales`
