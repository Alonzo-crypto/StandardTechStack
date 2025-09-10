# Infraestructura y DevOps

Este documento cubre los estándares relacionados con el despliegue, la contenerización y CI/CD.

## Plataforma de Despliegue

TODO: Uso de Railway, Dokploy
TODO: Gestión de dominios
TODO: 
TODO: Autenticación centralizada, externa e interna, una clave todas las apps.
TODO: Bases de datos, redis, mongodb, postgres, mysql
TODO: Funciones
TODO: JWT, cifrado de la clave
TODO: Argon2??
VPS en servidores físicos.

### Caracas


### Valencia

- **Estándar**: Todas las nuevas aplicaciones deben diseñarse para ser desplegadas en el proveedor de nube **Railway**.
- **Serverless**: Para los servicios aplicables (ej., APIs, funciones pequeñas), se prefiere el despliegue serverless para reducir la carga operativa.

## Contenerización

- **Estándar**: Todos los servicios de backend deben ser contenerizados usando [Docker](https://www.docker.com/).
- **Dockerfile**: Cada servicio debe incluir un `Dockerfile` de múltiples etapas para producir una imagen de producción pequeña, optimizada y segura.

## CI/CD

- **Plataforma**: [GitHub Actions](https://github.com/features/actions) es el estándar para todos los pipelines de CI/CD.
- **Workflows Requeridos**: Cada proyecto debe incluir workflows para:
  - **Linting y Formateo**: Ejecutar en cada push a cualquier rama.
  - **Pruebas**: Ejecutar pruebas unitarias y de integración en cada push a `develop` y ramas de funcionalidades.
  - **Construcción (Build)**: Crear un build de producción y una imagen de contenedor en cada merge a `develop`.
  - **Despliegue**: Automatizar el despliegue a entornos de staging/producción.

## Gestión de Paquetes

- **Estándar**: [pnpm](https://pnpm.io/) es el gestor de paquetes requerido para todos los proyectos de TypeScript/JavaScript para asegurar una gestión de dependencias eficiente y determinista.
