# Principios Rectores

- **Usar Lenguajes Aprobados**: Los proyectos deben usar el lenguaje designado para su plataforma: **TypeScript** para frontend web y servicios de backend, **Python** para servicios de backend, y **Dart** para aplicaciones móviles. Esto asegura consistencia y aprovecha las fortalezas de cada plataforma.
- **Simplicidad y Mantenibilidad**: Preferir soluciones simples, claras y mantenibles sobre aquellas complejas y sobre-diseñadas. El código debe ser fácil de leer y entender.
- **Consistencia**: Seguir las convenciones y patrones descritos en este documento para garantizar una experiencia de desarrollo consistente en todos los proyectos.
- **Desarrollo Guiado por Pruebas (TDD)**: Escribir pruebas antes o junto con el código. Cada nueva funcionalidad o corrección de error debe ir acompañada de pruebas relevantes.
- **Diseño API-First**: Diseñar las APIs cuidadosamente antes de la implementación. Usar estándares como OpenAPI para documentarlas.
- **Idioma en el Código**: Todo el código, incluyendo nombres de variables, funciones, comentarios y documentación, debe estar en **Inglés**.
- **Formateo**: El código debe ser formateado usando [Prettier](https://prettier.io/) con una configuración compartida. Un hook de pre-commit debe forzar esto.
- **Linting**: El código debe pasar las verificaciones de linting usando [ESLint](https://eslint.org/) (para TS) o un linter similar para otros lenguajes, con una configuración compartida.
