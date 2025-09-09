# Principios Rectores

- **Usar Lenguajes Aprobados**: Los proyectos deben usar el lenguaje designado para su plataforma: **TypeScript** para frontend web y servicios de backend, **Python** para servicios de backend, y **Dart** para aplicaciones móviles.
- **Simplicidad y Mantenibilidad**: Tenemos preferencia por soluciones simples, claras y mantenibles sobre aquellas complejas y sobre-diseñadas. El código debe ser fácil de leer y entender.
- **Consistencia**: Se deben seguir las convenciones y patrones descritos en este documento para garantizar una experiencia de desarrollo consistente en todos los proyectos.
- **Desarrollo Guiado por Pruebas (TDD)**: Escribir pruebas antes o junto con el código. Cada nueva funcionalidad o corrección de error debe ir acompañada de pruebas relevantes.
- **Diseño API-First**: Diseñar las APIs cuidadosamente antes de la implementación. Usar estándares como OpenAPI para documentarlas.

## Principios de Nivel TELCO

- **Alta Disponibilidad y Escalabilidad**: Todos los sistemas deben ser diseñados para la resiliencia, la tolerancia a fallos y la capacidad de escalar sin problemas. Deben estar preparados para manejar un crecimiento significativo y rápido de la base de usuarios manteniendo el rendimiento.
- **Calidad de Servicio (QoS)**: Cada componente debe ser construido y probado para cumplir con altos estándares de rendimiento, fiabilidad y seguridad. El objetivo principal es garantizar una experiencia de cliente superior y consistente.
- **Monitoreo y Observabilidad**: Los sistemas deben exponer métricas en tiempo real, logs estructurados y trazas. Esto permite un monitoreo proactivo, una rápida resolución de problemas y una mejora continua del rendimiento.
- **Diseño Modular y Reutilizable**: Las soluciones deben diseñarse como una serie de componentes independientes y reutilizables con APIs bien definidas. Esto fomenta la flexibilidad, acelera el desarrollo y garantiza la mantenibilidad a largo plazo.

## Convenciones Generales

- **Idioma en el Código**: Todo el código, incluyendo nombres de variables, funciones, comentarios y documentación, debe estar en **Inglés**.
- **Formateo**: El código debe ser formateado usando [Prettier](https://prettier.io/) con una configuración compartida. Un hook de pre-commit debe forzar esto.
- **Linting**: El código debe pasar las verificaciones de linting usando [ESLint](https://eslint.org/) (para TS) o un linter similar para otros lenguajes, con una configuración compartida.
