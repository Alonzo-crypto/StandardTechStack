# Stack Tecnológico de React

NOTA IMPORTANTE: Este documento no es definitivo, está en revisión.

Este documento describe los estándares y convenciones específicas para desarrollar aplicaciones web con React.

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
