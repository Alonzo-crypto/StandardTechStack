# Stack Tecnológico de Node.js

NOTA IMPORTANTE: Este documento no es definitivo, está en revisión.

Este documento describe los estándares y convenciones específicas para desarrollar servicios de backend con Node.js y TypeScript.

## Stack Principal
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Frameworks**:
  - Para servicios o APIs simples: [Express](https://expressjs.com/)
  - Para microservicios complejos de nivel empresarial: [NestJS](https://nestjs.com/)
- **Base de Datos**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/) es requerido para todas las interacciones con la base de datos.

## Pruebas (Testing)
- **Unitarias/Integración**: [Jest](https://jestjs.io/)
- **E2E**: [Supertest](https://github.com/visionmedia/supertest)

## Convenciones de Nomenclatura
- **Variables y Funciones**: `camelCase`.
- **Clases**: `PascalCase`.
- **Archivos y Directorios**: `kebab-case`.

## Estructura de Directorios (NestJS)
Para proyectos con NestJS, adherirse a la estructura estándar generada por la CLI de Nest.

## Estructura de Directorios (Express)
El estándar es una estructura de directorios basada en funcionalidades (features).

`src`
`├── api`
`│   ├── index.ts                 # Enrutador principal que combina las rutas de las funcionalidades`
`│   └── features`
`│       └── users`
`│           ├── user.controller.ts   # Manejadores de rutas`
`│           ├── user.service.ts      # Lógica de negocio`
`│           ├── user.repository.ts   # Interacción con la base de datos`
`│           ├── user.routes.ts       # Rutas específicas de la funcionalidad`
`│           └── user.types.ts        # Esquemas y tipos de Zod`
`├── config                       # Variables de entorno, etc.`
`├── middleware                   # Middleware compartido`
`├── lib                          # Funciones de utilidad`
`├── server.ts                    # Configuración e inicio del servidor`
`└── app.ts                       # Configuración de la app Express`
