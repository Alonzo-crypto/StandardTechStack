# Stack Tecnológico de Angular

Este documento describe los estándares y convenciones específicas para desarrollar aplicaciones web con Angular.

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
