# Stack Tecnológico Estándar de FIBEX (Español)

## 1. Introducción

Este documento define el stack de tecnología estándar, los principios de arquitectura y las convenciones de codificación para todos los nuevos proyectos de software en FIBEX. Adherirse a estos estándares es obligatorio para asegurar la consistencia, mantenibilidad y calidad en todo nuestro panorama tecnológico.

## 2. Principios Rectores

- **Usar Lenguajes Aprobados**: Los proyectos deben usar el lenguaje designado para su plataforma: **TypeScript** para frontend web y servicios de backend, **Python** para servicios de backend, y **Dart** para aplicaciones móviles. Esto asegura consistencia y aprovecha las fortalezas de cada plataforma.
- **Simplicidad y Mantenibilidad**: Preferir soluciones simples, claras y mantenibles sobre aquellas complejas y sobre-diseñadas. El código debe ser fácil de leer y entender.
- **Consistencia**: Seguir las convenciones y patrones descritos en este documento para garantizar una experiencia de desarrollo consistente en todos los proyectos.
- **Desarrollo Guiado por Pruebas (TDD)**: Escribir pruebas antes o junto con el código. Cada nueva funcionalidad o corrección de error debe ir acompañada de pruebas relevantes.
- **Diseño API-First**: Diseñar las APIs cuidadosamente antes de la implementación. Usar estándares como OpenAPI para documentarlas.

## 3. Stack Tecnológico

### 3.1. Frontend Web

- **Frameworks**:
  - [React](https://react.dev/) (v19 con [Vite](https://vitejs.dev/) v6, o v18 con Vite v5)
  - [Angular](https://angular.io/) (última versión estable)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Componentes de UI**:
  - Para **React**: [Shadcn/ui](https://ui.shadcn.com/) con [Tailwind CSS](https://tailwindcss.com/).
  - Para **Angular**: [Angular Material](https://material.angular.io/).
- **Estilos**: Se prefiere [Tailwind CSS](https://tailwindcss.com/) como solución de estilos.
- **Manejo de Estado**:
  - Para **React**: [Zustand](https://github.com/pmndrs/zustand) para estado de cliente y [React Query (`@tanstack/react-query`)](https://tanstack.com/query/latest) para estado de servidor.
  - Para **Angular**: [NgRx](https://ngrx.io/) para manejo de estado complejo o servicios nativos con [RxJS](https://rxjs.dev/) para casos más simples.
- **Formularios**:
  - Para **React**: [React Hook Form](https://react-hook-form.com/) con [Zod](https://zod.dev/) para validación.
  - Para **Angular**: Formularios Reactivos (Reactive Forms) integrados.
- **Pruebas (Testing)**:
  - Unitarias/Integración (React): [Jest](https://jestjs.io/) con [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
  - Unitarias/Integración (Angular): Se prefiere [Jest](https://jestjs.io/) sobre Jasmine/Karma.
  - E2E (Ambos): [Cypress](https://www.cypress.io/).

### 3.2. Móvil

- **Framework**: [Flutter](https://flutter.dev/)
- **Lenguaje**: [Dart](https://dart.dev/) (v3.x o superior)

### 3.3. Backend

- **Lenguajes**: [TypeScript](https://www.typescriptlang.org/), [Python](https://www.python.org/)
- **Frameworks**:
  - **TypeScript**: [Node.js](https://nodejs.org/) con [Express](https://expressjs.com/) para servicios simples, o [NestJS](https://nestjs.com/) para microservicios complejos.
  - **Python**: [FastAPI](https://fastapi.tiangolo.com/) es la opción preferida.
- **Base de Datos**: [PostgreSQL](https://www.postgresql.org/) (común para ambos)
- **ORM**:
  - Para **TypeScript**: [Prisma](https://www.prisma.io/)
  - Para **Python**: [SQLAlchemy](https://www.sqlalchemy.org/)
- **Autenticación**: Usar autenticación estándar basada en JWT.
- **Especificación de API**: [OpenAPI (Swagger)](https://swagger.io/specification/)
- **Pruebas (Testing)**:
  - Para **TypeScript**: [Jest](https://jestjs.io/) (Unitarias/Integración) y [Supertest](https://github.com/visionmedia/supertest) (E2E).
  - Para **Python**: [Pytest](https://docs.pytest.org/en/stable/)

### 3.4. Infraestructura & DevOps

- **Plataforma de Despliegue**: Proveedores de nube como AWS, Azure o Google Cloud.
- **Contenerización**: [Docker](https://www.docker.com/) para microservicios y otras aplicaciones.
- **CI/CD**: [GitHub Actions](https://github.com/features/actions)
- **Gestor de Paquetes**: [pnpm](https://pnpm.io/)

## 4. Convenciones de Codificación

### 4.1. General

- **Idioma en el Código**: Todo el código, incluyendo nombres de variables, funciones, comentarios y documentación, debe estar en **Inglés**.
- **Formateo**: El código debe ser formateado usando [Prettier](https://prettier.io/) con el archivo de configuración provisto (`.prettierrc`). Un hook de pre-commit debe forzar esto.
- **Linting**: El código debe pasar las verificaciones de linting usando [ESLint](https://eslint.org/) con el archivo de configuración provisto (`.eslintrc.js`).

### 4.2. Convenciones de Nomenclatura

- **Variables y Funciones**: `camelCase` (ej. `const userProfile;`, `function getUserProfile() {}`)
- **Clases y Componentes de React**: `PascalCase` (ej. `class UserSession {}`, `function UserProfile() {}`)
- **Constantes y Enums**: `UPPER_SNAKE_CASE` (ej. `const MAX_RETRIES = 3;`, `enum UserRole { ADMIN, USER }`)
- **Archivos y Directorios**: `kebab-case` (ej. `user-profile.tsx`, `api-helpers/`)
- **Tipos e Interfaces de TypeScript**: `PascalCase` (ej. `type User = {}`, `interface IProduct {}`)

### 4.3. Estructura de Directorios (Frontend Genérico)

Esta estructura es una recomendación para la organización basada en funcionalidades (features) en proyectos de Angular y React.

`src`
`├── assets                         # Activos estáticos como imágenes, fuentes`
`├── components                     # Componentes compartidos/reutilizables`
`│   └── ui                         # Componentes puros de UI (Button, Input, etc.)`
`├── features                       # Módulos basados en funcionalidades`
`│   └── user-profile`
`│       ├── components             # Componentes específicos de esta funcionalidad`
`│       ├── services               # Servicios o hooks para lógica de negocio`
`│       └── index.ts               # API pública del módulo de funcionalidad`
`├── hooks                          # Hooks personalizados globales (React)`
`├── services                       # Servicios globales (Angular)`
`├── lib                            # Funciones de utilidad, helpers`
`├── styles                         # Estilos globales, config de Tailwind`
`└── types                          # Tipos globales de TypeScript`

### 4.4. Diseño de API

- **Estilo**: Se deben seguir los principios RESTful.
- **Versionado**: Las APIs deben ser versionadas (ej. `/api/v1/...`).
- **Respuestas**: Usar códigos de estado HTTP estándar. Las respuestas JSON deben ser consistentes, usando un formato como `{ "data": ..., "error": ... }`.
- **Autenticación**: Proteger los endpoints usando JWTs enviados en la cabecera `Authorization` (`Bearer <token>`).

## 5. Git & Control de Versiones

- **Modelo de Ramas**: Una versión simplificada de GitFlow.
  - `main`: Código listo para producción. Los pushes directos están prohibidos.
  - `develop`: Rama de integración para funcionalidades.
  - `feat/feature-name`: Ramas para nuevas funcionalidades.
  - `fix/bug-name`: Ramas para correcciones de errores.
- **Mensajes de Commit**: Deben seguir la especificación de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Esto es forzado por hooks de commit.
  - Ejemplo: `feat: add user login functionality`
  - Ejemplo: `fix: correct calculation in payment module`

## 6. Documentación

- **Comentarios en el Código**: Usar TSDoc para documentar funciones, clases y tipos.
- **README**: Cada proyecto debe tener un archivo `README.md` explicando qué es el proyecto, cómo configurarlo y cómo ejecutarlo.
- **Decisiones de Arquitectura**: Documentar decisiones de arquitectura significativas en un directorio `/docs/adr` usando Architecture Decision Records (ADRs).
